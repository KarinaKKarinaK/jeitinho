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
	['B2.1', 'Subjuntivo', 'Express wishes, doubts and hypotheticals', ['subj-1'], ['sp', 'si'], 150, 30],
	['B2.2', 'Quando eu for', 'Use the future subjunctive without thinking', ['c2-1'], ['sp', 'si', 'sf'], 250, 45],
	['B2.3', 'Todos os tempos', 'Switch between every tense mid-sentence', [], ALL, 400, 60],
	['C1.1', 'Vocabulário largo', 'Read articles and catch most idioms', [], ALL, 700, 90],
	['C1.2', 'Nuance', 'Pick the precise word, not the safe one', [], ALL, 1000, 120],
	['C1.3', 'Quase lá', 'Argue, joke and tell stories at speed', [], ALL, 1500, 150],
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

export function milestones(S, stage) {
	const done = stage.lessons.filter((id) => id in S.done).length;
	const list = [];
	if (stage.lessons.length)
		list.push({ label: `Finish ${stage.lessons.map((id) => `"${LESSONS[id].title}"`).join(' and ')}`, have: done, need: stage.lessons.length, href: `/lesson?id=${stage.lessons.find((id) => !(id in S.done)) || stage.lessons[0]}` });
	if (stage.mastered) list.push({ label: `Master ${stage.mastered} words (review gap of a week or more)`, have: masteredCount(S), need: stage.mastered, href: '/bank?tab=review' });
	list.push({ label: `Complete ${stage.quizzes} daily ${stage.quizzes === 1 ? 'quiz' : 'quizzes'}`, have: S.nquiz || 0, need: stage.quizzes, href: '/quiz' });
	return list.map((m) => ({ ...m, have: Math.min(m.have, m.need), ok: m.have >= m.need }));
}

export const ready = (S, stage) => milestones(S, stage).every((m) => m.ok);

const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);

// Half verbs in this stage's tenses, half words from your own bank (best-known first, so it tests what you claim to know).
export function buildTest(S, stage) {
	const half = Math.ceil(stage.n / 2);
	const seen = new Set();
	const verbs = shuffle(conjPool(S, 0, stage.tenses, stage.persons)).filter((c) => !seen.has(c.group) && seen.add(c.group)).slice(0, half).map((c) => c.key);
	const known = shuffle(S.words.filter((w) => w.reps > 0));
	const rest = shuffle(S.words.filter((w) => w.reps === 0));
	const kinds = stage.band === 'A' ? ['type', 'type', 'listen'] : ['type', 'cloze', 'listen'];
	const words = [...known, ...rest].slice(0, stage.n - verbs.length).map((w, i) => `${w.id}:${kinds[i % 3]}`);
	return shuffle([...verbs, ...words]).map((k) => fromKey(S, k)).filter(Boolean).map(({ key, ...q }) => q); // no key: tests do not touch quiz spacing
}

export const passed = (stage, right, total) => total > 0 && right / total >= stage.pass;
