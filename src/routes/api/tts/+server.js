import { error } from '@sveltejs/kit';
import * as env from '$app/env/private';
import { LANGS } from '../../../lib/langs/meta.js';

export const prerender = false;

// Voices every ElevenLabs free plan can use. The id sent by the app is looked up here, never passed through.
const VOICES = {
	sarah: 'EXAVITQu4vr4xnSDxMaL', jessica: 'cgSgspJ2msm6clMCkdW9', alice: 'Xb7hH8MSUJpSbSDYk0k2',
	brian: 'nPczCjzI2devNBz1zQrb', george: 'JBFqnCBsd6RMkjVDRZzb', liam: 'TX3LPaxmHKxFdv7VOQHJ'
};

// Natural voice from ElevenLabs. The free plan has a monthly character quota and no card on file,
// so when it runs out this returns an error and the app falls back to the phone's own voice.
// Each phrase is cached at the CDN for a year, so a phrase is only paid for (in free credits) once.
export async function GET({ url, request }) {
	// browsers say where a request comes from: refuse other sites embedding this to drain the free quota
	if (['cross-site', 'same-site'].includes(request.headers.get('sec-fetch-site'))) error(403, 'Forbidden');
	if (!env.ELEVENLABS_API_KEY) error(503, 'Voice is not set up.');
	const text = (url.searchParams.get('t') || '').trim();
	if (!text || text.length > 300) error(400, 'Text must be 1 to 300 characters.');
	const lang = LANGS[url.searchParams.get('l')] ? url.searchParams.get('l') : 'pt';
	const model = env.ELEVENLABS_MODEL || 'eleven_flash_v2_5';
	const voice = VOICES[url.searchParams.get('v')] || (env.ELEVENLABS_VOICE_ID || VOICES.sarah).replace(/\W/g, '');
	const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`, {
		method: 'POST',
		headers: { 'xi-api-key': env.ELEVENLABS_API_KEY, 'content-type': 'application/json' },
		// the 2.5 models take a language hint, which keeps short words from being read as Spanish
		body: JSON.stringify({ text, model_id: model, ...(model.includes('v2_5') && { language_code: lang }) }),
		signal: AbortSignal.timeout(15000)
	}).catch(() => null);
	if (!r?.ok) error(502, 'Voice failed.');
	return new Response(r.body, { headers: { 'content-type': 'audio/mpeg', 'cache-control': 'public, max-age=604800, s-maxage=31536000' } });
}
