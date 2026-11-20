import test from 'node:test';
import assert from 'node:assert/strict';
import { conj } from './conj.js';
import { check, dailyQuiz, markAsked, fromKey, grade, cleanSteps, sayScore, songSteps, parseWordList, QUIZ_LEN } from './quiz.js';
import { isPrivate } from './server/safefetch.js';
import { decide, merge, slim } from './sync.js';
import { STAGES, current, milestones, ready, buildTest, passed, place, placementSteps, placementVerdict, retakeAt, forecast, BAND_N, EXTRA, chapterOpen, chapterPassed, chapterReady, chapterQuiz, passChapter, grandfather } from './roadmap.js';
import { UNITS } from './content.js';
import { LESSONS } from './content.js';

test('conjugation', () => {
	const cases = [
		['fazer', 'perf', 0, 'fiz'], ['fazer', 'perf', 1, 'fez'], ['ficar', 'perf', 0, 'fiquei'], ['chegar', 'sp', 0, 'chegue'],
		['começar', 'perf', 0, 'comecei'], ['ser', 'si', 2, 'fôssemos'], ['comer', 'si', 2, 'comêssemos'], ['fazer', 'si', 2, 'fizéssemos'],
		['fazer', 'sf', 3, 'fizerem'], ['ir', 'sf', 0, 'for'], ['conhecer', 'sp', 1, 'conheça'], ['ir', 'sp', 3, 'vão'],
		['pôr', 'cond', 0, 'poria'], ['falar', 'imp', 2, 'falávamos'], ['ter', 'imp', 2, 'tínhamos'], ['dirigir', 'pres', 0, 'dirijo'],
		['estar', 'sp', 1, 'esteja'], ['ver', 'si', 0, 'visse'], ['abrir', 'perf', 1, 'abriu'], ['querer', 'sf', 1, 'quiser'],
		['ter', 'sp', 0, 'tenha'], ['dizer', 'cond', 1, 'diria'], ['ir', 'imp', 0, 'ia'], ['vir', 'perf', 1, 'veio']
	];
	for (const [v, t, p, want] of cases) assert.equal(conj(v, t, p), want, `${v} ${t} ${p}`);
});

test('answer check', () => {
	assert.equal(check('Pôde', { answer: 'pôde' }).ok, true);
	assert.ok(check('pode', { answer: 'pôde' }).note);
	assert.equal(check('fui', { answer: 'foi' }).ok, false);
	assert.equal(check('eu fui', { answer: 'fui', accept: ['eu fui'] }).ok, true);
});

const mkS = () => ({
	asked: {},
	words: Array.from({ length: 30 }, (_, i) => ({ id: 'w' + i, pt: 'palavra' + i, en: 'word' + i, ex: `Uma palavra${i} aqui.`, due: 0, ivl: 0, ease: 2.5, reps: 0 }))
});

test('daily quiz: 11 unique questions, spaced by time decay', () => {
	const S = mkS();
	const now = Date.now();
	const day1 = dailyQuiz(S, '2026-01-01', now);
	assert.equal(day1.length, QUIZ_LEN);
	assert.equal(new Set(day1).size, QUIZ_LEN);
	assert.deepEqual(dailyQuiz(S, '2026-01-01', now), day1); // same day, same quiz
	for (const k of day1) markAsked(S, fromKey(S, k), true, now);
	const day2 = dailyQuiz(S, '2026-01-02', now);
	const words = (ks) => ks.map((k) => k.split(':')[0]).filter((w) => w !== 'conj');
	assert.equal(words(day2).filter((w) => words(day1).includes(w)).length, 0, 'just-asked words must not repeat next day');
	assert.equal(day2.filter((k) => day1.includes(k)).length, 0);
});

test('srs intervals grow, lapse resets', () => {
	const w = { due: 0, ivl: 0, ease: 2.5, reps: 0 };
	grade(w, 2, 0);
	grade(w, 2, 0);
	grade(w, 2, 0);
	assert.equal(w.ivl, 8);
	grade(w, 0, 0);
	assert.equal(w.reps, 0);
});

test('LLM steps are sanitised', () => {
	const out = cleanSteps([{ kind: 'info', title: 't', body: 'b', html: true }, { kind: 'choice', prompt: 'p', answer: 'a', options: ['b', 'c'] }, { kind: 'type' }, 'junk']);
	assert.equal(out.length, 2);
	assert.equal(out[0].html, undefined);
	assert.ok(out[1].options.includes('a'));
});

test('private addresses are blocked', () => {
	for (const ip of ['127.0.0.1', '10.1.2.3', '192.168.1.1', '169.254.169.254', '172.20.0.1', '::1', 'fd00::1', '::ffff:127.0.0.1', '::ffff:7f00:1']) assert.equal(isPrivate(ip), true, ip);
	for (const ip of ['8.8.8.8', '172.32.0.1', '2606:4700::1111']) assert.equal(isPrivate(ip), false, ip);
});

test('speaking score counts the words that were heard', () => {
	const r = sayScore('Tô com saudade de você.', [{ w: 'to' }, { w: 'com' }, { w: 'saudade' }, { w: 'você' }]);
	assert.deepEqual(r.marks.map((m) => m.ok), [true, true, true, false, true]);
	assert.equal(r.score, 0.8);
	assert.equal(sayScore('bom dia', []).score, 0);
	assert.equal(sayScore('Tô indo pra casa', [{ w: 'estou' }, { w: 'indo' }, { w: 'para' }, { w: 'casa' }]).score, 1, 'spoken shortcuts match their full forms');
});

test('B and C tests add listening, speaking and writing when the server can grade them', () => {
	const S = mkS();
	const b = STAGES.find((s) => s.id === 'B1.1');
	const plain = buildTest(S, b);
	const full = buildTest(S, b, { ai: true, stt: true });
	assert.equal(plain.some((q) => q.kind === 'write' || q.kind === 'say'), false);
	assert.equal(full.filter((q) => q.kind === 'write').length, EXTRA.B[1]);
	assert.ok(full.length > plain.length);
	for (const s of STAGES) for (const id of s.lessons) assert.ok(LESSONS[id], `${s.id} needs lesson ${id}`);
});

test('placement starts you higher and counts milestones from there', () => {
	const S = { ...mkS(), done: {}, badges: {}, nquiz: 0, placed: null };
	assert.equal(place(S, 0, 'd').id, 'A1.1');
	assert.deepEqual(S.badges, {});
	assert.equal(place(S, 2, 'd').id, 'B1.1');
	assert.equal(current(S).id, 'B1.1');
	assert.ok('perf-1' in S.done && !('conv-1' in S.done));
	const quiz = milestones(S, current(S)).find((m) => m.label.includes('daily'));
	assert.equal(quiz.need, 15 - 10, 'B1.1 asks for 15 quizzes, A2.2 already covered 10');
	assert.equal(place({ ...mkS(), done: {}, badges: {} }, 9, 'd').id, 'C1.2');
	const R = { ...mkS(), done: {}, badges: {}, nquiz: 0, placed: null };
	place(R, 3, 'd');
	const before = milestones(R, current(R)).map((m) => m.need);
	place(R, 0, 'd');
	assert.deepEqual(milestones(R, current(R)).map((m) => m.need), before, 'a worse retake does not raise the requirements');
});

test('placement retakes draw different questions', () => {
	const S = { placeSeen: [] };
	const a = placementSteps(S, 1).map((q) => q.prompt);
	const b = placementSteps(S, 1).map((q) => q.prompt);
	assert.equal(a.length, BAND_N);
	assert.equal(new Set([...a, ...b]).size, 2 * BAND_N, 'second attempt shares no question with the first');
	assert.equal(S.placeSeen.length, 2 * BAND_N);
	for (let i = 0; i < 40; i++) assert.equal(placementSteps(S, 4).length, BAND_N, 'still a full set once the pool is used up');
});

test('placement is forgiving: two slips per level, and one weak level gets a second chance', () => {
	assert.deepEqual(placementVerdict([4]), { stop: false, bands: 1 }, '4 of 6 passes');
	assert.deepEqual(placementVerdict([6, 3]), { stop: false, bands: 1 }, 'one failed level: keep going');
	assert.deepEqual(placementVerdict([6, 3, 5]), { stop: false, bands: 3 }, 'passing the next level counts');
	assert.deepEqual(placementVerdict([6, 3, 5, 2]), { stop: true, bands: 3 }, 'second failed level ends it');
	assert.deepEqual(placementVerdict([1]), { stop: true, bands: 0 }, 'a level that goes badly ends it');
	assert.deepEqual(placementVerdict([6, 6, 6, 6, 6]), { stop: true, bands: 5 });
	const now = Date.now();
	assert.equal(retakeAt({ placedAt: 0 }, now), 0);
	assert.ok(retakeAt({ placedAt: now - 864e5 }, now) > now, 'a day later: not yet');
	assert.equal(retakeAt({ placedAt: now - 4 * 864e5 }, now), 0, 'four days later: allowed');
});

test('forecast: a date from recent minutes, never sooner than the calendar allows', () => {
	const now = new Date(2026, 5, 10, 12).getTime();
	const S = { ...mkS(), done: {}, badges: {}, nquiz: 0, mins: {} };
	const st = STAGES[0];
	assert.equal(forecast(S, st, now).date, null, 'no recent study: no date');
	S.mins = { '2026-06-10': 20, '2026-06-09': 20, '2026-06-08': 20, '2026-06-07': 20 };
	const f = forecast(S, st, now);
	assert.equal(f.avg, 20);
	assert.ok(f.days >= 1 && f.date.getTime() === now + f.days * 864e5);
	S.mins = { '2026-06-10': 600, '2026-06-09': 600, '2026-06-08': 600, '2026-06-07': 600 };
	assert.ok(forecast(S, STAGES[3], now).days >= 10 - 0, 'ten daily quizzes cannot be done in fewer than their days');
});

test('quiz settings: no audio questions, no drills, other lengths', () => {
	const S = mkS();
	const quiet = dailyQuiz(S, 's1', undefined, { quizAudio: false });
	assert.ok(quiet.every((k) => !k.endsWith(':listen')));
	const plain = dailyQuiz(S, 's2', undefined, { quizDrills: false, quizLen: 7 });
	assert.equal(plain.length, 7);
	assert.ok(plain.every((k) => !k.startsWith('conj:')));
	assert.equal(dailyQuiz(S, 's3', undefined, { quizLen: 15 }).length, 15);
});

test('a song always yields a lesson, even from lyrics alone', () => {
	const pt = ['É pau, é pedra, é o fim do caminho', 'É um resto de toco', 'São as águas de março fechando o verão', 'É a promessa de vida no teu coração', 'É a vida, é o sol'];
	const bare = songSteps(pt.map((l) => ({ pt: l, en: '' })));
	assert.ok(bare.length >= 2 && bare.every((q) => q.kind === 'listen'), 'no translation: listening questions');
	const en = ['It is wood, it is stone, the end of the road', 'It is the rest of a stump', 'The waters of March closing the summer', 'The promise of life in your heart', 'It is life, it is the sun'];
	const lyr = pt.map((l, i) => ({ pt: l, en: en[i] }));
	const full = songSteps(lyr, [{ pt: 'promessa', en: 'promise', ex: '', src: 'x' }], [{ kind: 'type', prompt: 'p', answer: 'a' }, { kind: 'info', title: 't', body: 'b' }]);
	assert.ok(full.some((q) => q.kind === 'choice' && q.options.length === 4 && q.options.includes(q.answer)));
	assert.ok(full.some((q) => q.label === 'Fill the gap from the song' && q.answer === 'promessa' && q.prompt.includes('_____')));
	assert.ok(full.some((q) => q.answer === 'a'), 'model questions are mixed in');
	assert.ok(full.every((q) => q.kind !== 'info') && full.length <= 14);
	assert.deepEqual(songSteps([]), []);
});

test('chapters open one at a time, by passing the quiz of the one before', () => {
	const S = { done: {}, chapters: {}, badges: {} };
	assert.equal(chapterOpen(S, 0), true);
	assert.equal(chapterOpen(S, 1), false, 'chapter 2 starts locked');
	assert.equal(chapterReady(S, 0), false);
	for (const l of UNITS[0].lessons) S.done[l.id] = 1;
	assert.equal(chapterReady(S, 0), true, 'all lessons done: the quiz is available');
	assert.equal(chapterOpen(S, 1), false, 'finishing lessons alone does not open the next chapter');
	const quiz = chapterQuiz(0);
	assert.ok(quiz.length >= 5 && quiz.length <= 10 && quiz.every((q) => q.kind !== 'info' && q.answer));
	passChapter(S, 0, 'd');
	assert.equal(chapterPassed(S, 0), true);
	assert.equal(chapterOpen(S, 1), true);
	assert.equal(chapterOpen(S, 2), false);
	// someone who was already on a later lesson before chapters existed keeps their access
	const old = { done: { [UNITS[2].lessons[0].id]: 1 } };
	const kept = { chapters: grandfather(old) };
	assert.equal(chapterOpen(kept, 2), true);
	assert.equal(chapterOpen(kept, 3), false);
	// testing out of early levels passes the chapters made only of those lessons
	const P2 = { ...mkS(), done: {}, badges: {}, chapters: {} };
	place(P2, 2, 'd');
	assert.equal(chapterPassed(P2, 0), true);
	// every chapter's lessons come before or with the stage that needs them: chapter order follows the roadmap
	const firstStage = UNITS.map((u) => Math.min(...u.lessons.map((l) => STAGES.findIndex((s) => s.lessons.includes(l.id)))));
	assert.deepEqual(firstStage, [...firstStage].sort((a, b) => a - b));
	const lastStage = UNITS.map((u) => Math.max(...u.lessons.map((l) => STAGES.findIndex((s) => s.lessons.includes(l.id)))));
	for (let i = 0; i < UNITS.length; i++) for (let j = i + 1; j < UNITS.length; j++) assert.ok(lastStage[i] - firstStage[j] <= 1, `chapter ${i + 1} must not hold back chapter ${j + 1}`);
});

test('active time: seconds add up to minutes, idle time does not count', async () => {
	const { step } = await import('./active.js');
	let carry = null, total = 0;
	const run = (n, active, day = 'd1') => { for (let i = 0; i < n; i++) { const r = step(carry, { day, active }); carry = r.carry; total += r.minutes; } };
	run(11, true); // 55 seconds
	assert.equal(total, 0);
	run(1, true); // 60
	assert.equal(total, 1);
	run(100, false); // idle or in the background
	assert.equal(total, 1, 'idle time adds nothing');
	run(30, true); // 150 more seconds
	assert.equal(total, 3);
	assert.equal(carry.secs, 30, 'the remainder is carried');
	run(6, true, 'd2'); // next day: the remainder is not carried over
	assert.deepEqual(carry, { day: 'd2', secs: 30 });
	assert.equal(total, 3);
});

test('word list import: Anki text, CSV with a header, pasted spreadsheet rows', () => {
	const anki = '#separator:tab\n#html:true\ncasa\t<b>house</b>\tA casa é grande.<br>\tThe house is big.\ngato\tcat [sound:x.mp3]\n\nsó palavra\n';
	assert.deepEqual(parseWordList(anki).map((w) => [w.pt, w.en, w.ex, w.exEn]), [['casa', 'house', 'A casa é grande.', 'The house is big.'], ['gato', 'cat', '', '']]);
	const csv = 'Meaning,Word,Notes,Reading\n"to eat, to have a meal",食べる,"said ""taberu""",たべる\nwater,水,,みず\n';
	const c = parseWordList(csv);
	assert.deepEqual([c[0].pt, c[0].en, c[0].note, c[0].say], ['食べる', 'to eat, to have a meal', 'said "taberu"', 'たべる'], 'header order and quoted commas are respected');
	assert.equal(c.length, 2);
	assert.deepEqual(parseWordList('perro;dog\ngato;cat').map((w) => w.pt), ['perro', 'gato'], 'semicolons, as Excel exports in many countries');
	assert.deepEqual(parseWordList('casa\thouse, home, dwelling\ncarro\tcar, automobile, vehicle').map((w) => [w.pt, w.en]), [['casa', 'house, home, dwelling'], ['carro', 'car, automobile, vehicle']], 'tabs win over commas inside meanings');
	assert.deepEqual(parseWordList('word\tpalavra\ncasa\thouse').length, 2, 'a first row that is not a real header is kept');
	assert.deepEqual(parseWordList(''), []);
	assert.deepEqual(parseWordList('just one column\nanother'), []);
});

test('sync decision: push, pull or merge, never a blind overwrite', () => {
	const me = 'u1';
	const d = (o) => decide({ uid: me, localUid: me, localRev: 5, remote: true, remoteRev: 5, base: 5, ...o });
	assert.equal(d({}), 'same');
	assert.equal(d({ localRev: 9 }), 'push', 'only this device changed');
	assert.equal(d({ remoteRev: 9 }), 'pull', 'only the account changed');
	assert.equal(d({ localRev: 8, remoteRev: 9 }), 'merge', 'both changed');
	assert.equal(d({ remote: false }), 'push', 'nothing in the account yet');
	assert.equal(d({ localUid: 'other', localRev: 99 }), 'pull', "another account's data is never uploaded");
	assert.equal(d({ localUid: 'other', remote: false }), 'fresh');
	// the cases that used to lose data
	assert.equal(decide({ uid: me, localUid: null, localRev: Date.now(), remote: true, remoteRev: 1000, base: 0 }), 'merge', 'signing in on a device with some activity must not overwrite the account');
	assert.equal(decide({ uid: me, localUid: me, localRev: 2000, remote: true, remoteRev: 9000, base: 1000 }), 'merge', 'a stale device with a small local change must not overwrite newer account data');
	assert.equal(decide({ uid: me, localUid: null, localRev: 0, remote: true, remoteRev: 5, base: 0 }), 'merge', 'a brand new device joins the account data');
});

test('merge keeps the progress of both sides', () => {
	const ids = STAGES.map((s) => s.id);
	const word = (pt, o = {}) => ({ id: pt + Math.random(), pt, en: pt, reps: 0, due: 0, ivl: 0, cols: [], ...o });
	const account = { uid: 'u', xp: 500, streak: 12, last: '2026-06-10', nquiz: 30, days: { '2026-06-10': 40 }, mins: { '2026-06-10': 20 }, done: { a: 1, b: 0.5 }, badges: { 'A1.1': 'old' }, chapters: { c1: 'x' }, placed: 'A1.1', onboarded: true,
		words: [word('casa', { reps: 6, ivl: 20, note: 'from the account' }), word('gato', { reps: 2 }), word('removed here')], materials: [{ id: 'm1' }], texts: [{ id: 't1' }], cols: [{ id: 'c' }], quiz: { '2026-06-10': { done: true, score: 9 } }, gone: {} };
	const device = { uid: null, xp: 20, streak: 1, last: '2026-06-11', nquiz: 1, days: { '2026-06-11': 20 }, mins: { '2026-06-10': 5, '2026-06-11': 9 }, done: { b: 1, c: 1 }, badges: { 'A1.1': 'new', 'A1.2': 'new' }, chapters: { c2: 'y' }, placed: 'A1.2', onboarded: true,
		words: [word('casa', { star: true }), word('novo', { reps: 1 })], materials: [{ id: 'm2' }], texts: [], cols: [], quiz: { '2026-06-11': { done: false } }, gone: { 'removed here': 5 } };
	const m = merge(device, account, (w) => w.pt, ids);
	assert.equal(m.xp, 500, 'the account is not wiped by a nearly empty device');
	assert.equal(m.nquiz, 30);
	assert.equal(m.uid, 'u');
	assert.deepEqual([m.last, m.streak], ['2026-06-11', 1], 'streak follows the side that studied last');
	assert.deepEqual(m.mins, { '2026-06-10': 20, '2026-06-11': 9 });
	assert.deepEqual(m.done, { b: 1, c: 1, a: 1 });
	assert.equal(m.badges['A1.1'], 'old');
	assert.ok(m.badges['A1.2'] && m.chapters.c1 && m.chapters.c2);
	assert.equal(m.placed, 'A1.2');
	const casa = m.words.find((w) => w.pt === 'casa');
	assert.deepEqual([casa.reps, casa.star, casa.note], [6, true, 'from the account'], 'one entry per word: most studied copy, with the star from the other');
	assert.deepEqual(m.words.map((w) => w.pt).sort(), ['casa', 'gato', 'novo'], 'a word deleted on one side stays deleted');
	assert.deepEqual(m.materials.map((x) => x.id).sort(), ['m1', 'm2']);
	assert.equal(m.quiz['2026-06-10'].score, 9);
	assert.deepEqual(merge(account, account, (w) => w.pt, ids).words.length, 3 - 0, 'merging a copy with itself changes nothing');
});

test('a state too big to store is slimmed by dropping caches first', () => {
	const words = Array.from({ length: 10 }, (_, i) => ({ pt: 'w' + i, conj: { rows: 'x'.repeat(2000) } }));
	const big = { words, gloss: { t: 'y'.repeat(5000) } };
	assert.equal(slim(big, 1e6), big);
	assert.deepEqual(Object.keys(slim(big, 22000).gloss), [], 'lookups go first');
	assert.ok(slim(big, 22000).words[0].conj);
	assert.equal(slim(big, 3000).words[0].conj, undefined, 'then conjugation tables');
	assert.equal(slim(big, 50), null);
});

test('roadmap: milestones gate the test, badges move you on', () => {
	const S = { ...mkS(), done: {}, badges: {}, nquiz: 0 };
	assert.equal(current(S).id, 'A1.1');
	assert.equal(ready(S, current(S)), false);
	Object.assign(S, { done: { 'sons-1': 1, 'base-1': 1 }, nquiz: 1 });
	assert.equal(ready(S, current(S)), true);
	const t = buildTest(S, current(S));
	assert.equal(t.length, 14);
	assert.ok(t.every((q) => q.answer && !q.key));
	assert.equal(passed(STAGES[0], 11, 14), false);
	assert.equal(passed(STAGES[0], 12, 14), true);
	S.badges['A1.1'] = '2026-01-01';
	assert.equal(current(S).id, 'A1.2');
	assert.equal(milestones(S, current(S)).find((m) => m.label.startsWith('Master')).ok, false);
	assert.deepEqual(STAGES.map((s) => s.id).filter((id) => id.startsWith('B2')), ['B2.1', 'B2.2', 'B2.3']);
	for (const s of STAGES) for (const id of s.lessons) assert.ok(milestones({ ...S, done: {} }, s), id);
});
