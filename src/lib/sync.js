// Sync between this device and the account. The rule: never throw progress away.
// When only one side changed since they last agreed, that side wins. When both changed (two devices used
// in turn, or a device with some progress signing in to an account that has more), the two are merged.

// Merge two copies of one language's state. Progress only ever goes up; lists are joined; things the
// user deleted on either side stay deleted (state.gone remembers them).
// key(word) gives the identity of a word, so the same word saved on two devices becomes one entry.
// ids = stage ids in order, to tell which placement is further along.
export function merge(local, remote, key = (w) => w.pt, ids = []) {
	const gone = { ...(remote.gone || {}), ...(local.gone || {}) };
	const top = (a = {}, b = {}) => {
		const out = { ...a };
		for (const [k, v] of Object.entries(b)) out[k] = typeof v === 'number' && typeof out[k] === 'number' ? Math.max(out[k], v) : (out[k] ?? v);
		return out;
	};
	const join = (a = [], b = []) => {
		const seen = new Map();
		for (const x of [...a, ...b]) if (x?.id && !gone[x.id] && !seen.has(x.id)) seen.set(x.id, x);
		return [...seen.values()];
	};
	// words: one entry per word; keep the copy that has been studied more, and carry over what the other knows
	const words = new Map();
	for (const w of [...(local.words || []), ...(remote.words || [])]) {
		const k = key(w);
		if (!k || gone[k]) continue;
		const old = words.get(k);
		if (!old) words.set(k, w);
		else {
			const better = (w.reps || 0) > (old.reps || 0) || ((w.reps || 0) === (old.reps || 0) && (w.due || 0) > (old.due || 0)) ? w : old;
			const other = better === w ? old : w;
			words.set(k, { ...other, ...better, star: !!(w.star || old.star), note: better.note || other.note || '', pos: better.pos || other.pos || '', say: better.say || other.say || '', ex: better.ex || other.ex || '', exEn: better.exEn || other.exEn || '', conj: better.conj || other.conj, cols: [...new Set([...(old.cols || []), ...(w.cols || [])])].filter((c) => !gone[c]) });
		}
	}
	const newer = (local.last || '') >= (remote.last || '') ? local : remote; // the side that studied most recently
	const quiz = { ...(remote.quiz || {}) };
	for (const [d, q] of Object.entries(local.quiz || {})) if (!quiz[d]?.done || q.done) quiz[d] = q;
	const placed = ids.indexOf(local.placed) > ids.indexOf(remote.placed ?? null) ? local.placed : (remote.placed ?? null);
	const drop = (o = {}) => Object.fromEntries(Object.entries(o).filter(([k]) => !gone[k]));
	return {
		...remote,
		...local,
		uid: remote.uid ?? local.uid ?? null,
		xp: Math.max(local.xp || 0, remote.xp || 0),
		streak: (local.last || '') === (remote.last || '') ? Math.max(local.streak || 0, remote.streak || 0) : newer.streak || 0,
		last: newer.last ?? null,
		nquiz: Math.max(local.nquiz || 0, remote.nquiz || 0),
		seedN: Math.max(local.seedN || 0, remote.seedN || 0),
		placedAt: Math.max(local.placedAt || 0, remote.placedAt || 0),
		onboarded: !!(local.onboarded || remote.onboarded),
		placed,
		days: top(local.days, remote.days),
		mins: top(local.mins, remote.mins),
		done: top(local.done, remote.done),
		asked: top(local.asked, remote.asked),
		read: { ...(remote.read || {}), ...(local.read || {}) },
		badges: { ...(local.badges || {}), ...(remote.badges || {}) }, // an earlier date on the account is kept
		chapters: { ...(local.chapters || {}), ...(remote.chapters || {}) },
		placeSeen: [...new Set([...(remote.placeSeen || []), ...(local.placeSeen || [])])].slice(-600),
		words: [...words.values()],
		quiz,
		materials: join(local.materials, remote.materials),
		texts: join(local.texts, remote.texts),
		cols: join(local.cols, remote.cols),
		custom: drop({ ...(remote.custom || {}), ...(local.custom || {}) }),
		gloss: { ...(remote.gloss || {}), ...(local.gloss || {}) },
		chat: newer.chat || [],
		fixes: join(local.fixes, remote.fixes).slice(-100),
		gone: Object.fromEntries(Object.entries(gone).sort((a, b) => b[1] - a[1]).slice(0, 800))
	};
}

// What to do when this device meets the account's copy.
//   base = the revision both sides last agreed on (0 if this device has never synced this language)
export function decide({ uid, localUid, localRev, remote, remoteRev, base = 0 }) {
	const foreign = !!localUid && localUid !== uid; // this device holds another account's data
	if (!remote) return foreign ? 'fresh' : 'push';
	if (foreign) return 'pull';
	const localChanged = localRev !== base;
	const remoteChanged = remoteRev !== base;
	if (!localChanged && !remoteChanged) return 'same';
	if (!remoteChanged) return 'push';
	if (!localChanged && base) return 'pull';
	return 'merge'; // both changed, or they have never met: join them
}

// Keeps a state small enough to store: looked-up meanings and conjugation tables are caches that can be
// fetched again, so they go first. Returns null if it is still too big.
export function slim(data, max = 1200000) {
	const size = (o) => JSON.stringify(o).length;
	if (size(data) <= max) return data;
	let out = { ...data, gloss: {} };
	if (size(out) <= max) return out;
	out = { ...out, words: out.words.map(({ conj, ...w }) => w) };
	return size(out) <= max ? out : null;
}
