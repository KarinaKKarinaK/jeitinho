<script>
	import { goto } from '$app/navigation';
	import Icon from '../../lib/Icon.svelte';
	import { UNITS } from '../../lib/content.js';
	import { S, forget } from '../../lib/store.svelte.js';
	import { ai } from '../../lib/fx.js';
	import { t } from '../../lib/lang.js';
	import { chapterOpen, chapterPassed, chapterReady } from '../../lib/roadmap.js';

	let topic = $state('');
	let lvl = $state('B1');
	let busy = $state(false);
	let err = $state('');
	const custom = $derived(Object.entries(S.custom).reverse());

	async function make() {
		busy = true;
		err = '';
		try {
			const l = await ai('lesson', { topic, level: lvl }, S.pass);
			const id = 'ai-' + Date.now();
			S.custom[id] = l;
			goto(`/lesson?id=${id}`);
		} catch (e) {
			err = e.message;
		}
		busy = false;
	}
</script>

<header class="head">
	<h1>{t.learnTitle}</h1>
	<a class="btn sm" href="/grammar"><Icon name="book" size={16} /> Grammar</a>
</header>

<div class="stack rise cols">
	{#each UNITS as u, i}
		{@const open = chapterOpen(S, i)}
		{@const passed = chapterPassed(S, i)}
		<section class="stack chapter" class:locked={!open} style="gap:10px">
			<div>
				<p class="eyebrow">Chapter {i + 1}{passed ? ' · passed' : open ? '' : ' · locked'}</p>
				<h3 style="margin-top:6px">{u.title}</h3>
				<p class="dim small">{open ? u.sub : `Pass the chapter ${i} quiz to open this.`}</p>
			</div>
			{#each u.lessons as l}
				{#if open}
					<a class="item" class:done={l.id in S.done} href="/lesson?id={l.id}">
						<span class="dot"><Icon name={l.id in S.done ? 'check' : 'book'} /></span>
						<span class="grow"><b>{l.title}</b><small>{l.sub}</small></span>
						<small>{l.steps.length}</small>
						<Icon name="chev" size={18} />
					</a>
				{:else}
					<div class="item" aria-disabled="true">
						<span class="dot"><Icon name="lock" size={18} /></span>
						<span class="grow"><b>{l.title}</b><small>{l.sub}</small></span>
					</div>
				{/if}
			{/each}
			{#if open && !passed}
				{#if chapterReady(S, i)}
					<a class="btn primary" href="/chapter?i={i}">Take the chapter {i + 1} quiz</a>
				{:else}
					<p class="dim small">Finish these lessons, then pass a 10-question quiz to open chapter {i + 2 > UNITS.length ? i + 1 : i + 2}.</p>
				{/if}
			{:else if passed}
				<a class="btn sm" style="align-self:flex-start" href="/chapter?i={i}">Retake the quiz</a>
			{/if}
		</section>
	{/each}

	<section class="card stack">
		<p class="eyebrow">{t.custom}</p>
		<h2>Any topic, any level</h2>
		<input type="text" bind:value={topic} placeholder="e.g. ordering food, a grammar point you keep missing" maxlength="200" />
		<div class="chips">
			{#each ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as l}<button class="chip" class:on={lvl === l} onclick={() => (lvl = l)}>{l}</button>{/each}
		</div>
		<button class="btn primary" onclick={make} disabled={busy}>{#if busy}<span class="spin"></span> Writing...{:else}Create lesson{/if}</button>
		{#if err}<p class="err">{err}</p>{/if}
	</section>

	{#if custom.length}
		<section class="stack" style="gap:10px">
			<p class="eyebrow">{t.yours}</p>
			{#each custom as [id, l]}
				<div class="row">
					<a class="item grow" class:done={id in S.done} href="/lesson?id={id}">
						<span class="dot"><Icon name={id in S.done ? 'check' : id.startsWith('m-') ? 'music' : 'bolt'} /></span>
						<span class="grow"><b>{l.title}</b></span>
						<Icon name="chev" size={18} />
					</a>
					<button class="icon-btn sm" aria-label="Delete lesson" onclick={() => { forget(id); delete S.custom[id]; }}><Icon name="trash" size={16} /></button>
				</div>
			{/each}
		</section>
	{/if}
</div>

<style>
	.chapter h3 { color: var(--ink); }
	.chapter.locked { opacity: 0.55; }
	.chapter.locked .item { cursor: not-allowed; }
</style>
