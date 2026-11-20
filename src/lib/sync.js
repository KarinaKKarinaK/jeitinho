// What to do right after sign-in. Whole-state last-write-wins, decided by a revision timestamp.
// ponytail: no per-field merge. If two devices change things while one is offline, the older one loses. Merge per word if that ever bites.
// When someone takes the placement test signed out and then signs in to an account that already has data,
// the account data wins, but what they just earned on this device is kept on top of it.
// ids = the stage ids in order, to tell which starting point is further along.
export function keepPlacement(data, local, ids) {
	if (!local?.onboarded || local.uid) return data;
	const later = ids.indexOf(local.placed) > ids.indexOf(data.placed ?? null) ? local.placed : (data.placed ?? null);
	return {
		...data,
		onboarded: true,
		placed: later,
		badges: { ...local.badges, ...data.badges },
		done: { ...local.done, ...data.done },
		placeSeen: [...new Set([...(data.placeSeen || []), ...(local.placeSeen || [])])].slice(-600)
	};
}

export function decide({ uid, localUid, localRev, remote, remoteRev }) {
	const foreign = !!localUid && localUid !== uid; // this device holds someone else's data
	if (!remote) return foreign ? 'fresh' : 'push';
	if (foreign || remoteRev >= localRev) return 'pull';
	return 'push';
}
