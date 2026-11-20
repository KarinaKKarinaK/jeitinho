export const DAY = 864e5;

export const today = (d = new Date()) =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

let voice;
// Uses the phone's built-in pt-BR voice: free, offline, no API.
export function speak(text, rate = 0.9) {
	if (typeof speechSynthesis === 'undefined' || !text) return;
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
