import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

// Users paste arbitrary links, so never let the server reach private or local addresses.
export function isPrivate(ip) {
	if (ip.includes(':')) {
		const l = ip.toLowerCase();
		if (l.startsWith('::ffff:')) return l.includes('.') ? isPrivate(l.slice(7)) : true;
		return l === '::1' || l === '::' || /^f[cd]/.test(l) || /^fe[89ab]/.test(l);
	}
	const [a, b] = ip.split('.').map(Number);
	return (
		a === 0 || a === 10 || a === 127 || a >= 224 ||
		(a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127)
	);
}

// ponytail: checks DNS then fetches, so a DNS-rebinding race is still possible. Pin the resolved IP if this ever runs next to internal services.
export async function safeFetch(raw, hops = 3) {
	const u = new URL(raw);
	if (!/^https?:$/.test(u.protocol)) throw new Error('Only http and https links work');
	const host = u.hostname.replace(/^\[|\]$/g, '');
	const addrs = isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
	if (!addrs.length || addrs.some((a) => isPrivate(a.address))) throw new Error('That address is not allowed');
	const r = await fetch(u, {
		redirect: 'manual',
		signal: AbortSignal.timeout(9000),
		headers: { 'user-agent': 'Mozilla/5.0 (compatible; language-study-bot)', 'accept-language': 'pt-BR,pt;q=0.9,en;q=0.5' }
	});
	const loc = r.headers.get('location');
	if (r.status >= 300 && r.status < 400 && loc) {
		if (!hops) throw new Error('Too many redirects');
		return safeFetch(new URL(loc, u).href, hops - 1);
	}
	if (!r.ok) throw new Error(`The page answered ${r.status}`);
	if (+r.headers.get('content-length') > 3e6) throw new Error('Page is too large');
	if (!/^(text\/|application\/(xhtml|xml|json))/i.test(r.headers.get('content-type') || 'text/')) throw new Error('That link is not a web page');
	return r;
}

// Reads a response as text but stops at max bytes. A server can leave out content-length and keep
// sending; without this the whole body would be pulled into memory.
export async function readText(res, max = 1.5e6) {
	const reader = res.body.getReader();
	const chunks = [];
	let size = 0;
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
		if ((size += value.length) >= max) {
			await reader.cancel();
			break;
		}
	}
	return new TextDecoder().decode(Buffer.concat(chunks).subarray(0, max));
}
