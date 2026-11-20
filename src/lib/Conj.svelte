<script>
	// Conjugation of one verb (for Chinese: its usage patterns). Shown from what is saved on the word,
	// from the language's built-in conjugator when it knows the verb, or looked up once and then kept.
	import { ai } from './fx.js';
	import { S } from './store.svelte.js';
	import { pack, meta } from './lang.js';

	let { word, auto = true } = $props();
	let busy = $state(false);
	let err = $state('');
	const data = $derived(word.conj || pack.conjugate?.(word.pt) || null);

	async function load() {
		if (busy || data) return;
		busy = true;
		err = '';
		try {
			word.conj = await ai('conjugate', { word: word.pt, en: word.en }, S.pass);
		} catch (e) {
			err = e.message;
		}
		busy = false;
	}
	$effect(() => {
		if (auto && !data && !err && navigator.onLine) load();
	});
</script>

<div class="conj">
	{#if data}
		{#if data.note}<p class="dim small">{data.note}</p>{/if}
		<dl lang={meta.locale}>
			{#each data.rows as r}
				<dt>{r.label}</dt>
				<dd>{#each r.forms as f}<span>{f}</span>{/each}</dd>
			{/each}
		</dl>
		{#if word.conj}<p class="dim small">Written by the AI model. Check anything that looks odd.</p>{/if}
	{:else if busy}
		<p class="dim small row"><span class="spin"></span> Looking up the forms...</p>
	{:else}
		{#if err}<p class="err">{err}</p>{/if}
		<button class="btn sm" onclick={load}>{meta.chars && meta.locale.startsWith('zh') ? 'Show how this verb is used' : 'Show the conjugation'}</button>
	{/if}
</div>

<style>
	.conj { display: grid; gap: 8px; }
	dl { margin: 0; display: grid; gap: 10px; }
	dt { font: 500 11px var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--amber); }
	dd { margin: 4px 0 0; display: flex; flex-wrap: wrap; gap: 6px; }
	dd span { padding: 6px 10px; border-radius: 12px; background: var(--glass2); font-size: 15px; }
</style>
