<script>
	import Icon from '../../lib/Icon.svelte';
	import Conj from '../../lib/Conj.svelte';
	import { S } from '../../lib/store.svelte.js';
	import { UNITS } from '../../lib/content.js';
	import { norm } from '../../lib/quiz.js';
	import { meta, pack, t } from '../../lib/lang.js';

	// Grammar and conjugation in one place: look up any verb, and every explanation from the course as a reference.
	const zh = meta.locale.startsWith('zh');
	let verb = $state('');
	let asked = $state(null); // the verb being looked up, as a word-like object
	let q = $state('');

	const mine = $derived(S.words.filter((w) => w.pos === 'verb').slice(0, 60));
	const strip = (html) => html.replace(/<[^>]+>/g, ' ');
	// every explanation card in the course, grouped by chapter and lesson
	const topics = UNITS.map((u, i) => ({ n: i + 1, title: u.title, lessons: u.lessons.map((l) => ({ id: l.id, title: l.title, cards: l.steps.filter((x) => x.kind === 'info') })).filter((l) => l.cards.length) }));
	const found = $derived(
		!q.trim() ? topics
			: topics.map((u) => ({ ...u, lessons: u.lessons.map((l) => ({ ...l, cards: l.cards.filter((c) => norm(c.title + ' ' + strip(c.body)).includes(norm(q))) })).filter((l) => l.cards.length) })).filter((u) => u.lessons.length)
	);
	const look = (w) => (asked = w ? { ...w } : { pt: verb.trim(), en: '' });
</script>

<header class="head">
	<a class="icon-btn" href="/learn" aria-label="Back"><Icon name="back" /></a>
	<a class="btn sm" href="/drill"><Icon name="bolt" size={16} /> {t.drill}</a>
</header>

<div class="stack rise">
	<div>
		<p class="eyebrow">{meta.name}</p>
		<h1>Grammar</h1>
	</div>

	<section class="card stack">
		<h3>{zh ? 'How a verb is used' : 'Conjugate a verb'}</h3>
		<form class="row" onsubmit={(e) => { e.preventDefault(); if (verb.trim()) look(); }}>
			<input class="grow" type="text" bind:value={verb} lang={meta.locale} placeholder={zh ? 'A verb, for example 吃' : 'Any verb, in any form'} autocapitalize="off" autocomplete="off" />
			<button class="btn sm primary" disabled={!verb.trim()}>Look up</button>
		</form>
		{#if mine.length}
			<div class="chips verbs">{#each mine as w (w.id)}<button class="chip" class:on={asked?.id === w.id} onclick={() => look(w)}>{w.pt}</button>{/each}</div>
		{/if}
		{#if asked}
			{#key asked.id || asked.pt}
				{@const own = S.words.find((w) => w.id === asked.id)}
				<div class="stack" style="gap:8px">
					<b lang={meta.locale}>{(own || asked).conj?.verb || asked.pt}{#if asked.en}<small class="dim"> · {asked.en}</small>{/if}</b>
					<Conj word={own || asked} />
				</div>
			{/key}
		{/if}
	</section>

	<section class="stack" style="gap:12px">
		<div>
			<p class="eyebrow">Reference</p>
			<p class="dim small" style="margin-top:6px">Every explanation from the course, by chapter. Tap one to open it.</p>
		</div>
		<input type="text" bind:value={q} placeholder="Search the grammar, for example subjunctive" />
		{#each found as u}
			<div class="stack" style="gap:8px">
				<p class="small dim">Chapter {u.n} · {u.title}</p>
				{#each u.lessons as l}
					{#each l.cards as c}
						<details class="card">
							<summary><b>{c.title}</b><small class="dim">{l.title}</small></summary>
							<div class="body">{@html c.body}</div>
							<a class="btn sm" href="/lesson?id={l.id}">Practice this in the lesson</a>
						</details>
					{/each}
				{/each}
			</div>
		{:else}
			<p class="dim">Nothing matches. Try another word.</p>
		{/each}
	</section>
</div>

<style>
	h3 { color: var(--ink); }
	.verbs { max-height: 120px; overflow-y: auto; }
	details { padding: 14px 18px; border-radius: 22px; }
	summary { cursor: pointer; list-style: none; display: grid; gap: 2px; }
	summary::-webkit-details-marker { display: none; }
	summary b { font-weight: 500; }
	.body { margin: 12px 0; line-height: 1.65; color: var(--dim); }
	.body :global(b) { color: var(--ink); font-weight: 500; }
</style>
