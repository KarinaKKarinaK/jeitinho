import { lang, meta } from './lang.js';
import { P, voiceOf } from './prefs.js';

export const DAY = 864e5;

export const today = (d = new Date()) =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Which optional services the server has keys for. Filled in by cloud.svelte.js at startup.
export const caps = { ai: false, tts: false, stt: false, push: '' };

let voice;
let player;
let turn = 0;
// Natural cloud voice when it is set up and we are online. Otherwise the phone's built-in pt-BR voice: free and offline.
export function speak(text, rate = P.rate) {
	if (!text) return;
	const me = ++turn;
	if (caps.tts && voiceOf(lang) !== 'device' && navigator.onLine && text.length <= 300) {
		globalThis.speechSynthesis?.cancel();
		player ??= new Audio(); // one shared element: once a tap has unlocked it, iOS lets later plays through
		// quota used up or service down: stay on the phone voice for this session, and say so once
		player.onerror = () => {
			if (caps.tts) notice('The natural voice has reached its monthly limit, so the device voice is used for now.', 'voice');
			caps.tts = false;
		};
		player.src = `/api/tts?l=${lang}&v=${voiceOf(lang)}&t=` + encodeURIComponent(text.trim());
		player.defaultPlaybackRate = player.playbackRate = Math.max(0.6, Math.min(1.2, rate + 0.1));
		player.play().catch(() => me === turn && local(text, rate));
		return;
	}
	local(text, rate);
}

function local(text, rate) {
	if (typeof speechSynthesis === 'undefined') return;
	player?.pause();
	const u = new SpeechSynthesisUtterance(text);
	voice ??= speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-') === meta.locale);
	if (voice) u.voice = voice;
	u.lang = meta.locale;
	u.rate = rate;
	speechSynthesis.cancel();
	speechSynthesis.speak(u);
}

let ctx;
export function ding(ok) {
	if (!P.sfx) return;
	try {
		ctx ??= new (window.AudioContext || window.webkitAudioContext)();
		(ok ? [660, 990] : [233, 185]).forEach((f, k) => {
			const o = ctx.createOscillator();
			const g = ctx.createGain();
			const t = ctx.currentTime + k * 0.09;
			o.type = ok ? 'sine' : 'triangle';
			o.frequency.value = f;
			g.gain.setValueAtTime(0.14, t);
			g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
			o.connect(g).connect(ctx.destination);
			o.start(t);
			o.stop(t + 0.24);
		});
		navigator.vibrate?.(ok ? 12 : [20, 40, 20]);
	} catch {
		/* sound is optional */
	}
}

// Start recording. Returns a function that stops and gives back the audio.
export async function record() {
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	const rec = new MediaRecorder(stream);
	const chunks = [];
	rec.ondataavailable = (e) => chunks.push(e.data);
	rec.start();
	return () =>
		new Promise((done) => {
			rec.onstop = () => {
				stream.getTracks().forEach((t) => t.stop());
				done(new Blob(chunks, { type: rec.mimeType || 'audio/mp4' }));
			};
			rec.stop();
		});
}

// Send a recording to be transcribed: { text, words: [{ w, c }] }
export async function hear(blob, pass = '') {
	const r = await fetch(`/api/stt?l=${lang}`, { method: 'POST', headers: { 'content-type': blob.type || 'audio/mp4', 'x-pass': pass }, body: blob });
	const d = await r.json().catch(() => ({}));
	if (!r.ok) {
		if (r.status === 502 || r.status === 429) notice('Speech recognition is at its limit or busy right now. Try again in a moment.', 'voice');
		throw new Error(d.message || `Request failed (${r.status})`);
	}
	return d;
}

// A short message at the top of the screen, for things the user should know but that are not their fault:
// the free AI is busy, the voice quota ran out, the device is offline. Shown by the layout.
export function notice(text, kind = 'busy') {
	if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('jeitinho:notice', { detail: { text, kind } }));
}
const OWN = ' Your own key in Settings skips the queue.';
const explain = (status, message, own) =>
	status === 429 && /lot of requests/.test(message) ? 'You have sent a lot of AI requests in a few minutes. Give it a short break, then try again.'
	: status === 429 ? `The free AI models are busy right now. This usually clears within a minute.${own ? '' : OWN}`
	: status === 502 || status === 504 ? `The AI did not answer in time. It is under heavy use at the moment; try again in a moment.${own ? '' : OWN}`
	: status === 503 ? 'This feature is not switched on for this server.'
	: status === 401 ? message
	: '';

export async function ai(op, body, pass = '') {
	// the first time: say where the text goes
	try {
		if (!P.key && !localStorage.getItem('jeitinho:ai-told')) {
			localStorage.setItem('jeitinho:ai-told', '1');
			notice('Heads up: AI features send your text to free AI models, which may keep what they receive. Do not send anything private.', 'busy');
		}
	} catch {
		/* no storage: skip the note */
	}
	let r;
	try {
		r = await fetch('/api/ai', {
			method: 'POST',
			// with your own key set in Settings, requests use your key and your model instead of the shared free ones
			headers: { 'content-type': 'application/json', 'x-pass': pass, ...(P.key && { 'x-user-key': P.key, 'x-user-model': P.model }) },
			body: JSON.stringify({ op, lang, ...body })
		});
	} catch {
		const text = navigator.onLine ? 'Could not reach the server. Check your connection and try again.' : 'You are offline. Lessons, quizzes and your word bank still work; AI features need a connection.';
		notice(text, 'offline');
		throw new Error(text);
	}
	const d = await r.json().catch(() => ({}));
	if (!r.ok) {
		const text = explain(r.status, d.message || '', !!P.key);
		if (text) notice(text);
		throw new Error(text || d.message || `Request failed (${r.status})`);
	}
	return d;
}
