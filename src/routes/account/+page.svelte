<script>
	import Icon from '../../lib/Icon.svelte';
	import { S } from '../../lib/store.svelte.js';
	import { cloud, oauth, signIn, signUp, forgot, setPassword, signOut, pull } from '../../lib/cloud.svelte.js';

	let mode = $state('in');
	let email = $state('');
	let password = $state('');
	let busy = $state(false);
	let err = $state('');
	let msg = $state('');

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
	const when = $derived(cloud.at ? new Date(cloud.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
</script>

<header class="head">
	<a class="icon-btn" href="/" aria-label="Back"><Icon name="back" /></a>
</header>

<div class="stack rise">
	{#if !cloud.ready}
		<div class="spin"></div>
	{:else if cloud.status === 'off'}
		<p class="eyebrow">Conta</p>
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
		<p class="eyebrow">Conta</p>
		<h1>Tudo salvo</h1>
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
	{:else}
		<p class="eyebrow">Conta</p>
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

	{#if err}<p class="err" role="alert">{err}</p>{/if}
	{#if msg}<p style="color:var(--ok)" role="status">{msg}</p>{/if}
</div>

<style>
	input[type='email'] { width: 100%; padding: 16px 18px; border-radius: 20px; border: 1px solid var(--line); background: rgba(0, 0, 0, 0.25); color: var(--ink); font: 400 17px var(--font); outline: none; }
	input[type='email']:focus { border-color: var(--rose); }
	.or { display: flex; align-items: center; gap: 12px; color: var(--faint); font: 400 11px var(--mono); letter-spacing: 0.1em; text-transform: uppercase; margin: 6px 0; }
	.or::before, .or::after { content: ''; flex: 1; height: 1px; background: var(--line); }
	.dot { width: 46px; height: 46px; flex: none; border-radius: 50%; background: var(--glass2); display: grid; place-items: center; }
	b { display: block; font-weight: 500; overflow-wrap: anywhere; }
	.link { background: none; border: 0; padding: 0; color: var(--dim); font: 400 14px var(--font); text-align: left; cursor: pointer; }
	.link:disabled { opacity: 0.5; }
</style>
