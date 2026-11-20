<script>
	import '../app.css';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { S, persist } from '../lib/store.svelte.js';
	import { applyTheme, unlock } from '../lib/prefs.js';
	import { today } from '../lib/fx.js';
	import { track } from '../lib/active.js';
	import { lang } from '../lib/lang.js';
	import { init } from '../lib/cloud.svelte.js';
	import Icon from '../lib/Icon.svelte';

	let { children } = $props();
	$effect(persist);
	applyTheme();
	onMount(() => {
		document.getElementById('splash')?.remove(); // the instant placeholder from app.html
		init(); // sign-in and sync start after the first screen is drawn, not before
		// tell the server about crashes (message and place only, nothing about the person), at most 5 a visit
		let sent = 0;
		const send = (message, stack) => sent++ < 5 && navigator.sendBeacon?.('/api/report', new Blob([JSON.stringify({ kind: 'error', lang, path: location.pathname, message: String(message).slice(0, 300), stack: String(stack || '').slice(0, 800) })], { type: 'application/json' }));
		const onErr = (e) => send(e.message, e.error?.stack);
		const onRej = (e) => send(e.reason?.message || e.reason, e.reason?.stack);
		addEventListener('error', onErr);
		addEventListener('unhandledrejection', onRej);
		return () => (removeEventListener('error', onErr), removeEventListener('unhandledrejection', onRej));
	});
	unlock();

	// Active minutes: see src/lib/active.js for what counts. Minutes go to the language you are studying.
	onMount(() =>
		track({
			key: 'jeitinho:active',
			today,
			credit(day, minutes) {
				S.mins[day] = (S.mins[day] || 0) + minutes;
				for (const k of Object.keys(S.mins).sort().slice(0, -400)) delete S.mins[k]; // keep about a year
			}
		})
	);

	// one notice at a time, gone after a few seconds or on tap
	let note = $state(null);
	let noteTimer;
	onMount(() => {
		const show = (e) => {
			note = e.detail;
			clearTimeout(noteTimer);
			noteTimer = setTimeout(() => (note = null), 9000);
		};
		addEventListener('jeitinho:notice', show);
		return () => removeEventListener('jeitinho:notice', show);
	});

	const tabs = [['/', 'home', 'Home'], ['/learn', 'book', 'Learn'], ['/read', 'page', 'Reading'], ['/add', 'plus', 'Add material'], ['/bank', 'layers', 'Word bank'], ['/chat', 'chat', 'Chat'], ['/settings', 'gear', 'Settings']];
	const path = $derived(page.url.pathname.replace(/\/$/, '') || '/');
	const immersive = $derived(['/lesson', '/quiz', '/drill', '/checkpoint', '/speak', '/welcome', '/chapter'].includes(path));
</script>

<div class="bg"></div>
{#if note}
	<button class="notice {note.kind}" role="status" onclick={() => (note = null)}>
		<Icon name={note.kind === 'offline' ? 'x' : note.kind === 'voice' ? 'sound' : 'bolt'} size={18} />
		<span>{note.text}</span>
	</button>
{/if}
<div class="app" class:immersive>
	{@render children()}
</div>

{#if !immersive}
	<nav aria-label="Main">
		{#each tabs as [href, icon, label]}
			<a {href} class:on={path === href} aria-label={label} aria-current={path === href ? 'page' : undefined}><Icon name={icon} /><span>{label}</span></a>
		{/each}
	</nav>
{/if}

<style>
	.notice {
		position: fixed; z-index: 40; top: calc(env(safe-area-inset-top) + 12px); left: 50%; transform: translateX(-50%); width: min(520px, calc(100% - 28px));
		display: flex; gap: 12px; align-items: flex-start; text-align: left; padding: 14px 16px; border-radius: 20px; border: 1px solid color-mix(in srgb, var(--amber) 50%, transparent);
		background: color-mix(in srgb, var(--amber) 14%, var(--bg)); color: var(--ink); font: 400 14px/1.4 var(--font); cursor: pointer;
		box-shadow: 0 16px 40px -14px var(--shadow); animation: drop 0.3s var(--spring);
	}
	.notice :global(svg) { flex: none; color: var(--amber); margin-top: 1px; }
	@keyframes drop { from { transform: translate(-50%, -20px); opacity: 0; } }
	nav {
		position: fixed; left: 50%; bottom: calc(env(safe-area-inset-bottom) + 14px); transform: translateX(-50%); z-index: 10;
		display: flex; gap: 2px; padding: 6px; border-radius: 999px; border: 1px solid var(--line);
		background: var(--nav); backdrop-filter: blur(24px) saturate(1.4); -webkit-backdrop-filter: blur(24px) saturate(1.4);
		box-shadow: 0 18px 40px -12px var(--shadow);
	}
	a { width: 44px; height: 48px; border-radius: 999px; display: grid; place-items: center; color: var(--dim); transition: background 0.25s, color 0.25s, transform 0.12s; }
	a:active { transform: scale(0.9); }
	a.on { background: var(--solid); color: var(--on-solid); }
	a span { display: none; }
	/* desktop: the pill becomes a side rail with labels */
	@media (min-width: 900px) {
		nav { left: 24px; top: 28px; bottom: auto; transform: none; flex-direction: column; border-radius: 30px; padding: 10px; gap: 6px; }
		a { width: 196px; height: 52px; display: flex; align-items: center; gap: 14px; padding: 0 20px; font-weight: 500; font-size: 15px; }
		a span { display: inline; }
		a:hover:not(.on) { background: var(--glass2); color: var(--ink); }
	}
</style>
