import { json, error } from '@sveltejs/kit';
import * as env from '$app/env/private';
import { limited } from '../../../lib/server/limit.js';
import { LANGS } from '../../../lib/langs/meta.js';

// Two things land here, both without any personal data:
// - "report": a learner flags a question as wrong. Stored in the reports table for the maintainer to read.
// - "error": the app hit a JavaScript error in someone's browser. Written to the server log.
const s = (v, n) => (typeof v === 'string' ? v.slice(0, n) : '');

export async function POST({ request, getClientAddress }) {
	if (await limited('report', getClientAddress(), 20)) error(429, 'Too many reports. Thank you, that is enough for now.');
	const b = await request.json().catch(() => ({}));
	const lang = LANGS[b.lang] ? b.lang : 'pt';
	if (b.kind === 'error') {
		console.error('[client error]', JSON.stringify({ lang, path: s(b.path, 80), message: s(b.message, 300), stack: s(b.stack, 800) }));
		return json({ ok: true });
	}
	const row = { lang, source: s(b.source, 80), prompt: s(b.prompt, 400), answer: s(b.answer, 300), given: s(b.given, 300), note: s(b.note, 400) };
	if (!row.prompt) error(400, 'Nothing to report.');
	console.warn('[content report]', JSON.stringify(row));
	if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY)
		await fetch(`${env.SUPABASE_URL}/rest/v1/reports`, {
			method: 'POST',
			headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, 'content-type': 'application/json' },
			body: JSON.stringify(row)
		}).catch(() => {});
	return json({ ok: true });
}
