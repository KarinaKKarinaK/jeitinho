import { S, rev, watch, replace, reset } from './store.svelte.js';
import { decide, keepPlacement } from './sync.js';
import { STAGE_IDS } from './langs/kit.js';
import { caps } from './fx.js';
import { P, savePrefs } from './prefs.js';
import { lang } from './lang.js';

// status: off (not configured) | out (signed out) | syncing | synced | error
export const cloud = $state({ ready: false, status: 'off', user: null, error: '', recovery: false, at: 0, ai: false, tts: false, stt: false, push: '', name: P.name, avatar: P.avatar, google: false, github: false, checked: false });

let sb;
let timer;

export async function init() {
	try {
		const cfg = await (await fetch('/api/config')).json();
		Object.assign(caps, { ai: !!cfg.ai, tts: !!cfg.tts, stt: !!cfg.stt, push: cfg.push || '' });
		Object.assign(cloud, caps);
		if (!cfg.url || !cfg.key) return;
		const { createClient } = await import('@supabase/supabase-js');
		sb = createClient(cfg.url, cfg.key);
		// only offer the sign-in buttons that are actually switched on in the project
		fetch(`${cfg.url}/auth/v1/settings`, { headers: { apikey: cfg.key } }).then((r) => r.json()).then((d) => Object.assign(cloud, { google: !!d.external?.google, github: !!d.external?.github })).catch(() => {});
		cloud.status = 'out';
		sb.auth.onAuthStateChange((event, session) => {
			cloud.checked = true; // we now know whether someone is signed in
			const u = session?.user;
			const changed = u?.id !== cloud.user?.id;
			cloud.user = u ? { id: u.id, email: u.email, pending: u.new_email || '' } : null;
			if (u) setTimeout(() => takeProfile(u), 0);
			if (event === 'PASSWORD_RECOVERY') cloud.recovery = true;
			if (!u) cloud.status = 'out';
			// supabase calls must not run inside this callback, so defer
			else if (changed) setTimeout(pull, 0);
		});
		watch(() => {
			clearTimeout(timer);
			if (cloud.user) timer = setTimeout(push, 2500);
		});
		document.addEventListener('visibilitychange', () => {
			if (!cloud.user) return;
			if (document.hidden) {
				clearTimeout(timer);
				push();
			} else pull(); // pick up changes made on another device
		});
	} catch {
		/* offline or not configured: the app keeps working locally */
	} finally {
		cloud.ready = true;
		// with no account system the answer is already known; otherwise the first sign-in event sets it (3 s safety net)
		if (!sb) cloud.checked = true;
		else setTimeout(() => (cloud.checked = true), 3000);
	}
}

function fail(e) {
	cloud.status = 'error';
	cloud.error = e.message || 'Sync failed';
}

export async function pull() {
	if (!sb || !cloud.user) return;
	const uid = cloud.user.id;
	cloud.status = 'syncing';
	const { data, error } = await sb.from('progress').select('data, rev').eq('user_id', uid).eq('lang', lang).maybeSingle(); // one row per language
	if (error) return fail(error);
	const what = decide({ uid, localUid: S.uid, localRev: rev(), remote: !!data, remoteRev: data?.rev || 0 });
	if (what === 'pull') {
		const merged = keepPlacement({ ...data.data, uid }, $state.snapshot(S), STAGE_IDS);
		replace(merged, data.rev);
		cloud.status = 'synced';
		cloud.at = Date.now();
		// a placement result earned signed out was added to the account data: save that back
		if (Object.keys(merged.badges || {}).length !== Object.keys(data.data.badges || {}).length) await push();
		return;
	}
	if (what === 'fresh') reset();
	S.uid = uid;
	await push();
}

export async function push() {
	if (!sb || !cloud.user) return;
	cloud.status = 'syncing';
	const { pass, ...data } = $state.snapshot(S); // the passcode stays on the device
	data.uid = cloud.user.id;
	const { error } = await sb.from('progress').upsert({ user_id: cloud.user.id, lang, data, rev: rev() || Date.now(), updated_at: new Date().toISOString() });
	if (error) return fail(error);
	cloud.status = 'synced';
	cloud.at = Date.now();
}

// Photos of lesson notes live in a private bucket, one folder per user. Signed out, the photo is not kept.
const NOTES = 'notes';
export async function savePhoto(id, dataUrl) {
	if (!sb || !cloud.user) return '';
	const path = `${cloud.user.id}/${id}.jpg`;
	const blob = await (await fetch(dataUrl)).blob();
	const { error } = await sb.storage.from(NOTES).upload(path, blob, { contentType: 'image/jpeg', upsert: true });
	return error ? '' : path;
}
export const photoUrl = async (path) => (cloud.user && (await sb?.storage.from(NOTES).createSignedUrl(path, 3600))?.data?.signedUrl) || '';
export const dropPhoto = (path) => sb?.storage.from(NOTES).remove([path]);

const back = () => location.origin + '/account';
const ok = ({ data, error }) => {
	if (error) throw error;
	return data;
};
export const oauth = async (provider) => ok(await sb.auth.signInWithOAuth({ provider, options: { redirectTo: back() } }));
export const signIn = async (email, password) => ok(await sb.auth.signInWithPassword({ email, password }));
export const signUp = async (email, password) => ok(await sb.auth.signUp({ email, password, options: { emailRedirectTo: back() } }));
export const forgot = async (email) => ok(await sb.auth.resetPasswordForEmail(email, { redirectTo: back() }));
export const setPassword = async (password) => {
	ok(await sb.auth.updateUser({ password }));
	cloud.recovery = false;
};
// Deletes everything this account has on the server (progress in every language, saved photos), then signs out.
// What is on this device stays. The sign-in itself is removed on request, since the browser is not allowed to delete users.
export async function wipe() {
	clearTimeout(timer);
	const uid = cloud.user.id;
	const { data: files } = await sb.storage.from(NOTES).list(uid, { limit: 1000 });
	if (files?.length) await sb.storage.from(NOTES).remove(files.map((f) => `${uid}/${f.name}`));
	ok(await sb.from('progress').delete().eq('user_id', uid));
	S.uid = null;
	await sb.auth.signOut();
}

// ---------- profile: name and picture ----------
// Both live on the device (so they show instantly, offline, and signed out) and, when signed in,
// in the account: the name in the sign-in record, the picture in your private storage folder.
const AVATAR = 'avatar.jpg';

function setProfile(next) {
	savePrefs(next);
	cloud.name = P.name;
	cloud.avatar = P.avatar;
}

// after sign-in: take the account's name and picture if this device has none, or an older picture
async function takeProfile(u) {
	const m = u.user_metadata || {};
	const name = m.display_name || (P.name ? '' : m.full_name || m.name || '');
	if (name && name !== P.name && !P.name) setProfile({ name });
	else if (m.display_name && m.display_name !== P.name && (m.profile_at || 0) > (P.profileAt || 0)) setProfile({ name: m.display_name, profileAt: m.profile_at });
	if (m.avatar_at && m.avatar_at > (P.avatarAt || 0)) {
		const { data } = await sb.storage.from(NOTES).download(`${u.id}/${AVATAR}`);
		if (data) {
			const url = await new Promise((ok) => {
				const r = new FileReader();
				r.onload = () => ok(r.result);
				r.readAsDataURL(data);
			});
			setProfile({ avatar: url, avatarAt: m.avatar_at });
		}
	}
}

export async function saveName(name) {
	const at = Date.now();
	setProfile({ name: name.trim().slice(0, 40), profileAt: at });
	if (sb && cloud.user) ok(await sb.auth.updateUser({ data: { display_name: P.name, profile_at: at } }));
}

// dataUrl: a small square JPEG made in the browser. Empty string removes the picture.
export async function saveAvatar(dataUrl) {
	const at = Date.now();
	setProfile({ avatar: dataUrl, avatarAt: at });
	if (!sb || !cloud.user) return;
	const path = `${cloud.user.id}/${AVATAR}`;
	if (dataUrl) {
		const blob = await (await fetch(dataUrl)).blob();
		const up = await sb.storage.from(NOTES).upload(path, blob, { contentType: 'image/jpeg', upsert: true });
		if (up.error) throw up.error;
	} else await sb.storage.from(NOTES).remove([path]);
	ok(await sb.auth.updateUser({ data: { avatar_at: dataUrl ? at : 0 } }));
}

// Supabase sends a confirmation link to the new address; the email only changes once it is clicked.
export const changeEmail = async (email) => ok(await sb.auth.updateUser({ email }, { emailRedirectTo: back() }));

export async function signOut() {
	clearTimeout(timer);
	await push();
	await sb.auth.signOut();
}
