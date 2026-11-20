import { LESSONS } from './content.js';
import { conjPool, fromKey } from './quiz.js';

// The road from zero to C2 in small checkpoints. Each stage has milestones (things you do)
// and a checkpoint test (things you prove). Pass both and you earn the badge.
// These are the app's own checkpoints, modeled on CEFR. They are not an official certificate.
// [id, title, what you can do, lessons, tenses in the test, mastered words, daily quizzes]
const ALL = ['pres', 'perf', 'imp', 'cond', 'sp', 'si', 'sf'];
const ROWS = [
	['A1.1', 'Primeiras palavras', 'Greet people and say who you are', ['sons-1', 'base-1'], ['pres'], 0, 1],
	['A1.2', 'Sons e presente', 'Pronounce what you read and talk about now', ['sons-2', 'pres-1'], ['pres'], 5, 3],
	['A2.1', 'O passado', 'Say what you did yesterday, eu and você', ['perf-1', 'perf-2'], ['pres', 'perf'], 15, 6],
	['A2.2', 'Contando histórias', 'Tell a story with background and events', ['imp-1'], ['perf', 'imp'], 30, 10],
	['B1.1', 'Conversa de verdade', 'Keep a chat going with natural fillers', ['conv-1', 'bh-1'], ['pres', 'perf', 'imp', 'cond'], 50, 15],
	['B1.2', 'Mineirês', 'Follow how people really talk in BH', ['bh-2', 'es-1'], ['perf', 'imp', 'cond', 'sp'], 80, 22],
	['B2.1', 'Subjuntivo', 'Express wishes, doubts and hypotheticals', ['subj-1', 'subj-2'], ['sp', 'si'], 150, 30],
	['B2.2', 'Quando eu for', 'Use the future subjunctive without thinking', ['subj-3', 'subj-4'], ['sp', 'si', 'sf'], 250, 45],
	['B2.3', 'Todos os tempos', 'Switch between every tense mid-sentence', ['inf-1', 'comp-1'], ALL, 400, 60],
	['C1.1', 'Vocabulário largo', 'Read articles and catch most idioms', ['con-1', 'idi-1'], ALL, 700, 90],
	['C1.2', 'Nuance', 'Pick the precise word, not the safe one', ['reg-1', 'c2-1'], ALL, 1000, 120],
	['C1.3', 'Quase lá', 'Argue, joke and tell stories at speed', ['c2-2'], ALL, 1500, 150],
	['C2.1', 'Domínio', 'Surprise natives with your word choice', [], ALL, 2200, 200],
	['C2.2', 'Quase nativo', 'Hold your own anywhere, on anything', [], ALL, 3000, 270]
];

export const STAGES = ROWS.map(([id, title, can, lessons, tenses, mastered, quizzes]) => {
	const band = id[0];
	return {
		id, title, can, lessons, tenses, mastered, quizzes, band,
		persons: band === 'A' ? [0, 1] : [0, 1, 2, 3], // A levels test only eu and você
		n: { A: 14, B: 20, C: 24 }[band], // questions in the checkpoint test
		pass: { A: 0.8, B: 0.85, C: 0.9 }[band]
	};
});

export const MASTERED_DAYS = 7; // a word counts as mastered once its review gap reaches a week
export const masteredCount = (S) => S.words.filter((w) => w.ivl >= MASTERED_DAYS).length;

// The stage you are working on: the first one without a badge.
export const current = (S) => STAGES.find((s) => !S.badges?.[s.id]) || null;
export const earned = (S) => STAGES.filter((s) => S.badges?.[s.id]).at(-1) || null;

// After a placement test, later stages count only what you do from there on, not from zero.
const baseline = (S, stage) => {
	const b = STAGES.find((s) => s.id === S.placed);
	return b && STAGES.indexOf(b) < STAGES.indexOf(stage) ? b : { mastered: 0, quizzes: 0 };
};

export function milestones(S, stage) {
	const base = baseline(S, stage);
	const mastered = stage.mastered - base.mastered;
	const quizzes = stage.quizzes - base.quizzes;
	const done = stage.lessons.filter((id) => id in S.done).length;
	const list = [];
	if (stage.lessons.length)
		list.push({ label: `Finish ${stage.lessons.map((id) => `"${LESSONS[id].title}"`).join(' and ')}`, have: done, need: stage.lessons.length, href: `/lesson?id=${stage.lessons.find((id) => !(id in S.done)) || stage.lessons[0]}` });
	if (mastered) list.push({ label: `Master ${mastered} words (review gap of a week or more)`, have: masteredCount(S), need: mastered, href: '/bank?tab=review' });
	list.push({ label: `Complete ${quizzes} daily ${quizzes === 1 ? 'quiz' : 'quizzes'}`, have: S.nquiz || 0, need: quizzes, href: '/quiz' });
	return list.map((m) => ({ ...m, have: Math.min(m.have, m.need), ok: m.have >= m.need }));
}

// Placement: where you start after passing n bands of the placement test (0 = none).
// Deliberately cautious at the top: four questions are not enough to hand out C1.
const START = ['A1.1', 'A2.1', 'B1.1', 'B2.1', 'B2.3', 'C1.2'];
export const PASS_BAND = 3; // right answers out of 4 to clear a band
export function place(S, bands, date) {
	const i = STAGES.findIndex((s) => s.id === START[Math.min(bands, START.length - 1)]);
	for (const s of STAGES.slice(0, i)) {
		S.badges[s.id] ??= date;
		for (const id of s.lessons) S.done[id] ??= 0; // marked done so "next lesson" starts in the right place; still open to take
	}
	S.placed = i ? STAGES[i - 1].id : null;
	S.onboarded = true;
	return STAGES[i];
}

export const ready = (S, stage) => milestones(S, stage).every((m) => m.ok);

const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);

// B and C tests add harder tasks on top: [sentences to hear and type, writing tasks, sentences to say out loud]
export const EXTRA = { A: [0, 0, 0], B: [3, 2, 2], C: [4, 3, 3] };
const WRITING = {
	B: [
		['Conta o que você fez no último fim de semana.', 'Say what you did last weekend. 2 or 3 sentences, in the past.'],
		['Como era a sua vida quando você era criança?', 'What was your life like as a child? 2 or 3 sentences.'],
		['O que você faria se ganhasse na loteria?', 'What would you do if you won the lottery? 2 or 3 sentences.'],
		['O que você espera que aconteça este ano?', 'What do you hope happens this year? Use "espero que" or "tomara que".'],
		['Dê um conselho a um amigo que vai visitar Belo Horizonte.', 'Give advice to a friend visiting Belo Horizonte. 2 or 3 sentences.']
	],
	C: [
		['Defenda ou critique: "Trabalhar de casa é melhor do que no escritório."', 'Argue for or against. 3 or 4 sentences, with connectors.'],
		['Conte um perrengue que você passou e o que teria feito diferente.', 'Tell about a rough situation and what you would have done differently.'],
		['Explique uma gambiarra ou um jeitinho que você já deu.', 'Explain a hack or workaround you once pulled off. 3 or 4 sentences.'],
		['Se você tivesse nascido no Brasil, como seria a sua vida hoje?', 'If you had been born in Brazil, what would your life be like? 3 or 4 sentences.'],
		['Descreva alguém que você admira e explique por quê.', 'Describe someone you admire and why. 3 or 4 sentences, no "legal" or "bom".']
	]
};

// Half verbs in this stage's tenses, half words from your own bank (best-known first, so it tests what you claim to know).
export function buildTest(S, stage, can = {}) {
	const half = Math.ceil(stage.n / 2);
	const seen = new Set();
	const verbs = shuffle(conjPool(S, 0, stage.tenses, stage.persons)).filter((c) => !seen.has(c.group) && seen.add(c.group)).slice(0, half).map((c) => c.key);
	const known = shuffle(S.words.filter((w) => w.reps > 0));
	const rest = shuffle(S.words.filter((w) => w.reps === 0));
	const kinds = stage.band === 'A' ? ['type', 'type', 'listen'] : ['type', 'cloze', 'listen'];
	const words = [...known, ...rest].slice(0, stage.n - verbs.length).map((w, i) => `${w.id}:${kinds[i % 3]}`);
	const core = shuffle([...verbs, ...words]).map((k) => fromKey(S, k)).filter(Boolean).map(({ key, ...q }) => q); // no key: tests do not touch quiz spacing
	const [nl, nw, ns] = EXTRA[stage.band];
	const sent = shuffle(S.words.filter((w) => w.ex && w.ex.split(' ').length >= 3));
	const listen = sent.slice(0, nl).map((w) => ({ kind: 'listen', label: 'Listen and type the sentence', prompt: 'Type the whole sentence you hear', speak: w.ex, answer: w.ex, explain: w.exEn }));
	// speaking and writing need a server key; without one the test stays verbs, words and listening
	const say = can.stt ? sent.slice(nl, nl + ns).map((w) => ({ kind: 'say', prompt: w.ex, sub: w.exEn, speak: w.ex, answer: w.ex })) : [];
	const write = can.ai ? shuffle(WRITING[stage.band] || []).slice(0, nw).map(([prompt, sub]) => ({ kind: 'write', prompt, sub, level: stage.id.slice(0, 2) })) : [];
	return [...core, ...listen, ...say, ...write];
}

export const passed = (stage, right, total) => total > 0 && right / total >= stage.pass;
