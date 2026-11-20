import { S, rev, watch, replace, reset } from './store.svelte.js';
import { decide } from './sync.js';
import { caps } from './fx.js';
import { lang } from './lang.js';

// status: off (not configured) | out (signed out) | syncing | synced | error
export const cloud = $state({ ready: false, status: 'off', user: null, error: '', recovery: false, at: 0, ai: false, tts: false, stt: false });

let sb;
let timer;

export async function init() {
	try {
		const cfg = await (await fetch('/api/config')).json();
		Object.assign(caps, { ai: !!cfg.ai, tts: !!cfg.tts, stt: !!cfg.stt });
		Object.assign(cloud, caps);
		if (!cfg.url || !cfg.key) return;
		const { createClient } = await import('@supabase/supabase-js');
		sb = createClient(cfg.url, cfg.key);
		cloud.status = 'out';
		sb.auth.onAuthStateChange((event, session) => {
			const u = session?.user;
			const changed = u?.id !== cloud.user?.id;
			cloud.user = u ? { id: u.id, email: u.email } : null;
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
		replace({ ...data.data, uid }, data.rev);
		cloud.status = 'synced';
		cloud.at = Date.now();
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
export async function signOut() {
	clearTimeout(timer);
	await push();
	await sb.auth.signOut();
}
