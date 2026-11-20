export const DAY = 864e5;

export const today = (d = new Date()) =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Which optional services the server has keys for. Filled in by cloud.svelte.js at startup.
export const caps = { ai: false, tts: false, stt: false };

let voice;
let player;
let turn = 0;
// Natural cloud voice when it is set up and we are online. Otherwise the phone's built-in pt-BR voice: free and offline.
export function speak(text, rate = 0.9) {
	if (!text) return;
	const me = ++turn;
	if (caps.tts && navigator.onLine && text.length <= 300) {
		globalThis.speechSynthesis?.cancel();
		player ??= new Audio(); // one shared element: once a tap has unlocked it, iOS lets later plays through
		player.onerror = () => (caps.tts = false); // quota used up or service down: stay on the phone voice for this session, no repeated waiting
		player.src = '/api/tts?t=' + encodeURIComponent(text.trim());
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
	voice ??= speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-') === 'pt-BR');
	if (voice) u.voice = voice;
	u.lang = 'pt-BR';
	u.rate = rate;
	speechSynthesis.cancel();
	speechSynthesis.speak(u);
}

let ctx;
export function ding(ok) {
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
	const r = await fetch('/api/stt', { method: 'POST', headers: { 'content-type': blob.type || 'audio/mp4', 'x-pass': pass }, body: blob });
	const d = await r.json().catch(() => ({}));
	if (!r.ok) throw new Error(d.message || `Request failed (${r.status})`);
	return d;
}

export async function ai(op, body, pass = '') {
	const r = await fetch('/api/ai', {
		method: 'POST',
		headers: { 'content-type': 'application/json', 'x-pass': pass },
		body: JSON.stringify({ op, ...body })
	});
	const d = await r.json().catch(() => ({}));
	if (!r.ok) throw new Error(d.message || `Request failed (${r.status})`);
	return d;
}
