<script>
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import Icon from '../../lib/Icon.svelte';
	import { S, addXP, addWords } from '../../lib/store.svelte.js';
	import { grade, norm } from '../../lib/quiz.js';
	import { speak, today } from '../../lib/fx.js';
	import { t } from '../../lib/lang.js';
	import { cloud, photoUrl, dropPhoto } from '../../lib/cloud.svelte.js';

	let tab = $state(page.url.searchParams.get('tab') || 'words');
	let q = $state('');
	let open = $state(null);
	let flip = $state(false);
	let np = $state('');
	let ne = $state('');
	let now = $state(Date.now());

	const shown = $derived(S.words.filter((w) => !q || norm(w.pt + ' ' + w.en).includes(norm(q))));
	// due = overdue reviews first, then words never reviewed
	const due = $derived(S.words.filter((w) => w.due <= now).sort((a, b) => b.reps - a.reps || a.due - b.due));
	const card = $derived(due[0]);

	function rate(g) {
		grade(card, g);
		addXP(1);
		flip = false;
		now = Date.now();
	}
	function add() {
		if (addWords([{ pt: np.trim(), en: ne.trim() }], 'manual')) np = ne = '';
	}
	function anki() {
		// tab-separated file that Anki imports directly: front, back, example
		const tsv = S.words.map((w) => [w.pt, w.en, `${w.ex} ${w.exEn}`.trim()].map((c) => c.replace(/[\t\n]/g, ' ')).join('\t')).join('\n');
		const a = document.createElement('a');
		a.href = URL.createObjectURL(new Blob([tsv], { type: 'text/tab-separated-values' }));
		a.download = `jeitinho-anki-${today()}.txt`;
		a.click();
	}
</script>

<header class="head">
	<h1>{t.bank}</h1>
	<div class="tabs">
		{#each [['words', 'Words'], ['review', `Review ${due.length || ''}`], ['saved', 'Saved']] as [k, label]}
			<button class:on={tab === k} onclick={() => (tab = k)}>{label}</button>
		{/each}
	</div>
</header>

{#if tab === 'review'}
	{#if card}
		{#key card.id}
			<div class="stack" in:fly={{ y: 16, duration: 220 }}>
				<button class="card flash" onclick={() => { flip = true; speak(card.pt); }}>
					<p class="eyebrow">{card.reps ? 'Review' : 'New word'}</p>
					<h2>{card.en}</h2>
					{#if flip}
						<div class="back" in:fly={{ y: 10, duration: 200 }}>
							<h1>{card.pt}</h1>
							{#if card.say}<p class="say">{card.say}</p>{/if}
							{#if card.ex}<p>{card.ex}</p><p class="dim small">{card.exEn}</p>{/if}
						</div>
					{:else}
						<p class="dim small">Say it out loud, then tap to check</p>
					{/if}
				</button>
				{#if flip}
					<div class="grades">
						{#each [['De novo', 0, 'var(--bad)'], ['Difícil', 1, 'var(--amber)'], ['Bom', 2, 'var(--ok)'], ['Fácil', 3, 'var(--lime)']] as [label, g, c]}
							<button class="btn" style:color={c} onclick={() => rate(g)}>{label}</button>
						{/each}
					</div>
				{/if}
				<p class="dim small" style="text-align:center">{due.length} left</p>
			</div>
		{/key}
	{:else}
		<div class="card stack" style="text-align:center"><h2>{t.allDone}</h2><p class="dim">Nothing due. Add words from a song or an article.</p><a class="btn primary" href="/add">Add material</a></div>
	{/if}
{:else if tab === 'saved'}
	<div class="stack">
		{#each S.materials as m, i (m.id)}
			<details class="card">
				<summary><span class="eyebrow">{m.type} · {m.date}</span><b>{m.title}</b></summary>
				<div class="stack" style="margin-top:14px">
					{#if m.img && cloud.user}{#await photoUrl(m.img) then src}{#if src}<img {src} alt="Your lesson notes" loading="lazy" style="width:100%;border-radius:18px" />{/if}{/await}{/if}
					{#if m.summary}<p class="dim">{m.summary}</p>{/if}
					{#each m.notes || [] as n}<p class="small">{n}</p>{/each}
					{#if m.lyrics}
						<div class="lyrics">{#each m.lyrics as l}<p>{l.pt}<span>{l.en}</span></p>{/each}</div>
					{/if}
					{#if m.text}<p class="small dim" style="white-space:pre-wrap">{m.text}</p>{/if}
					<div class="chips">
						{#if S.custom['m-' + m.id]}<a class="btn sm primary" href="/lesson?id=m-{m.id}">Start lesson</a>{/if}
						{#if m.url}<a class="btn sm" href={m.url} target="_blank" rel="noopener noreferrer">Open link</a>{/if}
						<button class="btn sm" onclick={() => { if (m.img) dropPhoto(m.img); S.materials.splice(i, 1); }}>Delete</button>
					</div>
				</div>
			</details>
		{:else}
			<div class="card stack" style="text-align:center"><h2>Nothing saved yet</h2><p class="dim">Links, songs and photos of your lesson notes land here.</p><a class="btn primary" href="/add">Add material</a></div>
		{/each}
	</div>
{:else}
	<div class="stack">
		<input type="text" bind:value={q} placeholder="Search {S.words.length} words" />
		{#each shown.slice(0, 80) as w (w.id)}
			<div class="card word">
				<button class="row" onclick={() => (open = open === w.id ? null : w.id)}>
					<span class="grow"><b>{w.pt}</b><small>{w.en}</small></span>
					<span class="lvl" title="Review interval in days">{w.ivl ? w.ivl + 'd' : 'new'}</span>
				</button>
				{#if open === w.id}
					<div class="stack" style="gap:8px;margin-top:12px" in:fly={{ y: -6, duration: 160 }}>
						{#if w.say}<p class="say">{w.say}</p>{/if}
						{#if w.ex}<p>{w.ex}</p><p class="dim small">{w.exEn}</p>{/if}
						<div class="chips">
							<button class="btn sm" onclick={() => speak(w.ex || w.pt)}><Icon name="sound" size={16} /> Ouvir</button>
							<button class="btn sm" onclick={() => S.words.splice(S.words.indexOf(w), 1)}><Icon name="trash" size={16} /> Remove</button>
						</div>
					</div>
				{/if}
			</div>
		{/each}
		<div class="card stack">
			<p class="eyebrow">Add a word</p>
			<input type="text" bind:value={np} placeholder="Português" autocapitalize="off" />
			<input type="text" bind:value={ne} placeholder="English meaning" />
			<div class="chips">
				<button class="btn sm primary" disabled={!np.trim() || !ne.trim()} onclick={add}>Add</button>
				<button class="btn sm" onclick={anki}>Export for Anki</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.head { flex-wrap: wrap; gap: 12px; }
	.flash { width: 100%; min-height: 300px; text-align: left; color: var(--ink); font: inherit; cursor: pointer; display: flex; flex-direction: column; gap: 14px; }
	.back { display: grid; gap: 8px; margin-top: auto; padding-top: 18px; border-top: 1px solid var(--line); }
	.say { font: 400 13px var(--mono); color: var(--rose); letter-spacing: 0.02em; }
	.grades { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
	.grades .btn { padding: 0; font-size: 14px; }
	.word { padding: 14px 18px; border-radius: 22px; }
	.word .row { width: 100%; background: none; border: 0; padding: 0; color: inherit; font: inherit; text-align: left; cursor: pointer; }
	.word b { display: block; font-weight: 500; font-size: 17px; }
	.word small { color: var(--dim); }
	.lvl { font: 400 11px var(--mono); color: var(--faint); }
	summary { cursor: pointer; display: grid; gap: 8px; list-style: none; }
	summary::-webkit-details-marker { display: none; }
	summary b { font-weight: 500; font-size: 18px; }
	.lyrics p { margin-bottom: 10px; }
	.lyrics span { display: block; color: var(--dim); font-size: 14px; }
</style>
