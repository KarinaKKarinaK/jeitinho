// Building blocks every language pack uses.
// Lesson steps. Bodies are trusted HTML (html: true); LLM lessons never get that flag.
export const I = (title, body, say) => ({ kind: 'info', title, body, say, html: true });
export const C = (prompt, answer, wrong, explain) => ({ kind: 'choice', prompt, answer, options: [answer, ...wrong], explain });
export const T = (prompt, answer, explain, accept) => ({ kind: 'type', prompt, answer, explain, accept, speak: answer });
export const L = (answer, explain, accept) => ({ kind: 'listen', prompt: 'Type what you hear', speak: answer, answer, explain, accept });

// A pack's starter word bank: its own seed (tagged with parts of speech) plus the bigger list in words/<code>.js.
// more rows are [word, meaning, reading, example, example in English, part of speech].
export const withMore = (seed, more = [], seedPos = {}) => [
	...seed.map((w) => ({ ...w, pos: w.pos || seedPos[w.pt] || '' })),
	...more.map(([pt, en, say, ex, exEn, pos]) => ({ pt, en, say, ex, exEn, pos }))
];

// English interface text. A pack overrides the ones it wants in its own language.
export const UI = {
	check: 'Check', next: 'Continue', start: 'Start', right: 'Correct!', answer: 'Correct answer:', again: 'Again', learn: 'Learn',
	hear: 'Listen', rec: 'Record', stop: 'Stop and check', recording: 'Recording...', skipped: 'Skipped',
	polished: 'Good! Polished version:', fixed: 'Corrected version:', placeholder: 'Your answer...', write: 'Write here...',
	perfect: 'Perfect!', good: 'Well done!', almost: 'Almost there',
	hello: ['Good morning', 'Good afternoon', 'Good evening'], days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], today: 'Today',
	quiz: 'Daily quiz', quizA: 'hard', quizB: 'questions', done: 'Done today', extra: 'Extra', nextLesson: 'Next lesson',
	drill: 'Drills', drillSub: 'Quick grammar reps', review: 'Review', songs: 'Songs and links', speak: 'Speak',
	learnTitle: 'Learn', add: 'Add', bank: 'Word bank', allDone: 'All caught up', chat: 'Chat', welcome: 'Welcome',
	won: 'earned!', need: (n) => `You need ${n}. Try again!`, typeLabel: 'Type your answer', sayLabel: 'Say it in the language',
	near: 'Right, but check the accents.', custom: 'Made to order', yours: 'Your lessons', roadmap: 'Roadmap', linkText: 'Link or text',
	drillEyebrow: 'Drills', drillQ: 'What do you want to drill?', drillBlurb: 'Ten quick questions. Missed ones come back at the end.'
};

// A drill made from plain tables: { groupId: { name, items: [{ prompt, answer, sub, explain, options, accept, speak }] } }.
// An item with options is multiple choice; without, it is typed.
export function tableDrill(groups, extra = {}) {
	return {
		start: [Object.keys(groups)[0]],
		...extra,
		groups,
		pool: (ids = Object.keys(groups)) =>
			ids.flatMap((g) => (groups[g]?.items || []).map((_, i) => ({ key: `d:${g}:${i}`, group: `${g}:${i}`, wt: groups[g].wt ?? 1, audio: !!groups[g].audio }))),
		make(key) {
			const [d, g, i] = key.split(':');
			const it = d === 'd' && groups[g]?.items[+i];
			if (!it) return null;
			const { options, ...q } = it;
			return { key, label: groups[g].name, speak: it.speak ?? it.answer, ...q, ...(options ? { kind: 'choice', options: [it.answer, ...options] } : { kind: 'type' }) };
		}
	};
}

// Milestone numbers shared by every language: [words mastered, daily quizzes] for the 14 stages A1.1 to C2.2.
export const STAGE_IDS = ['A1.1', 'A1.2', 'A2.1', 'A2.2', 'B1.1', 'B1.2', 'B2.1', 'B2.2', 'B2.3', 'C1.1', 'C1.2', 'C1.3', 'C2.1', 'C2.2'];
