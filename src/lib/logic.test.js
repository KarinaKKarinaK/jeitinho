import test from 'node:test';
import assert from 'node:assert/strict';
import { conj } from './conj.js';
import { check, dailyQuiz, markAsked, fromKey, grade, cleanSteps, sayScore, QUIZ_LEN } from './quiz.js';
import { isPrivate } from './server/safefetch.js';
import { decide, keepPlacement } from './sync.js';
import { STAGES, current, milestones, ready, buildTest, passed, place, placementSteps, EXTRA } from './roadmap.js';
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
});

test('placement retakes draw different questions', () => {
	const S = { placeSeen: [] };
	const a = placementSteps(S, 1).map((q) => q.prompt);
	const b = placementSteps(S, 1).map((q) => q.prompt);
	assert.equal(a.length, 4);
	assert.equal(new Set([...a, ...b]).size, 8, 'second attempt shares no question with the first');
	assert.equal(S.placeSeen.length, 8);
	for (let i = 0; i < 40; i++) assert.equal(placementSteps(S, 4).length, 4, 'still 4 questions once the pool is used up');
});

test('a placement earned signed out survives signing in to an existing account', () => {
	const ids = STAGES.map((s) => s.id);
	const remote = { xp: 500, uid: 'u', placed: null, badges: { 'A1.1': 'old' }, done: { 'sons-1': 1 } };
	const local = { uid: null, onboarded: true, placed: 'A2.2', badges: { 'A1.1': 'new', 'A1.2': 'new', 'A2.1': 'new', 'A2.2': 'new' }, done: { 'perf-1': 0 }, placeSeen: ['q'] };
	const m = keepPlacement(remote, local, ids);
	assert.equal(m.xp, 500, 'account data wins');
	assert.equal(m.placed, 'A2.2');
	assert.equal(m.badges['A1.1'], 'old', 'an existing badge keeps its date');
	assert.equal(Object.keys(m.badges).length, 4);
	assert.ok('perf-1' in m.done && 'sons-1' in m.done);
	assert.equal(keepPlacement(remote, { ...local, uid: 'someone' }, ids), remote, 'data that already belongs to an account is never merged');
	assert.equal(keepPlacement({ ...remote, placed: 'B1.2' }, local, ids).placed, 'B1.2', 'the further starting point wins');
});

test('sync decision after sign-in', () => {
	const me = 'u1';
	assert.equal(decide({ uid: me, localUid: null, localRev: 5, remote: false, remoteRev: 0 }), 'push', 'first sign-in uploads local progress');
	assert.equal(decide({ uid: me, localUid: me, localRev: 5, remote: true, remoteRev: 9 }), 'pull', 'newer server copy wins');
	assert.equal(decide({ uid: me, localUid: me, localRev: 9, remote: true, remoteRev: 5 }), 'push', 'newer local copy wins');
	assert.equal(decide({ uid: me, localUid: 'other', localRev: 99, remote: true, remoteRev: 5 }), 'pull', "never upload another user's data");
	assert.equal(decide({ uid: me, localUid: 'other', localRev: 99, remote: false, remoteRev: 0 }), 'fresh');
	assert.equal(decide({ uid: me, localUid: null, localRev: 0, remote: true, remoteRev: 5 }), 'pull', 'new device takes the account data');
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
