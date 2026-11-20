<script>
	import Icon from '../../lib/Icon.svelte';
	import Heatmap from '../../lib/Heatmap.svelte';
	import { S } from '../../lib/store.svelte.js';
	import { current, earned, forecast, masteredCount, levelName } from '../../lib/roadmap.js';
	import { meta } from '../../lib/lang.js';
	import { cloud, oauth, signIn, signUp, forgot, setPassword, signOut, pull, wipe, saveName, saveAvatar, changeEmail } from '../../lib/cloud.svelte.js';

	let mode = $state('in');
	let email = $state('');
	let password = $state('');
	let busy = $state(false);
	let err = $state('');
	let msg = $state('');
	let armed = $state(false); // deleting takes two taps
	let name = $state(cloud.name);
	let newEmail = $state('');
	let editEmail = $state(false);

	// phone photos are huge: crop to a centred square and shrink to 192 px before it goes anywhere
	async function pickAvatar(e) {
		const f = e.target.files[0];
		e.target.value = '';
		if (!f) return;
		run(async () => {
			const img = await createImageBitmap(f);
			const side = Math.min(img.width, img.height);
			const c = Object.assign(document.createElement('canvas'), { width: 192, height: 192 });
			c.getContext('2d').drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, 192, 192);
			await saveAvatar(c.toDataURL('image/jpeg', 0.82));
			return 'Picture saved.';
		});
	}

	async function run(fn) {
		busy = true;
		err = msg = '';
		try {
			msg = (await fn()) || '';
		} catch (e) {
			err = e.message;
		}
		busy = false;
	}

	const submit = () =>
		run(async () => {
			if (cloud.recovery) return await setPassword(password), 'Password updated.';
			if (mode === 'in') return void (await signIn(email, password));
			const d = await signUp(email, password);
			return d.session ? '' : 'Check your email and tap the link to confirm your account.';
		});
	const reset = () => run(async () => (await forgot(email), 'If that email has an account, a reset link is on its way.'));
	// level, forecast and the activity map
	const stage = $derived(current(S));
	const badge = $derived(earned(S));
	const fc = $derived(stage ? forecast(S, stage) : null);
	const when = $derived(cloud.at ? new Date(cloud.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
</script>

<header class="head">
	<a class="icon-btn" href="/" aria-label="Back"><Icon name="back" /></a>
</header>

<div class="stack rise">
	{#if cloud.ready && !cloud.recovery}
		<div class="card stack profile">
			<p class="eyebrow">Profile</p>
			<div class="row">
				<label class="avatar" title="Change picture">
					{#if cloud.avatar}<img src={cloud.avatar} alt="Your profile" />{:else}<Icon name="user" size={30} />{/if}
					<span class="cam"><Icon name="camera" size={14} /></span>
					<input type="file" accept="image/*" hidden onchange={pickAvatar} disabled={busy} />
				</label>
				<form class="grow stack" style="gap:8px" onsubmit={(e) => { e.preventDefault(); run(async () => (await saveName(name), 'Name saved.')); }}>
					<input type="text" bind:value={name} placeholder="Your name" maxlength="40" autocomplete="name" aria-label="Your name" />
					<div class="chips">
						<button class="btn sm primary" disabled={busy || name.trim() === cloud.name}>Save name</button>
						{#if cloud.avatar}<button type="button" class="btn sm" disabled={busy} onclick={() => run(async () => (await saveAvatar(''), 'Picture removed.'))}>Remove picture</button>{/if}
					</div>
				</form>
			</div>
			{#if cloud.user}
				<div class="row small">
					<span class="grow dim">Email: <b>{cloud.user.email}</b>{#if cloud.user.pending}<br />Waiting for you to confirm {cloud.user.pending}{/if}</span>
					<button class="btn sm" onclick={() => (editEmail = !editEmail)}>Change</button>
				</div>
				{#if editEmail}
					<form class="row" onsubmit={(e) => { e.preventDefault(); run(async () => (await changeEmail(newEmail), (editEmail = false), `Check ${newEmail} and tap the link to confirm the change.`)); }}>
						<input class="grow" type="email" bind:value={newEmail} placeholder="New email" required autocomplete="email" autocapitalize="off" />
						<button class="btn sm primary" disabled={busy || !newEmail}>Send link</button>
					</form>
				{/if}
			{:else if cloud.status !== 'off'}
				<p class="dim small">Your name and picture are kept on this device. Sign in below to carry them, and your progress, to every device.</p>
			{/if}
		</div>

		<div class="card stack prog">
			<p class="eyebrow">{meta.name}</p>
			<div class="row">
				<span class="lvl">{badge?.id || '0'}</span>
				<span class="grow"><b>{badge ? `Level ${levelName(badge)}: ${badge.title}` : 'No badge yet'}</b><small class="dim">{stage ? `Working toward ${levelName(stage)}` : 'Every badge earned'} · {S.xp} XP · {masteredCount(S)} words mastered</small></span>
			</div>
			{#if stage && fc}
				<p class="small">
					{#if fc.date}
						At your pace of the last 4 days ({Math.round(fc.avg)} min a day), you should reach <b>{stage.id}</b> by <b>{fc.date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</b>.
					{:else}
						Study for a few minutes today to get a date for reaching <b>{stage.id}</b>. About {Math.round(fc.minutes)} minutes of work are left.
					{/if}
				</p>
				<p class="dim small">An estimate from your remaining milestones and your recent minutes. <a href="/roadmap" class="u">See the roadmap</a></p>
			{/if}
			<Heatmap />
		</div>
	{/if}

	{#if !cloud.ready}
		<div class="spin"></div>
	{:else if cloud.status === 'off'}
		<p class="eyebrow">Account</p>
		<h1>Accounts are not set up</h1>
		<p class="dim">This deployment has no database connected yet, so progress stays on this device. See the README for the two steps.</p>
	{:else if cloud.recovery}
		<p class="eyebrow">Nova senha</p>
		<h1>Choose a new password</h1>
		<form class="stack" onsubmit={(e) => { e.preventDefault(); submit(); }}>
			<input type="password" bind:value={password} placeholder="New password" minlength="8" required autocomplete="new-password" />
			<button class="btn primary wide" disabled={busy}>Save password</button>
		</form>
	{:else if cloud.user}
		<p class="eyebrow">Account</p>
		<h1>All saved</h1>
		<div class="card stack">
			<div class="row">
				<span class="dot"><Icon name="user" /></span>
				<span class="grow"><b>{cloud.user.email}</b><small class="dim">
					{cloud.status === 'syncing' ? 'Syncing...' : cloud.status === 'error' ? 'Sync problem' : `Synced${when ? ' at ' + when : ''}`}
				</small></span>
			</div>
			{#if cloud.status === 'error'}<p class="err" role="alert">{cloud.error}</p>{/if}
			<p class="dim small">{S.xp} XP, {S.words.length} words and {S.materials.length} saved materials follow you to any device you sign in on.</p>
			<div class="chips">
				<button class="btn sm" onclick={pull} disabled={cloud.status === 'syncing'}>Sync now</button>
				<button class="btn sm" onclick={() => run(signOut)} disabled={busy}>Sign out</button>
			</div>
		</div>
		<button class="link" class:danger={armed} disabled={busy} onclick={() => (armed ? run(async () => (await wipe(), (armed = false), 'Your cloud data is deleted. What is on this device stays.')) : (armed = true))}>
			{armed ? 'Tap again to delete your progress and photos from the server. This cannot be undone.' : 'Delete my cloud data'}
		</button>
	{:else}
		<p class="eyebrow">Account</p>
		<h1>Keep your progress</h1>
		<p class="dim">Sign in and your streak, word bank and saved material follow you to every device. What you have on this device now comes with you.</p>

		<button class="btn primary wide" onclick={() => run(() => oauth('google'))} disabled={busy}>Continue with Google</button>
		<button class="btn wide" onclick={() => run(() => oauth('github'))} disabled={busy}>Continue with GitHub</button>

		<div class="or"><span>or with email</span></div>

		<div class="tabs" style="align-self:flex-start">
			<button class:on={mode === 'in'} onclick={() => (mode = 'in')}>Sign in</button>
			<button class:on={mode === 'up'} onclick={() => (mode = 'up')}>Create account</button>
		</div>
		<form class="stack" onsubmit={(e) => { e.preventDefault(); submit(); }}>
			<input type="email" bind:value={email} placeholder="Email" required autocomplete="email" autocapitalize="off" />
			<input type="password" bind:value={password} placeholder="Password (8+ characters)" minlength="8" required autocomplete={mode === 'in' ? 'current-password' : 'new-password'} />
			<button class="btn wide" disabled={busy}>{#if busy}<span class="spin"></span>{:else}{mode === 'in' ? 'Sign in' : 'Create account'}{/if}</button>
		</form>
		{#if mode === 'in'}<button class="link" onclick={reset} disabled={busy || !email}>Forgot password? Type your email above, then tap here.</button>{/if}
	{/if}

	{#if cloud.ready}<p class="dim small fine">No ads, no tracking. <a href="/privacy">How your data is handled</a></p>{/if}

	{#if err}<p class="err" role="alert">{err}</p>{/if}
	{#if msg}<p style="color:var(--ok)" role="status">{msg}</p>{/if}
</div>

<style>
	input[type='email'] { width: 100%; padding: 16px 18px; border-radius: 20px; border: 1px solid var(--line); background: var(--field); color: var(--ink); font: 400 17px var(--font); outline: none; }
	input[type='email']:focus { border-color: var(--rose); }
	.or { display: flex; align-items: center; gap: 12px; color: var(--faint); font: 400 11px var(--mono); letter-spacing: 0.1em; text-transform: uppercase; margin: 6px 0; }
	.or::before, .or::after { content: ''; flex: 1; height: 1px; background: var(--line); }
	.dot { width: 46px; height: 46px; flex: none; border-radius: 50%; background: var(--glass2); display: grid; place-items: center; }
	b { display: block; font-weight: 500; overflow-wrap: anywhere; }
	.link { background: none; border: 0; padding: 0; color: var(--dim); font: 400 14px var(--font); text-align: left; cursor: pointer; }
	.link:disabled { opacity: 0.5; }
	.fine { margin-top: 6px; }
	.fine a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
	.danger { color: var(--bad); }
	.prog b { display: block; font-weight: 500; }
	.prog .small b { display: inline; }
	.lvl { width: 54px; height: 54px; flex: none; border-radius: 50%; display: grid; place-items: center; font: 500 13px var(--mono); color: #17121c; background: linear-gradient(150deg, #e4f060, #e3a3c6); }
	.u { text-decoration: underline; text-underline-offset: 3px; }
	.profile b { font-weight: 500; color: var(--ink); display: inline; }
	.profile input[type='text'] { padding: 12px 16px; border-radius: 16px; }
	.avatar { position: relative; width: 84px; height: 84px; flex: none; border-radius: 50%; display: grid; place-items: center; background: var(--glass2); color: var(--dim); cursor: pointer; transition: transform 0.18s var(--spring); }
	.avatar:active { transform: scale(0.94); }
	.avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
	.cam { position: absolute; right: -2px; bottom: -2px; width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; background: var(--solid); color: var(--on-solid); }
</style>
