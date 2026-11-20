<script>
	import '../app.css';
	import { page } from '$app/state';
	import { persist } from '../lib/store.svelte.js';
	import { init } from '../lib/cloud.svelte.js';
	import Icon from '../lib/Icon.svelte';

	let { children } = $props();
	$effect(persist);
	init();

	const tabs = [['/', 'home', 'Home'], ['/learn', 'book', 'Learn'], ['/add', 'plus', 'Add material'], ['/bank', 'layers', 'Word bank'], ['/chat', 'chat', 'Chat']];
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
		background: rgba(30, 24, 36, 0.72); backdrop-filter: blur(24px) saturate(1.4); -webkit-backdrop-filter: blur(24px) saturate(1.4);
		box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.7);
	}
	a { width: 54px; height: 50px; border-radius: 999px; display: grid; place-items: center; color: var(--dim); transition: background 0.25s, color 0.25s, transform 0.12s; }
	a:active { transform: scale(0.9); }
	a.on { background: #fff; color: #17121c; }
	a span { display: none; }
	/* desktop: the pill becomes a side rail with labels */
	@media (min-width: 900px) {
		nav { left: 24px; top: 50%; bottom: auto; transform: translateY(-50%); flex-direction: column; border-radius: 30px; padding: 10px; gap: 6px; }
		a { width: 196px; height: 52px; display: flex; align-items: center; gap: 14px; padding: 0 20px; font-weight: 500; font-size: 15px; }
		a span { display: inline; }
		a:hover:not(.on) { background: var(--glass2); color: var(--ink); }
	}
</style>
