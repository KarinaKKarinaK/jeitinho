import test from 'node:test';
import assert from 'node:assert/strict';
import { conj } from './conj.js';
import { check, dailyQuiz, markAsked, fromKey, grade, cleanSteps, QUIZ_LEN } from './quiz.js';
import { isPrivate } from './server/safefetch.js';

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
