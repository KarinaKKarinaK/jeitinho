import { json, error } from '@sveltejs/kit';
import * as env from '$app/env/private';
import crypto from 'node:crypto';
import { limited } from '../../../lib/server/limit.js';

const same = (a, b) => {
	const [x, y] = [a, b].map((v) => crypto.createHash('sha256').update(String(v)).digest());
	return crypto.timingSafeEqual(x, y);
};

// Daily reminders by web push, with no paid service:
// - the browser subscribes and tells us the hour (UTC) it wants the reminder
// - a scheduled job in the database calls this route every hour with CRON_SECRET
// - we ping each subscription due that hour. The ping has no payload; the service worker holds the text.
const SITE = 'https://jeitinho-zeta.vercel.app';
// only real browser push services, so a made-up "endpoint" cannot make this server call arbitrary hosts
const PUSH_HOST = /^(fcm\.googleapis\.com|updates\.push\.services\.mozilla\.com|[a-z0-9-]+\.push\.apple\.com|[a-z0-9-]+\.notify\.windows\.com)$/;

const ready = () => env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY && env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY;
const db = (path, init = {}) =>
	fetch(`${env.SUPABASE_URL}/rest/v1/push_subs${path}`, {
		...init,
		headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, 'content-type': 'application/json', ...init.headers }
	});

function endpointOf(v) {
	try {
		const u = new URL(String(v).slice(0, 1000));
		return u.protocol === 'https:' && PUSH_HOST.test(u.hostname) ? u.href : null;
	} catch {
		return null;
	}
}

// VAPID: a short-lived signed token that tells the push service who is sending
const b64 = (b) => Buffer.from(b).toString('base64url');
export function _vapid(endpoint, now = Date.now()) {
	const head = b64(JSON.stringify({ typ: 'JWT', alg: 'ES256' }));
	const body = b64(JSON.stringify({ aud: new URL(endpoint).origin, exp: Math.floor(now / 1000) + 12 * 3600, sub: SITE }));
	const key = crypto.createPrivateKey({ key: Buffer.from(env.VAPID_PRIVATE_KEY, 'base64url'), format: 'der', type: 'pkcs8' });
	const sig = crypto.sign('sha256', Buffer.from(`${head}.${body}`), { key, dsaEncoding: 'ieee-p1363' });
	return `vapid t=${head}.${body}.${b64(sig)}, k=${env.VAPID_PUBLIC_KEY}`;
}

// subscribe or change the hour: { endpoint, hour } (hour in UTC, 0 to 23)
export async function POST({ request, getClientAddress }) {
	if (!ready()) error(503, 'Notifications are not set up.');
	// hourly job
	if (request.headers.get('x-cron')) {
		if (!env.CRON_SECRET || !same(request.headers.get('x-cron'), env.CRON_SECRET)) error(401, 'No.');
		const hour = new Date().getUTCHours();
		const subs = await (await db(`?hour=eq.${hour}&select=endpoint&order=created_at.asc&limit=2000`)).json();
		let sent = 0, gone = 0;
		await Promise.all(
			(Array.isArray(subs) ? subs : []).map(async ({ endpoint }) => {
				if (!endpointOf(endpoint)) return;
				const r = await fetch(endpoint, { method: 'POST', headers: { authorization: _vapid(endpoint), ttl: '43200', urgency: 'normal', 'content-length': '0' }, signal: AbortSignal.timeout(8000) }).catch(() => null);
				if (r?.ok) sent++;
				// the browser dropped this subscription: forget it
				else if (r && (r.status === 404 || r.status === 410)) (gone++, await db(`?endpoint=eq.${encodeURIComponent(endpoint)}`, { method: 'DELETE' }));
			})
		);
		return json({ hour, sent, gone });
	}
	if (limited('push', getClientAddress(), 10)) error(429, 'Too many requests.');
	const b = await request.json().catch(() => ({}));
	const endpoint = endpointOf(b.endpoint);
	const hour = Number(b.hour);
	if (!endpoint || !Number.isInteger(hour) || hour < 0 || hour > 23) error(400, 'Bad subscription.');
	const r = await db('?on_conflict=endpoint', { method: 'POST', headers: { prefer: 'resolution=merge-duplicates' }, body: JSON.stringify({ endpoint, hour }) });
	if (!r.ok) error(502, 'Could not save the reminder.');
	return json({ ok: true });
}

// unsubscribe: { endpoint }
export async function DELETE({ request }) {
	if (!ready()) error(503, 'Notifications are not set up.');
	const endpoint = endpointOf((await request.json().catch(() => ({}))).endpoint);
	if (!endpoint) error(400, 'Bad subscription.');
	await db(`?endpoint=eq.${encodeURIComponent(endpoint)}`, { method: 'DELETE' });
	return json({ ok: true });
}
