<script>
	import Icon from '../../lib/Icon.svelte';
	import { S } from '../../lib/store.svelte.js';
	import { current, earned, forecast, masteredCount } from '../../lib/roadmap.js';
	import { meta } from '../../lib/lang.js';
	import { today, DAY } from '../../lib/fx.js';
	import { cloud, oauth, signIn, signUp, forgot, setPassword, signOut, pull, wipe } from '../../lib/cloud.svelte.js';

	let mode = $state('in');
	let email = $state('');
	let password = $state('');
	let busy = $state(false);
	let err = $state('');
	let msg = $state('');
	let armed = $state(false); // deleting takes two taps

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
	const WEEKS = 18;
	const end = new Date();
	// columns are weeks, rows are weekdays; the last column ends today
	const cells = Array.from({ length: WEEKS * 7 }, (_, i) => {
		const d = new Date(end.getTime() - (WEEKS * 7 - 1 - i - (6 - end.getDay())) * DAY);
		return { key: today(d), future: d > end, label: d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) };
	});
	const shade = (m) => (m >= 30 ? 4 : m >= 15 ? 3 : m >= 5 ? 2 : m > 0 ? 1 : 0);
	const total = $derived(Object.values(S.mins || {}).reduce((a, b) => a + b, 0));
	const activeDays = $derived(Object.values(S.mins || {}).filter((m) => m > 0).length);
	const when = $derived(cloud.at ? new Date(cloud.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
</script>

<header class="head">
	<a class="icon-btn" href="/" aria-label="Back"><Icon name="back" /></a>
</header>

<div class="stack rise">
	{#if cloud.ready && !cloud.recovery}
		<div class="card stack prog">
			<p class="eyebrow">{meta.name}</p>
			<div class="row">
				<span class="lvl">{badge?.id || '0'}</span>
				<span class="grow"><b>{badge ? `Level ${badge.id}: ${badge.title}` : 'No badge yet'}</b><small class="dim">{stage ? `Working toward ${stage.id}` : 'Every badge earned'} · {S.xp} XP · {masteredCount(S)} words mastered</small></span>
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
			<div class="map" role="img" aria-label="Minutes studied per day over the last {WEEKS} weeks">
				{#each cells as c}
					<i class="s{c.future ? 'x' : shade(S.mins?.[c.key] || 0)}" title="{c.label}: {Math.round(S.mins?.[c.key] || 0)} min"></i>
				{/each}
			</div>
			<p class="dim small row" style="gap:6px">{Math.round(total)} minutes on {activeDays} {activeDays === 1 ? 'day' : 'days'} <span class="grow"></span> less <i class="s0 k"></i><i class="s1 k"></i><i class="s2 k"></i><i class="s3 k"></i><i class="s4 k"></i> more</p>
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
	/* activity map: weeks left to right, Sunday at the top */
	.map { display: grid; grid-template-rows: repeat(7, 1fr); grid-auto-flow: column; grid-auto-columns: 1fr; gap: 3px; }
	.map i, .k { display: block; aspect-ratio: 1; border-radius: 4px; background: var(--glass2); }
	.k { width: 12px; flex: none; }
	.s1 { background: color-mix(in srgb, var(--rose) 35%, var(--glass2)) !important; }
	.s2 { background: color-mix(in srgb, var(--rose) 60%, var(--glass2)) !important; }
	.s3 { background: color-mix(in srgb, var(--rose) 85%, var(--glass2)) !important; }
	.s4 { background: var(--lime) !important; }
	.sx { visibility: hidden; }
</style>
