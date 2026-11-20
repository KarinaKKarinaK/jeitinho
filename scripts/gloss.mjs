// Prepares the word meanings for the built-in reading texts, so readers never wait for (or spend) an AI call on them.
// For every sentence of every graded text it asks a free model for a word-by-word gloss, once, and writes
// static/gloss/<lang>.json. It also builds a small dictionary per language from everything it glossed, which the
// reader uses for instant lookups in your own texts.
// Run: node scripts/gloss.mjs [lang ...]   (needs OPENROUTER_API_KEY in .env; safe to stop and rerun, it resumes)
import fs from 'node:fs';
import { splitSentences } from '../src/lib/quiz.js';
import { POS } from '../src/lib/langs/meta.js';

const key = fs.readFileSync('.env', 'utf8').match(/^OPENROUTER_API_KEY=(.+)$/m)?.[1].trim();
if (!key) throw new Error('OPENROUTER_API_KEY missing in .env');
const MODELS = ['nvidia/nemotron-3.5-super-vl:free', 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', 'particle-ai/particle-1:free'];
const L = {
	pt: { name: 'Brazilian Portuguese', form: '', read: '' },
	zh: { name: 'Mandarin Chinese', form: ', in simplified characters', read: 'pinyin with tone marks' },
	pl: { name: 'Polish', form: '', read: '' },
	ja: { name: 'Japanese', form: ', in normal Japanese writing', read: 'the reading in hiragana' },
	es: { name: 'Spanish', form: '', read: '' }
};
const s = (v, n) => (typeof v === 'string' ? v.slice(0, n) : '');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// free models allow about 20 requests a minute: start at most one every 3.2 seconds
let next = 0;
const slot = async () => {
	const at = Math.max(Date.now(), next);
	next = at + 3200;
	await sleep(at - Date.now());
};

async function gloss(g, text) {
	const content = `Explain every word of this ${g.name} sentence for a learner: "${text}"\nGroup words that form one fixed expression or one verb form. Skip punctuation and proper names.\nReturn ONLY JSON: {"en":"natural English translation of the sentence","words":[{"w":"the word exactly as written in the sentence","pt":"its dictionary form${g.form}","en":"meaning in this sentence, 1 to 4 words","pos":"one of: ${POS.join(', ')}"${g.read ? `,"say":"${g.read}"` : ''}}]}`;
	for (let attempt = 0; attempt < 6; attempt++) {
		await slot();
		try {
			const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
				method: 'POST',
				headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
				body: JSON.stringify({ model: MODELS[attempt % MODELS.length], max_tokens: 1700, temperature: 0.2, reasoning: { enabled: false }, messages: [{ role: 'user', content }] }),
				signal: AbortSignal.timeout(50000)
			});
			if (!r.ok) continue;
			const out = JSON.parse(((await r.json()).choices?.[0]?.message?.content || '').match(/\{[\s\S]*\}/)[0]);
			const words = (Array.isArray(out.words) ? out.words : []).slice(0, 80)
				.map((w) => ({ w: s(w?.w, 60), pt: s(w?.pt, 80), en: s(w?.en, 120), pos: POS.includes(w?.pos) ? w.pos : '', say: s(w?.say, 80) }))
				.filter((w) => w.w && w.en);
			if (words.length) return { en: s(out.en, 600), words: Object.fromEntries(words.map((w) => [w.w.toLowerCase(), w])) };
		} catch {
			/* try again, on the next model */
		}
	}
	return null;
}

for (const code of process.argv.length > 2 ? process.argv.slice(2) : Object.keys(L)) {
	const file = `static/gloss/${code}.json`;
	const { TEXTS } = await import(`../src/lib/langs/texts/${code}.js`);
	const out = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { texts: {}, dict: {} };
	const todo = [];
	for (const t of TEXTS) {
		out.texts[t.id] ??= {};
		t.text.split(/\n\s*\n/).forEach((p, pi) => splitSentences(p.trim()).forEach((sent, si) => !out.texts[t.id][`${pi}:${si}`] && sent.trim().length > 1 && todo.push([t.id, `${pi}:${si}`, sent.trim()])));
	}
	console.log(code, 'sentences to gloss:', todo.length);
	let done = 0, failed = 0;
	const save = () => {
		// dictionary: for each word form seen, the meaning it had most often
		const seen = {};
		for (const t of Object.values(out.texts)) for (const g of Object.values(t)) for (const [k, w] of Object.entries(g.words)) ((seen[k] ??= {})[w.en] ??= { n: 0, w }).n++;
		out.dict = Object.fromEntries(Object.entries(seen).map(([k, m]) => { const { w } = Object.values(m).sort((a, b) => b.n - a.n)[0]; return [k, { pt: w.pt, en: w.en, pos: w.pos, say: w.say }]; }));
		fs.writeFileSync(file, JSON.stringify(out));
	};
	const worker = async () => {
		for (let job; (job = todo.shift()); ) {
			const [id, k, sent] = job;
			const g = await gloss(L[code], sent);
			if (g) out.texts[id][k] = g;
			else failed++;
			if (++done % 15 === 0) { save(); console.log(code, done, 'done,', todo.length, 'left,', failed, 'failed'); }
		}
	};
	await Promise.all([worker(), worker(), worker()]);
	save();
	console.log(code, 'finished:', done, 'glossed,', failed, 'failed,', Object.keys(out.dict).length, 'dictionary entries,', Math.round(fs.statSync(file).size / 1024), 'kB');
}
