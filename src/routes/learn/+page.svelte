<script>
	import { goto } from '$app/navigation';
	import Icon from '../../lib/Icon.svelte';
	import { UNITS } from '../../lib/content.js';
	import { S, forget } from '../../lib/store.svelte.js';
	import { ai } from '../../lib/fx.js';
	import { t } from '../../lib/lang.js';
	import { chapterOpen, chapterPassed, chapterReady } from '../../lib/roadmap.js';

	// one colour per chapter, cycling: enough to tell chapters apart at a glance without shouting
	const COLORS = ['#d98a5f', '#7fa36b', '#c9a23f', '#7c8fd9', '#c77fa6', '#5aa7a0', '#a487c9'];
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
		{@const total = u.lessons.length}
		{@const done = u.lessons.filter((l) => l.id in S.done).length}
		<section class="stack chapter" class:locked={!open} class:passed style="gap:10px" style:--c={COLORS[i % COLORS.length]}>
			<div>
				<div class="row">
					<span class="num">{#if passed}<Icon name="check" size={18} />{:else if !open}<Icon name="lock" size={16} />{:else}{i + 1}{/if}</span>
					<div class="grow">
						<p class="eyebrow">Chapter {i + 1}{passed ? ' · passed' : open ? '' : ' · locked'}</p>
						<h3 style="margin-top:4px">{u.title}</h3>
					</div>
					<span class="count">{done}/{total}</span>
				</div>
				<div class="prog"><i style:width="{(done / total) * 100}%"></i></div>
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
	.chapter .eyebrow { color: color-mix(in srgb, var(--c) 70%, var(--ink)); }
	.num { width: 44px; height: 44px; flex: none; border-radius: 14px; display: grid; place-items: center; font: 500 17px var(--mono); color: #1f1a17; background: var(--c); box-shadow: 0 8px 20px -10px var(--c); }
	.count { font: 500 12px var(--mono); color: color-mix(in srgb, var(--c) 70%, var(--ink)); }
	.prog { height: 5px; border-radius: 9px; background: color-mix(in srgb, var(--c) 18%, transparent); overflow: hidden; margin-top: 10px; }
	.prog i { display: block; height: 100%; border-radius: 9px; background: var(--c); transition: width 0.5s var(--spring); }
	/* lessons carry their chapter's colour: a tinted icon, filled when done */
	.chapter :global(.item) { border-color: color-mix(in srgb, var(--c) 22%, transparent); background: color-mix(in srgb, var(--c) 7%, var(--card-a)); }
	.chapter :global(.item .dot) { background: color-mix(in srgb, var(--c) 24%, transparent); color: color-mix(in srgb, var(--c) 60%, var(--ink)); }
	.chapter :global(.item.done .dot) { background: var(--c); color: #1f1a17; }
	.chapter .btn.primary { background: var(--c); border-color: var(--c); color: #1f1a17; }
	.chapter.locked { opacity: 1; }
	.chapter.locked .num { background: color-mix(in srgb, var(--c) 30%, var(--bg)); color: color-mix(in srgb, var(--c) 55%, var(--ink)); box-shadow: none; }
	.chapter.locked :global(.item) { opacity: 0.62; }
	.chapter.locked .item { cursor: not-allowed; }
</style>
