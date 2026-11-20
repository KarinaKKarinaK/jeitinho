import { json, error } from '@sveltejs/kit';
import * as env from '$app/env/private';
import { LANGS } from '../../../lib/langs/meta.js';
import { limited } from '../../../lib/server/limit.js';

// Speech to text with Deepgram, for speaking practice and voice chat.
// Runs on Deepgram's free credit. With no card on the account it stops when the credit ends.
export async function POST({ request, url, getClientAddress }) {
	if (limited('stt', getClientAddress(), 30)) error(429, 'Too many recordings in a short time. Try again in a few minutes.');
	const lang = (LANGS[url.searchParams.get('l')] || LANGS.pt).stt;
	if (!env.DEEPGRAM_API_KEY) error(503, 'Speaking practice is not set up. Add DEEPGRAM_API_KEY.');
	if (env.APP_PASSCODE && request.headers.get('x-pass') !== env.APP_PASSCODE) error(401, 'Wrong passcode. Set it in Settings on the home screen.');
	const type = request.headers.get('content-type') || '';
	if (!/^(audio|video)\//.test(type)) error(400, 'Send audio.');
	const audio = await request.arrayBuffer();
	if (!audio.byteLength || audio.byteLength > 2e6) error(413, 'Recording too long. Keep it under a minute.');
	const r = await fetch(`https://api.deepgram.com/v1/listen?model=nova-2&language=${lang}&punctuate=true`, {
		method: 'POST',
		headers: { authorization: `Token ${env.DEEPGRAM_API_KEY}`, 'content-type': type },
		body: audio,
		signal: AbortSignal.timeout(25000)
	}).catch(() => null);
	if (!r?.ok) error(502, 'Could not hear that. Try again.');
	const alt = (await r.json()).results?.channels?.[0]?.alternatives?.[0] || {};
	return json({
		text: String(alt.transcript || '').slice(0, 1000),
		words: (alt.words || []).slice(0, 200).map((w) => ({ w: String(w.word), c: +w.confidence || 0 }))
	});
}
