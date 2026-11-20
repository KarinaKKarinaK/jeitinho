<script>
	import '../app.css';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { S, persist } from '../lib/store.svelte.js';
	import { applyTheme, unlock } from '../lib/prefs.js';
	import { today } from '../lib/fx.js';
	import { init } from '../lib/cloud.svelte.js';
	import Icon from '../lib/Icon.svelte';

	let { children } = $props();
	$effect(persist);
	init();
	applyTheme();
	unlock();

	// Active minutes: a minute counts when the app is on screen and you touched it in the last minute.
	onMount(() => {
		let last = Date.now();
		const touch = () => (last = Date.now());
		for (const ev of ['pointerdown', 'keydown', 'scroll']) addEventListener(ev, touch, { passive: true });
		const timer = setInterval(() => {
			if (document.hidden || Date.now() - last > 60000) return;
			const d = today();
			S.mins[d] = (S.mins[d] || 0) + 1;
			for (const k of Object.keys(S.mins).sort().slice(0, -400)) delete S.mins[k]; // keep about a year
		}, 60000);
		return () => clearInterval(timer);
	});

	const tabs = [['/', 'home', 'Home'], ['/learn', 'book', 'Learn'], ['/add', 'plus', 'Add material'], ['/bank', 'layers', 'Word bank'], ['/chat', 'chat', 'Chat'], ['/settings', 'gear', 'Settings']];
	const path = $derived(page.url.pathname.replace(/\/$/, '') || '/');
	const immersive = $derived(['/lesson', '/quiz', '/drill', '/checkpoint', '/speak', '/welcome'].includes(path));
</script>

<div class="bg"></div>
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
	nav {
		position: fixed; left: 50%; bottom: calc(env(safe-area-inset-bottom) + 14px); transform: translateX(-50%); z-index: 10;
		display: flex; gap: 4px; padding: 6px; border-radius: 999px; border: 1px solid var(--line);
		background: var(--nav); backdrop-filter: blur(24px) saturate(1.4); -webkit-backdrop-filter: blur(24px) saturate(1.4);
		box-shadow: 0 18px 40px -12px var(--shadow);
	}
	a { width: 50px; height: 50px; border-radius: 999px; display: grid; place-items: center; color: var(--dim); transition: background 0.25s, color 0.25s, transform 0.12s; }
	a:active { transform: scale(0.9); }
	a.on { background: var(--solid); color: var(--on-solid); }
	a span { display: none; }
	/* desktop: the pill becomes a side rail with labels */
	@media (min-width: 900px) {
		nav { left: 24px; top: 50%; bottom: auto; transform: translateY(-50%); flex-direction: column; border-radius: 30px; padding: 10px; gap: 6px; }
		a { width: 196px; height: 52px; display: flex; align-items: center; gap: 14px; padding: 0 20px; font-weight: 500; font-size: 15px; }
		a span { display: inline; }
		a:hover:not(.on) { background: var(--glass2); color: var(--ink); }
	}
</style>
