import { lang, meta } from './lang.js';
import { P, voiceOf } from './prefs.js';

export const DAY = 864e5;

export const today = (d = new Date()) =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Which optional services the server has keys for. Filled in by cloud.svelte.js at startup.
export const caps = { ai: false, tts: false, stt: false, push: '' };

// The date n calendar days before today (or before `from`). Subtracting milliseconds goes wrong on the two
// days a year when clocks change, so this steps by calendar day.
export const dayAgo = (n, from = new Date()) => today(new Date(from.getFullYear(), from.getMonth(), from.getDate() - n));

// Asks for a second opinion on an answer marked wrong. Quiet on purpose: no notices, never throws, gives up after
// a few seconds. Returns { ok, why } or null.
export async function second(q, given, pass = '') {
	if (!caps.ai || !navigator.onLine) return null;
	try {
		const r = await fetch('/api/ai', {
			method: 'POST',
			headers: { 'content-type': 'application/json', 'x-pass': pass, ...(P.key && { 'x-user-key': P.key, 'x-user-model': P.model }) },
			body: JSON.stringify({ op: 'judge', lang, prompt: [q.label, q.prompt, q.sub].filter(Boolean).join(' | '), expected: [q.answer, ...(q.accept || [])], given }),
			signal: AbortSignal.timeout(7000)
		});
		return r.ok ? await r.json() : null;
	} catch {
		return null;
	}
}

// A single Chinese character on its own is often misread by the cloud voice (many have two readings and it has no
// context), so those go to the device voice, which reads the dictionary form.
const lone = (text) => lang === 'zh' && [...text.trim().replace(/[。，！？.,!?]/g, '')].length === 1;
const cloudVoice = (text) => caps.tts && voiceOf(lang) !== 'device' && navigator.onLine && text.length <= 160 && !lone(text);
const ttsUrl = (text) => `/api/tts?l=${lang}&v=${voiceOf(lang)}&t=` + encodeURIComponent(text.trim());
// Fetches the audio for a phrase ahead of time, so it starts the moment it is asked for.
// Only used for phrases that are about to be played anyway, so it costs no extra voice quota.
const warmed = new Set();
export function warm(text) {
	if (!text || !cloudVoice(text)) return;
	const u = ttsUrl(text);
	if (warmed.has(u)) return;
	warmed.add(u);
	fetch(u).catch(() => warmed.delete(u));
}

let voice;
let player;
let turn = 0;
// Natural cloud voice when it is set up and we are online. Otherwise the phone's built-in pt-BR voice: free and offline.
export function speak(text, rate = P.rate) {
	if (!text) return;
	const me = ++turn;
	if (cloudVoice(text)) {
		globalThis.speechSynthesis?.cancel();
		player ??= new Audio(); // one shared element: once a tap has unlocked it, iOS lets later plays through
		// quota used up or service down: stay on the phone voice for this session, and say so once
		player.onerror = () => {
			if (caps.tts) notice('The natural voice has reached its monthly limit, so the device voice is used for now.', 'voice');
			caps.tts = false;
		};
		player.src = ttsUrl(text);
		player.defaultPlaybackRate = player.playbackRate = Math.max(0.6, Math.min(1.2, rate + 0.1));
		player.play().catch(() => me === turn && local(text, rate));
		return;
	}
	local(text, rate);
}

// The device voice for this language. The list arrives late in some browsers, and without an explicit voice
// many of them read everything with the default English one, so look again whenever the list changes.
function pickVoice() {
	const all = globalThis.speechSynthesis?.getVoices() || [];
	const loc = meta.locale.toLowerCase();
	const tag = (v) => v.lang.replace('_', '-').toLowerCase();
	return all.find((v) => tag(v) === loc && v.localService) || all.find((v) => tag(v) === loc) || all.find((v) => tag(v).startsWith(loc.slice(0, 2))) || null;
}
if (typeof speechSynthesis !== 'undefined') speechSynthesis.addEventListener?.('voiceschanged', () => (voice = pickVoice()));

function local(text, rate) {
	if (typeof speechSynthesis === 'undefined') return;
	player?.pause();
	const u = new SpeechSynthesisUtterance(text);
	voice ||= pickVoice();
	if (voice) u.voice = voice;
	u.lang = meta.locale;
	u.rate = rate;
	speechSynthesis.cancel();
	speechSynthesis.speak(u);
}

// Right and wrong sounds. Each is built once as a tiny WAV file and played through an audio element:
// unlike generated web audio, that still sounds when an iPhone's silent switch is on, like the voice does.
function wav(notes, len) {
	const rate = 22050, n = Math.floor(rate * len), pcm = new Int16Array(n);
	for (const [freq, at, dur, vol, soft] of notes)
		for (let i = Math.floor(at * rate); i < Math.min(n, Math.floor((at + dur) * rate)); i++) {
			const t = i / rate - at;
			const env = Math.min(1, t / 0.006) * Math.exp((-t * (soft ? 9 : 6)) / dur * 1.2); // quick attack, bell-like decay
			const tone = Math.sin(2 * Math.PI * freq * t) + (soft ? 0.25 * Math.sin(2 * Math.PI * freq * 0.5 * t) : 0.3 * Math.sin(2 * Math.PI * freq * 2 * t));
			pcm[i] = Math.max(-32767, Math.min(32767, pcm[i] + tone * env * vol * 32767));
		}
	const head = new DataView(new ArrayBuffer(44));
	const put = (o, text) => [...text].forEach((c, k) => head.setUint8(o + k, c.charCodeAt(0)));
	put(0, 'RIFF'); head.setUint32(4, 36 + n * 2, true); put(8, 'WAVEfmt '); head.setUint32(16, 16, true); head.setUint16(20, 1, true); head.setUint16(22, 1, true);
	head.setUint32(24, rate, true); head.setUint32(28, rate * 2, true); head.setUint16(32, 2, true); head.setUint16(34, 16, true); put(36, 'data'); head.setUint32(40, n * 2, true);
	return URL.createObjectURL(new Blob([head, pcm], { type: 'audio/wav' }));
}
let sfx;
function sounds() {
	return (sfx ??= {
		// right: three quick rising notes (C, E, G), bright
		ok: new Audio(wav([[1046.5, 0, 0.22, 0.22], [1318.5, 0.07, 0.24, 0.22], [1568, 0.14, 0.34, 0.24]], 0.5)),
		// wrong: two soft low notes stepping down
		bad: new Audio(wav([[311.1, 0, 0.2, 0.3, true], [233.1, 0.13, 0.32, 0.3, true]], 0.48))
	});
}
// a phone only lets sound start from a tap: wake the two players on the first one
if (typeof window !== 'undefined')
	window.addEventListener('pointerdown', () => {
		try {
			if (!P.sfx) return;
			for (const a of Object.values(sounds())) { a.muted = true; a.play().then(() => { a.pause(); a.currentTime = 0; a.muted = false; }).catch(() => (a.muted = false)); }
		} catch { /* sound is optional */ }
	}, { once: true });

export function ding(ok) {
	if (!P.sfx) return;
	try {
		const a = sounds()[ok ? 'ok' : 'bad'];
		a.currentTime = 0;
		a.volume = 0.7;
		a.play().catch(() => {});
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
