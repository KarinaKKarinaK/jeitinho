import { DAY } from './fx.js';
import { conj, table, PRON, TENSES, VERBS } from './conj.js';

// ---------- answer checking ----------
export const norm = (s) =>
	String(s).toLowerCase().normalize('NFC').replace(/[.,!?¿¡;:"“”()]/g, '').replace(/\s+/g, ' ').trim();
const bare = (s) => norm(s).normalize('NFD').replace(/\p{M}/gu, '').replace(/^(o|a|os|as|um|uma) /, '');
export const wordKey = bare;

export function check(val, q) {
	const ok = [q.answer, ...(q.accept || [])].flatMap((a) => a.split('/')).map((a) => a.trim());
	if (ok.some((a) => norm(a) === norm(val))) return { ok: true };
	if (ok.some((a) => bare(a) === bare(val))) return { ok: true, note: 'Right, but check the accents or article.' };
	return { ok: false };
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
	const base = { key: `${w.id}:${type}`, wid: w.id, answer: w.pt, speak: w.pt, explain };
	if (type === 'cloze')
		return { ...base, kind: 'type', label: 'Fill the gap', prompt: w.ex.replace(new RegExp(esc(w.pt), 'i'), '_____'), sub: w.exEn || w.en };
	if (type === 'listen') return { ...base, kind: 'listen', label: 'Listen and type', prompt: 'Type what you hear' };
	return { ...base, kind: 'type', label: 'Say it in Portuguese', prompt: w.en };
}

export function conjQ(verb, tense, p) {
	return {
		key: `conj:${verb}:${tense}:${p}`,
		kind: 'type',
		label: TENSES[tense].name,
		prompt: `${TENSES[tense].cue} ${PRON[p]} _____`,
		sub: `${verb} · ${VERBS[verb]}`,
		answer: conj(verb, tense, p),
		speak: `${PRON[p]} ${conj(verb, tense, p)}`,
		explain: table(verb, tense),
		html: true
	};
}

export function fromKey(S, key) {
	const [a, b, c, d] = key.split(':');
	if (a === 'conj') return VERBS[b] && TENSES[c] ? conjQ(b, c, +d) : null;
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

export function conjPool(S, now, tenses = Object.keys(TENSES), persons = [0, 1, 2, 3], decay = () => 1) {
	const pool = [];
	for (const v of Object.keys(VERBS))
		for (const t of tenses)
			for (const p of persons) {
				const key = `conj:${v}:${t}:${p}`;
				// eu and você get double weight: that pair is where the mistakes are
				pool.push({ key, group: `${v}:${t}`, wt: (p < 2 ? 2 : 1) * decay(key) });
			}
	return pool;
}

export function dailyQuiz(S, seed, now = Date.now()) {
	const rnd = rng(seed);
	const decay = (k) => (S.asked[k] ? 1 - Math.exp(-(now - S.asked[k]) / DAY / TAU) : 1);
	const words = [];
	for (const w of S.words) {
		const need = w.reps === 0 ? 1.5 : w.due <= now ? 2 : 0.5; // overdue and new words first
		for (const type of hasCloze(w) ? ['type', 'cloze', 'listen'] : ['type', 'listen']) {
			const key = `${w.id}:${type}`;
			words.push({ key, group: w.id, wt: need * decay(key) * decay('w:' + w.id) });
		}
	}
	const a = pick(words, 8, rnd);
	const b = pick(conjPool(S, now, undefined, undefined, decay), QUIZ_LEN - a.length, rnd);
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
			if (x.kind === 'type') return { kind: 'type', prompt: s(x.prompt), answer, speak: answer, explain: s(x.explain) };
			return null;
		})
		.filter(Boolean);
}
