// Every language pack must have the same shape. This is the contract a new language has to meet.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { LANGS } from './langs/meta.js';
import { STAGE_IDS } from './langs/kit.js';

const codes = fs.readdirSync(new URL('./langs/', import.meta.url)).map((f) => f.replace('.js', '')).filter((c) => LANGS[c]);

for (const code of codes) {
	test(`pack ${code}`, async () => {
		const p = (await import(`./langs/${code}.js`)).default;
		assert.equal(p.code, code);

		// course
		const lessons = p.units.flatMap((u) => u.lessons);
		assert.ok(p.units.every((u) => u.title && u.sub && u.lessons.length));
		assert.ok(lessons.length >= 18, `${lessons.length} lessons, need at least 18`);
		assert.equal(new Set(lessons.map((l) => l.id)).size, lessons.length, 'lesson ids are unique');
		const okStep = (s, where) => {
			if (s.kind === 'info') return assert.ok(s.title && s.body, `${where}: info needs title and body`);
			assert.ok(['choice', 'type', 'listen'].includes(s.kind), `${where}: kind ${s.kind}`);
			assert.ok(s.prompt && s.answer, `${where}: prompt and answer`);
			if (s.kind === 'choice') {
				assert.equal(s.options.length, 4, `${where}: 4 options for "${s.prompt}"`);
				assert.equal(new Set(s.options).size, 4, `${where}: options differ for "${s.prompt}"`);
				assert.ok(s.options.includes(s.answer), `${where}: answer is an option`);
			}
		};
		for (const l of lessons) {
			assert.ok(l.title && l.sub && l.steps.length >= 9, `${l.id}: title, sub and at least 9 steps`);
			l.steps.forEach((s) => okStep(s, l.id));
			assert.ok(l.steps.filter((s) => s.kind === 'type' || s.kind === 'listen').length >= 1, `${l.id}: at least one question you must produce`);
		}

		// placement: 5 bands of 4
		assert.deepEqual(p.placement.map((b) => b.band), ['A1', 'A2', 'B1', 'B2', 'C1']);
		for (const b of p.placement) {
			assert.equal(b.steps.length, 4);
			b.steps.forEach((s) => okStep(s, `placement ${b.band}`));
		}

		// starter words
		assert.ok(p.seed.length >= 30, 'at least 30 starter words');
		for (const w of p.seed) {
			assert.ok(w.pt && w.en && w.ex && w.exEn, `seed ${w.pt}`);
		}
		// fill-the-gap questions need the word to appear in its example exactly; inflected examples are fine but should not be the rule
		const exact = p.seed.filter((w) => w.ex.toLowerCase().includes(w.pt.toLowerCase())).length;
		assert.ok(exact >= p.seed.length / 2, `only ${exact} of ${p.seed.length} seed examples contain their word`);

		// drills: every key the pool offers can be built into a valid question
		const pool = p.drill.pool();
		assert.ok(pool.length >= 60, `${pool.length} drill questions, need at least 60`);
		assert.equal(new Set(pool.map((c) => c.key)).size, pool.length, 'drill keys are unique');
		for (const c of pool) {
			const q = p.drill.make(c.key);
			assert.ok(q, `drill ${c.key} builds`);
			okStep(q, `drill ${c.key}`);
			assert.ok(c.key.split(':').length <= 4 && c.group && c.wt > 0);
		}
		assert.equal(p.drill.make('abc12345:type'), null, 'drill ignores word keys');
		assert.ok(p.drill.start.every((g) => p.drill.groups[g]));
		for (const g of Object.values(p.drill.groups)) assert.ok(g.name);

		// roadmap: 14 stages, real lessons, real drill groups, every lesson reachable
		assert.deepEqual(p.stages.map((s) => s[0]), STAGE_IDS);
		const ids = new Set(lessons.map((l) => l.id));
		const used = new Set();
		for (const [id, title, can, ls, groups] of p.stages) {
			assert.ok(title && can, id);
			for (const l of ls) assert.ok(ids.has(l) && !used.has(l) && used.add(l), `${id}: lesson ${l} exists and is used once`);
			assert.ok(groups.length && groups.every((g) => p.drill.groups[g]), `${id}: drill groups exist`);
			assert.ok(p.drill.pool(groups, id[0] === 'A').length >= 12, `${id}: enough drill questions for a test`);
		}
		assert.equal(used.size, lessons.length, `every lesson belongs to a stage (missing: ${[...ids].filter((l) => !used.has(l))})`);

		// the rest
		for (const band of ['B', 'C']) assert.ok(p.writing[band].length >= 4 && p.writing[band].every((w) => w[0] && w[1]));
		assert.ok(p.levels.length >= 5 && p.levels[0][0] === 0);
		assert.ok(p.chat.who && p.chat.hint && p.chat.placeholder && p.chat.scenes.length >= 4);
		assert.equal(typeof p.ui, 'object');
	});
}
