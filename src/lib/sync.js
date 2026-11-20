// What to do right after sign-in. Whole-state last-write-wins, decided by a revision timestamp.
// ponytail: no per-field merge. If two devices change things while one is offline, the older one loses. Merge per word if that ever bites.
export function decide({ uid, localUid, localRev, remote, remoteRev }) {
	const foreign = !!localUid && localUid !== uid; // this device holds someone else's data
	if (!remote) return foreign ? 'fresh' : 'push';
	if (foreign || remoteRev >= localRev) return 'pull';
	return 'push';
}
