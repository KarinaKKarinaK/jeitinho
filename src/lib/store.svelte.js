import { today, DAY } from './fx.js';
import { SEED } from './content.js';
import { wordKey } from './quiz.js';
import { lang, pack } from './lang.js';

// State lives in localStorage so the app works offline and signed out.
// When signed in, cloud.svelte.js mirrors the same object to the database.
// One saved state per language. Portuguese keeps the original key so existing progress is untouched.
const KEY = lang === 'pt' ? 'jeitinho:v1' : `jeitinho:v1:${lang}`;
const PASS = 'jeitinho:pass'; // the passcode is shared by all languages on this device
const REV = KEY + ':rev';

export const newWord = (w, src = 'seed') => ({
	say: '', ex: '', exEn: '', ...w,
	id: Math.random().toString(36).slice(2, 10),
	src, added: Date.now(), due: 0, ivl: 0, ease: 2.5, reps: 0
});

const blank = () => ({ xp: 0, streak: 0, last: null, days: {}, done: {}, words: [], asked: {}, quiz: {}, materials: [], custom: {}, chat: [], pass: '', rate: 0.9, drill: pack.drill.start, uid: null, badges: {}, nquiz: 0, onboarded: false, placed: null });
const seeded = () => ({ ...blank(), words: SEED.map((w) => newWord(w)) });

function load() {
	try {
		const s = JSON.parse(localStorage.getItem(KEY));
		if (s) return { ...blank(), ...s, pass: s.pass || localStorage.getItem(PASS) || '' };
		return { ...seeded(), pass: localStorage.getItem(PASS) || '' };
	} catch {
		/* first run or private mode */
	}
	return seeded();
}

export const S = $state(load());

let last = JSON.stringify(S); // so merely opening the app never counts as a change
let applying = null;
let onChange = null;

// rev = time of the last real change on this device. Sync compares it with the server copy.
export const rev = () => {
	try {
		return +localStorage.getItem(REV) || 0;
	} catch {
		return 0;
	}
};
export const watch = (fn) => (onChange = fn);

export function persist() {
	const s = JSON.stringify(S);
	if (s === last) return;
	last = s;
	try {
		localStorage.setItem(KEY, s);
		localStorage.setItem(PASS, S.pass || '');
		localStorage.setItem(REV, applying ?? Date.now());
	} catch {
		/* storage full or blocked */
	}
	if (applying === null) onChange?.();
	applying = null;
}

// Take the server copy without echoing it straight back.
export function replace(data, r) {
	applying = r;
	Object.assign(S, blank(), data, { pass: S.pass });
}
export function reset() {
	Object.assign(S, seeded(), { pass: S.pass });
}

export function addXP(n) {
	const d = today();
	if (S.last !== d) {
		S.streak = S.last === today(new Date(Date.now() - DAY)) ? S.streak + 1 : 1;
		S.last = d;
	}
	S.xp += n;
	S.days[d] = (S.days[d] || 0) + n;
}

export const streak = () => (S.last === today() || S.last === today(new Date(Date.now() - DAY)) ? S.streak : 0);

export function addWords(list, src) {
	const have = new Set(S.words.map((w) => wordKey(w.pt)));
	let n = 0;
	for (const w of list) {
		const k = w?.pt && wordKey(w.pt);
		if (!k || !w.en || have.has(k)) continue;
		have.add(k);
		S.words.unshift(newWord({ pt: w.pt, en: w.en, say: w.say || '', ex: w.ex || '', exEn: w.exEn || '' }, src));
		n++;
	}
	return n;
}

const LEVELS = pack.levels;
export function level() {
	const i = LEVELS.findLastIndex(([x]) => S.xp >= x);
	const next = LEVELS[i + 1]?.[0];
	return { name: LEVELS[i][1], next, pct: next ? (S.xp - LEVELS[i][0]) / (next - LEVELS[i][0]) : 1 };
}
