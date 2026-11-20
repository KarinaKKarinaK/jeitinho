<script>
	import { goto } from '$app/navigation';
	import Icon from '../../lib/Icon.svelte';
	import { UNITS } from '../../lib/content.js';
	import { S } from '../../lib/store.svelte.js';
	import { ai } from '../../lib/fx.js';

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
	<h1>Aprender</h1>
	<span class="dim small">{Object.keys(S.done).length} done</span>
</header>

<div class="stack rise">
	{#each UNITS as u}
		<section class="stack" style="gap:10px">
			<div>
				<p class="eyebrow">{u.title}</p>
				<p class="dim small" style="margin-top:6px">{u.sub}</p>
			</div>
			{#each u.lessons as l}
				<a class="item" class:done={l.id in S.done} href="/lesson?id={l.id}">
					<span class="dot"><Icon name={l.id in S.done ? 'check' : 'book'} /></span>
					<span class="grow"><b>{l.title}</b><small>{l.sub}</small></span>
					<small>{l.steps.length}</small>
					<Icon name="chev" size={18} />
				</a>
			{/each}
		</section>
	{/each}

	<section class="card stack">
		<p class="eyebrow">Lição sob medida</p>
		<h2>Any topic, any level</h2>
		<input type="text" bind:value={topic} placeholder="e.g. ordering at a boteco, por vs para" maxlength="200" />
		<div class="chips">
			{#each ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as l}<button class="chip" class:on={lvl === l} onclick={() => (lvl = l)}>{l}</button>{/each}
		</div>
		<button class="btn primary" onclick={make} disabled={busy}>{#if busy}<span class="spin"></span> Writing...{:else}Create lesson{/if}</button>
		{#if err}<p class="err">{err}</p>{/if}
	</section>

	{#if custom.length}
		<section class="stack" style="gap:10px">
			<p class="eyebrow">Suas lições</p>
			{#each custom as [id, l]}
				<div class="row">
					<a class="item grow" class:done={id in S.done} href="/lesson?id={id}">
						<span class="dot"><Icon name={id in S.done ? 'check' : id.startsWith('m-') ? 'music' : 'bolt'} /></span>
						<span class="grow"><b>{l.title}</b></span>
						<Icon name="chev" size={18} />
					</a>
					<button class="icon-btn sm" aria-label="Delete lesson" onclick={() => delete S.custom[id]}><Icon name="trash" size={16} /></button>
				</div>
			{/each}
		</section>
	{/if}
</div>
