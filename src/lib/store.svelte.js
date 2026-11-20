import { today, DAY } from './fx.js';
import { SEED } from './content.js';
import { wordKey } from './quiz.js';

// ponytail: everything lives in localStorage on this device. Use Export in settings to back up; add a database when sync across devices matters.
const KEY = 'jeitinho:v1';

export const newWord = (w, src = 'seed') => ({
	say: '', ex: '', exEn: '', ...w,
	id: Math.random().toString(36).slice(2, 10),
	src, added: Date.now(), due: 0, ivl: 0, ease: 2.5, reps: 0
});

function load() {
	const base = { xp: 0, streak: 0, last: null, days: {}, done: {}, words: [], asked: {}, quiz: {}, materials: [], custom: {}, chat: [], pass: '', rate: 0.9, drill: ['perf'] };
	try {
		const s = JSON.parse(localStorage.getItem(KEY));
		if (s) return { ...base, ...s };
	} catch {
		/* first run or private mode */
	}
	base.words = SEED.map((w) => newWord(w));
	return base;
}

export const S = $state(load());

export function persist() {
	try {
		localStorage.setItem(KEY, JSON.stringify(S));
	} catch {
		/* storage full or blocked */
	}
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

const LEVELS = [[0, 'Gringo'], [150, 'Turista'], [500, 'Morador'], [1200, 'Belo-horizontino'], [2500, 'Mineiro honorário'], [5000, 'Quase nativo']];
export function level() {
	const i = LEVELS.findLastIndex(([x]) => S.xp >= x);
	const next = LEVELS[i + 1]?.[0];
	return { name: LEVELS[i][1], next, pct: next ? (S.xp - LEVELS[i][0]) / (next - LEVELS[i][0]) : 1 };
}
