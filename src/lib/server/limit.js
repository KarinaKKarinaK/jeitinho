import crypto from 'node:crypto';
import * as env from '$app/env/private';

// Limits on the shared free quotas, in two layers:
// 1. in memory, per server instance: instant, stops a burst before it costs a database call
// 2. in the database: shared by every instance and kept across restarts, so the limit is real
// If the database cannot be reached, the memory layer still applies (the app keeps working).
const buckets = new Map();
function local(key, max, windowMs, add, now = Date.now()) {
	const b = buckets.get(key);
	const cur = b && b.until > now ? b : { n: 0, until: now + windowMs };
	cur.n += add;
	buckets.set(key, cur);
	if (buckets.size > 20000) buckets.clear();
	return cur.n > max;
}

// The visitor's address is never stored: only a salted hash of it, and only until the window ends.
const who = (ip) => crypto.createHash('sha256').update(`${env.CRON_SECRET || 'jeitinho'}:${ip}`).digest('base64url').slice(0, 22);

async function shared(key, max, windowS, add) {
	if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return false;
	try {
		const r = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/hit`, {
			method: 'POST',
			headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, 'content-type': 'application/json' },
			body: JSON.stringify({ k: key, add, window_s: windowS }),
			signal: AbortSignal.timeout(2500)
		});
		return r.ok ? (await r.json()) > max : false;
	} catch {
		return false;
	}
}

// true when this visitor has gone over `max` uses of `name` within the window (default 5 minutes)
export async function limited(name, ip, max, windowS = 300) {
	const key = `${name}:${who(ip)}`;
	return local(key, max, windowS * 1000, 1) || (await shared(key, max, windowS, 1));
}

// a budget shared by everyone, for example characters of speech per day
export async function overBudget(name, amount, max, windowS = 86400) {
	const key = `${name}:${new Date().toISOString().slice(0, 10)}`;
	return local(key, max, windowS * 1000, amount) || (await shared(key, max, windowS, amount));
}
