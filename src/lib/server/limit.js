// A soft brake per visitor on the shared free quotas.
// ponytail: counted in memory per server instance, so it resets when the instance is recycled and is not
// shared between instances. It stops a runaway tab or a simple script, not a determined attacker.
// Upgrade path: a table or a rate-limit service keyed by user or IP.
const buckets = new Map();
export function limited(name, ip, max, windowMs = 300000, now = Date.now()) {
	const key = `${name}:${ip}`;
	const recent = (buckets.get(key) || []).filter((t) => now - t < windowMs);
	recent.push(now);
	buckets.set(key, recent);
	if (buckets.size > 20000) buckets.clear();
	return recent.length > max;
}
