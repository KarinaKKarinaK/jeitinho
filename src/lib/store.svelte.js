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
	say: '', ex: '', exEn: '', pos: '', note: '', star: false, cols: [], ...w,
	id: Math.random().toString(36).slice(2, 10),
	src, added: Date.now(), due: 0, ivl: 0, ease: 2.5, reps: 0
});

const blank = () => ({ xp: 0, streak: 0, last: null, days: {}, done: {}, words: [], asked: {}, quiz: {}, materials: [], custom: {}, chat: [], pass: '', rate: 0.9, drill: pack.drill.start, uid: null, badges: {}, nquiz: 0, onboarded: false, placed: null, placeSeen: [], placedAt: 0, mins: {}, cols: [], seedN: 0 });
const seeded = () => ({ ...blank(), words: SEED.map((w) => newWord(w)), seedN: SEED.length });

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

// The starter list grows between versions (this runs after `last` is taken, so the upgrade is saved and synced). Bring an existing bank up to date once:
// add starter words it does not have yet (at the end, so your own words stay on top) and fill in missing part of speech tags.
if (S.seedN !== SEED.length) {
	const have = new Map(S.words.map((w) => [wordKey(w.pt), w]));
	for (const w of SEED) {
		const mine = have.get(wordKey(w.pt));
		if (!mine) S.words.push(newWord(w));
		else if (!mine.pos && w.pos) mine.pos = w.pos;
	}
	S.seedN = SEED.length;
}
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
