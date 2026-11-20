import { today, dayAgo, notice } from './fx.js';
import { SEED } from './content.js';
import { wordKey } from './quiz.js';
import { lang, pack } from './lang.js';
import { grandfather } from './roadmap.js';

// State lives in localStorage so the app works offline and signed out.
// When signed in, cloud.svelte.js mirrors the same object to the database.
// One saved state per language. Portuguese keeps the original key so existing progress is untouched.
const KEY = lang === 'pt' ? 'jeitinho:v1' : `jeitinho:v1:${lang}`;
const PASS = 'jeitinho:pass'; // the passcode is shared by all languages on this device
const REV = KEY + ':rev';

export const newWord = (w, src = 'seed') => ({
	say: '', ex: '', exEn: '', pos: '', note: '', star: false, cols: [], ...w,
	id: Math.random().toString(36).slice(2, 10),
	src, added: Date.now(), due: 0, ivl: 0, ease: 2.5, reps: 0
});

const blank = () => ({ xp: 0, streak: 0, last: null, days: {}, done: {}, words: [], asked: {}, quiz: {}, materials: [], custom: {}, chat: [], pass: '', rate: 0.9, drill: pack.drill.start, uid: null, badges: {}, nquiz: 0, onboarded: false, placed: null, placeSeen: [], placedAt: 0, mins: {}, cols: [], seedN: 0, chapters: null, texts: [], gloss: {}, read: {}, gone: {} });
const seeded = () => ({ ...blank(), words: SEED.map((w) => newWord(w)), seedN: SEED.length, chapters: {} });

function load() {
	try {
		const s = JSON.parse(localStorage.getItem(KEY));
		if (s) return { ...blank(), ...s, pass: localStorage.getItem(PASS) ?? s.pass ?? '' }; // one passcode for every language
		return { ...seeded(), pass: localStorage.getItem(PASS) || '' };
	} catch {
		/* first run or private mode */
	}
	return seeded();
}

export const S = $state(load());

// rev = time of the last real change on this device. Sync compares it with the account's copy.
export const rev = () => {
	try {
		return +localStorage.getItem(REV) || 0;
	} catch {
		return 0;
	}
};

let last = JSON.stringify(S); // what is on disk; merely opening the app is not a change
let onChange = null;
export const watch = (fn) => (onChange = fn);
let warned = false;

// Writes the state with the given revision. Returns false if the browser would not store it.
function write(r) {
	const put = (text) => {
		localStorage.setItem(KEY, text);
		localStorage.setItem(PASS, S.pass || '');
		localStorage.setItem(REV, r);
	};
	last = JSON.stringify(S);
	try {
		put(last);
	} catch {
		// Storage is full or blocked. Looked-up word meanings are only a cache: drop them and try once more.
		try {
			S.gloss = {};
			last = JSON.stringify(S);
			put(last);
		} catch {
			if (!warned) notice('Your progress could not be saved on this device: the browser storage is full or blocked. Sign in to keep it in your account, or free up space.', 'offline');
			warned = true;
			return false;
		}
	}
	return true;
}

// Housekeeping when the app updates. It is saved under the revision the state already had, so an old
// device does not look newer than the account just because it tidied itself up.
{
	const before = last;
	// the starter list grows between versions: add the starter words this bank lacks (at the end, so your own
	// words stay on top), skipping any you removed, and fill in missing part of speech tags
	if (S.seedN !== SEED.length) {
		const have = new Map(S.words.map((w) => [wordKey(w.pt), w]));
		for (const w of SEED) {
			const mine = have.get(wordKey(w.pt));
			if (!mine && !S.gone?.[wordKey(w.pt)]) S.words.push(newWord(w));
			else if (mine && !mine.pos && w.pos) mine.pos = w.pos;
		}
		S.seedN = SEED.length;
	}
	// chapters arrived later: people who were already studying keep access to what they had reached
	if (S.chapters == null) S.chapters = grandfather(S);
	if (JSON.stringify(S) !== before && typeof localStorage !== 'undefined') write(rev());
}

// Called whenever the state changes: save it, stamp it as changed now, and let sync know.
export function persist() {
	if (JSON.stringify(S) === last) return;
	write(Date.now());
	onChange?.();
}

// Two tabs of the app share one copy: when another tab saves, this one takes that state instead of
// later overwriting it with its own older one.
if (typeof window !== 'undefined')
	window.addEventListener('storage', (e) => {
		if (e.key !== KEY || !e.newValue || e.newValue === last) return;
		try {
			Object.assign(S, blank(), JSON.parse(e.newValue));
			last = JSON.stringify(S); // already on disk, written by the other tab: nothing to save or announce
		} catch {
			/* not our data */
		}
	});

// Take a state from the account (or a merge) and save it under the given revision, without announcing a change.
export function replace(data, r) {
	Object.assign(S, blank(), data, { pass: S.pass });
	write(r);
}
// Remember that something was deleted, so sync and app updates do not bring it back.
export function forget(idOrKey) {
	S.gone[idOrKey] = Date.now();
	const keys = Object.keys(S.gone);
	if (keys.length > 800) for (const k of keys.sort((x, y) => S.gone[x] - S.gone[y]).slice(0, keys.length - 800)) delete S.gone[k]; // keep the newest 800
}
export function removeWord(w) {
	forget(wordKey(w.pt));
	S.words.splice(S.words.indexOf(w), 1);
}
export function reset() {
	Object.assign(S, seeded(), { pass: S.pass });
}

export function addXP(n) {
	const d = today();
	if (S.last !== d) {
		S.streak = S.last === dayAgo(1) ? S.streak + 1 : 1;
		S.last = d;
	}
	S.xp += n;
	S.days[d] = (S.days[d] || 0) + n;
}

export const streak = () => (S.last === today() || S.last === dayAgo(1) ? S.streak : 0);

export function addWords(list, src) {
	const have = new Set(S.words.map((w) => wordKey(w.pt)));
	let n = 0;
	for (const w of list) {
		const k = w?.pt && wordKey(w.pt);
		if (!k || !w.en || have.has(k)) continue;
		have.add(k);
		delete S.gone[k]; // adding it again brings a removed word back
		S.words.unshift(newWord({ pt: w.pt, en: w.en, say: w.say || '', ex: w.ex || '', exEn: w.exEn || '', pos: w.pos || '', note: w.note || '', star: !!w.star }, src));
		n++;
	}
	return n;
}

// Star a word anywhere in the app. Not in the bank yet? Starring saves it.
export function starWord(word, src = 'starred') {
	const k = wordKey(word.pt);
	const mine = S.words.find((w) => wordKey(w.pt) === k);
	if (mine) mine.star = !mine.star;
	else addWords([{ ...word, en: word.en || '?', star: true }], src);
}

// Collections: named folders of words. A word can sit in several.
export function newCollection(name) {
	const id = Math.random().toString(36).slice(2, 9);
	S.cols.push({ id, name: name.trim().slice(0, 40) });
	return id;
}
export function dropCollection(id) {
	forget(id);
	S.cols = S.cols.filter((c) => c.id !== id);
	for (const w of S.words) if (w.cols?.includes(id)) w.cols = w.cols.filter((c) => c !== id);
}
export function toggleIn(w, id) {
	w.cols = w.cols?.includes(id) ? w.cols.filter((c) => c !== id) : [...(w.cols || []), id];
}

const LEVELS = pack.levels;
export function level() {
	const i = LEVELS.findLastIndex(([x]) => S.xp >= x);
	const next = LEVELS[i + 1]?.[0];
	return { name: LEVELS[i][1], next, pct: next ? (S.xp - LEVELS[i][0]) / (next - LEVELS[i][0]) : 1 };
}
