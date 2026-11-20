import { DAY } from './fx.js';
import { pack, meta, t, lang } from './lang.js';
import { numbered } from './tone.js';

// ---------- answer checking ----------
const PUNCT = /[.,!?¿¡;:"“”()。，！？、；：「」『』（）…·]/g;
export const norm = (s) => {
	s = String(s).toLowerCase().normalize('NFC').replace(PUNCT, '').replace(/\s+/g, ' ').trim();
	return meta.chars ? s.replace(/ /g, '') : s; // Chinese and Japanese: spacing never matters
};
// bare = forgiving form: no accents or tone marks on Latin letters (kana marks are kept), no leading article
const bare = (s) => norm(s).normalize('NFD').replace(/(?<=\p{Script=Latin})\p{M}+/gu, '').normalize('NFC').replace(pack.articles || /^$/, '');
// Identity of a word in the bank: accents matter (avó and avô, país and pais are different words),
// a leading article does not.
export const wordKey = (s) => norm(s).replace(pack.articles || /^$/, '');

export function check(val, q) {
	if (lang === 'zh') val = numbered(val); // tones typed as numbers: ni3 hao3
	const ok = [q.answer, ...(q.accept || [])].flatMap((a) => a.split('/')).map((a) => a.trim());
	if (ok.some((a) => norm(a) === norm(val))) return { ok: true };
	if (ok.some((a) => bare(a) === bare(val))) return { ok: true, note: t.near };
	return { ok: false };
}

// Speaking: which of the expected words did the recogniser hear? Word order is not checked.
// ponytail: this scores whether you were understood, not each sound. Phoneme-level scoring needs a paid pronunciation API.
export function sayScore(expected, heard) {
	// the recogniser writes spoken shortcuts out in full, so a pack can list forms to treat as equal
	const alias = pack.spoken || {};
	const full = (w) => (alias[bare(w)] || bare(w)).split(' ');
	const split = (s) => (meta.chars ? [...norm(s)] : norm(s).split(' ')); // no spaces in Chinese or Japanese: go character by character
	const pool = heard.flatMap((h) => split(h.w ?? h)).flatMap(full);
	const marks = split(expected).map((w) => {
		const i = pool.indexOf(full(w)[0]);
		if (i >= 0) pool.splice(i, 1);
		return { w, ok: i >= 0 };
	});
	return { marks, score: marks.filter((m) => m.ok).length / marks.length };
}

// ---------- spaced repetition (SM-2, trimmed) ----------
// q: 0 again, 1 hard, 2 good, 3 easy
export function grade(w, q, now = Date.now()) {
	if (q === 0) {
		w.reps = 0;
		w.ivl = 0;
		w.ease = Math.max(1.3, w.ease - 0.2);
		w.due = now + 10 * 60e3;
		return;
	}
	w.reps++;
	w.ivl = w.reps === 1 ? 1 : w.reps === 2 ? 3 : Math.max(1, Math.round(w.ivl * w.ease * [0, 0.6, 1, 1.3][q]));
	w.ease = Math.max(1.3, w.ease + [0, -0.15, 0, 0.15][q]);
	w.due = now + w.ivl * DAY;
}

// ---------- questions ----------
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasCloze = (w) => w.ex && new RegExp(esc(w.pt), 'i').test(w.ex);

export function wordQ(w, type) {
	const explain = [`${w.pt} = ${w.en}`, w.say && `Say it: ${w.say}`, w.ex && `${w.ex}${w.exEn ? '  (' + w.exEn + ')' : ''}`]
		.filter(Boolean)
		.join('\n');
	// Chinese and Japanese words can also be answered by their reading (pinyin, kana or romaji)
	const accept = meta.chars && w.say ? w.say.split(' · ') : undefined;
	const base = { key: `${w.id}:${type}`, wid: w.id, answer: w.pt, accept, speak: w.pt, explain };
	if (type === 'cloze')
		return { ...base, kind: 'type', label: 'Fill the gap', prompt: w.ex.replace(new RegExp(esc(w.pt), 'i'), '_____'), sub: w.exEn || w.en };
	if (type === 'listen') return { ...base, kind: 'listen', label: 'Listen and type', prompt: 'Type what you hear' };
	return { ...base, kind: 'type', label: t.sayLabel, prompt: w.en };
}

export function fromKey(S, key) {
	const d = pack.drill.make(key);
	if (d) return d;
	const [a, b] = key.split(':');
	const w = S.words.find((x) => x.id === a);
	return w ? wordQ(w, b === 'cloze' && !hasCloze(w) ? 'type' : b) : null;
}

// ---------- daily quiz selection ----------
// Time decay: a question (and its word) asked t days ago gets weight 1 - e^(-t/TAU).
// Asked today -> 0, 5 days ago -> 0.63, 15 days ago -> 0.95. So repeats come back slowly.
export const TAU = 5;
export const QUIZ_LEN = 11;

function rng(seed) {
	let h = 1779033703;
	for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 3432918353);
	return () => {
		h = (h + 0x6d2b79f5) | 0;
		let t = Math.imul(h ^ (h >>> 15), 1 | h);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function pick(cands, n, rnd) {
	const out = [];
	let pool = cands.slice();
	while (out.length < n && pool.length) {
		const total = pool.reduce((s, c) => s + c.wt, 0);
		let r = rnd() * total;
		let c = total > 0 ? pool.find((x) => (r -= x.wt) <= 0) || pool[pool.length - 1] : pool[Math.floor(rnd() * pool.length)];
		out.push(c.key);
		pool = pool.filter((x) => x.group !== c.group); // one question per word / verb+tense
	}
	return out;
}

// opts: { quizLen, quizAudio, quizDrills } from Settings
export function dailyQuiz(S, seed, now = Date.now(), opts = {}) {
	const len = opts.quizLen || QUIZ_LEN;
	const drills = opts.quizDrills !== false;
	const rnd = rng(seed);
	const decay = (k) => (S.asked[k] ? 1 - Math.exp(-(now - S.asked[k]) / DAY / TAU) : 1);
	const words = [];
	for (const w of S.words) {
		const need = w.reps === 0 ? 1.5 : w.due <= now ? 2 : 0.5; // overdue and new words first
		for (const type of (hasCloze(w) ? ['type', 'cloze', 'listen'] : ['type', 'listen']).filter((x) => x !== 'listen' || opts.quizAudio !== false)) {
			const key = `${w.id}:${type}`;
			words.push({ key, group: w.id, wt: need * decay(key) * decay('w:' + w.id) });
		}
	}
	const a = pick(words, drills ? Math.round((len * 8) / 11) : len, rnd);
	const b = pick(pack.drill.pool().filter((c) => !c.audio || opts.quizAudio !== false).map((c) => ({ ...c, wt: c.wt * decay(c.key) })), drills ? len - a.length : 0, rnd);
	const all = [...a, ...b];
	for (let i = all.length - 1; i > 0; i--) {
		const j = Math.floor(rnd() * (i + 1));
		[all[i], all[j]] = [all[j], all[i]];
	}
	return all;
}

export function markAsked(S, q, ok, now = Date.now()) {
	if (!q.key) return;
	S.asked[q.key] = now;
	if (q.wid) {
		S.asked['w:' + q.wid] = now;
		const w = S.words.find((x) => x.id === q.wid);
		if (w) grade(w, ok ? 2 : 0, now);
	}
}

// ---------- import a word list ----------
// Reads what Anki exports as "Notes in Plain Text", a CSV file, or rows pasted from Excel or Google Sheets.
// Works out the separator, skips Anki's # header lines, strips HTML, and uses a header row if there is one
// (front/back, word/meaning, term/definition, example, notes, tags ...). Without a header the columns are:
// word, meaning, example, example translation.
export function parseWordList(raw) {
	const lines = String(raw).replace(/^﻿/, '').split(/\r?\n/).filter((l) => l.trim() && !l.startsWith('#'));
	if (!lines.length) return [];
	// a tab on every line means tab-separated, whatever commas the meanings contain; otherwise the most common of ; and ,
	const sep = lines.every((l) => l.includes('\t')) ? '\t' : [';', ',', '\t'].map((d) => [d, lines.slice(0, 20).reduce((n, l) => n + l.split(d).length - 1, 0)]).sort((a, b) => b[1] - a[1])[0][0];
	const cells = (line) => {
		const out = [];
		let cur = '', quoted = false;
		for (let i = 0; i < line.length; i++) {
			const ch = line[i];
			if (quoted) {
				if (ch === '"' && line[i + 1] === '"') (cur += '"'), i++;
				else if (ch === '"') quoted = false;
				else cur += ch;
			} else if (ch === '"' && !cur) quoted = true;
			else if (ch === sep) (out.push(cur), (cur = ''));
			else cur += ch;
		}
		out.push(cur);
		return out.map((c) => c.replace(/<br\s*\/?>/gi, ' ').replace(/<[^<>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\[sound:[^\]]*\]/g, '').replace(/\s+/g, ' ').trim());
	};
	const rows = lines.map(cells);
	const NAMES = { pt: /^(front|word|term|expression|vocab\w*|target|foreign|pt|palavra|słowo|单词|単語|palabra)$/i, en: /^(back|meaning|definition|translation|english|en|gloss)$/i, ex: /^(example|sentence|ex|context)$/i, exEn: /^(example translation|sentence translation|exen|example english)$/i, say: /^(reading|pinyin|pronunciation|kana|furigana|say)$/i, note: /^(notes?|comment|hint|tags?)$/i, pos: /^(pos|part of speech|type|class)$/i };
	const head = rows[0].map((c) => Object.keys(NAMES).find((k) => NAMES[k].test(c)));
	const hasHead = head.includes('pt') && head.includes('en'); // both names, so a list that merely starts with the word "word" is not taken for a header
	const map = hasHead ? head : ['pt', 'en', 'ex', 'exEn'];
	return (hasHead ? rows.slice(1) : rows)
		.map((r) => Object.fromEntries(map.map((k, i) => [k, r[i] || '']).filter(([k]) => k)))
		.filter((w) => w.pt && w.en)
		.map((w) => ({ pt: w.pt.slice(0, 80), en: w.en.slice(0, 160), ex: (w.ex || '').slice(0, 300), exEn: (w.exEn || '').slice(0, 300), say: (w.say || '').slice(0, 120), note: (w.note || '').slice(0, 300), pos: (w.pos || '').toLowerCase() }))
		.slice(0, 5000);
}

// ---------- reading ----------
// Splits a paragraph into sentences. The reader and the build script that prepares word meanings must
// cut text the same way, so both use this.
export const splitSentences = (p) => p.match(/[^.!?。！？…]+[.!?。！？…]*["”’」』)]*\s*/g) || [p];
// A text is long enough for reading practice from about a paragraph: 60 words, or 100 characters in
// languages written without spaces. Shorter than that it is a phrase to mine for words, not something to read.
export const READ_MIN = 60;
export const READ_MIN_CHARS = 100;
export const longEnough = (text) => (meta.chars ? [...String(text).replace(/[\s\p{P}]/gu, '')].length >= READ_MIN_CHARS : String(text).trim().split(/\s+/).length >= READ_MIN);

// ---------- song lessons ----------
// A song always gets a lesson, whatever the AI managed to return. It is built from three sources:
// the lyric lines (meaning, fill the gap, listen and type), the words you saved from the song, and
// any quiz steps the model wrote. Works with lyrics alone.
export function songSteps(lyrics = [], words = [], extra = [], rnd = Math.random) {
	const mix = (a) => a.map((v) => [rnd(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
	const count = (l) => (meta.chars ? [...norm(l)].length : norm(l).split(' ').length);
	const uniq = [...new Map(lyrics.filter((l) => l?.pt).map((l) => [norm(l.pt), l])).values()];
	const mid = mix(uniq.filter((l) => count(l.pt) >= (meta.chars ? 4 : 3) && count(l.pt) <= (meta.chars ? 14 : 9)));
	const withEn = mid.filter((l) => l.en);
	const steps = [];
	// what does this line mean? (needs at least four translated lines to make the options)
	for (const l of withEn.slice(0, 3)) {
		const wrong = mix(withEn.filter((o) => o.en !== l.en)).slice(0, 3).map((o) => o.en);
		if (wrong.length === 3) steps.push({ kind: 'choice', label: 'What does this line mean?', prompt: l.pt, answer: l.en, options: [l.en, ...wrong], speak: l.pt, audio: true });
	}
	// your saved words: say it, and find it in its line
	for (const w of mix(words).slice(0, 4)) {
		steps.push({ kind: 'type', label: t.sayLabel, prompt: w.en, answer: w.pt, accept: meta.chars && w.say ? w.say.split(' · ') : undefined, speak: w.pt, explain: w.ex ? `${w.ex}${w.exEn ? '  (' + w.exEn + ')' : ''}` : '' });
		const line = uniq.find((l) => l.pt.toLowerCase().includes(w.pt.toLowerCase()) && norm(l.pt) !== norm(w.pt));
		if (line) steps.push({ kind: 'type', label: 'Fill the gap from the song', prompt: line.pt.replace(new RegExp(esc(w.pt), 'i'), '_____'), sub: line.en || w.en, answer: w.pt, speak: line.pt, explain: `${w.pt} = ${w.en}` });
	}
	// listen and type a short line
	for (const l of mix(mid.filter((l) => count(l.pt) <= (meta.chars ? 10 : 6))).slice(0, 3)) steps.push({ kind: 'listen', label: 'Listen and type the line', prompt: 'Type what you hear', speak: l.pt, answer: l.pt, explain: l.en || '' });
	return mix([...steps, ...cleanSteps(extra).filter((x) => x.kind !== 'info')]).slice(0, 14);
}

// ---------- sanitise LLM-made lesson steps (plain text only, never html) ----------
export function cleanSteps(steps) {
	const s = (v, n = 600) => (typeof v === 'string' ? v.slice(0, n) : '');
	return (Array.isArray(steps) ? steps : [])
		.slice(0, 14)
		.map((x) => {
			if (x?.kind === 'info') return { kind: 'info', title: s(x.title, 120), body: s(x.body, 900) };
			const answer = s(x?.answer, 200);
			if (!answer) return null;
			if (x.kind === 'choice') {
				const options = [...new Set([answer, ...(Array.isArray(x.options) ? x.options.map((o) => s(o, 200)) : [])])].filter(Boolean).slice(0, 4);
				return options.length > 1 ? { kind: 'choice', prompt: s(x.prompt), answer, options, explain: s(x.explain) } : null;
			}
			if (x.kind === 'type') return { kind: 'type', prompt: s(x.prompt), answer, speak: answer, explain: s(x.explain), accept: Array.isArray(x.accept) ? x.accept.slice(0, 3).map((a) => s(a, 200)).filter(Boolean) : undefined };
			return null;
		})
		.filter(Boolean);
}
