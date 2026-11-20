<script>
	// A Chinese word is built from characters that each mean something: 朋 friend + 友 friend.
	// Shown only for Mandarin words of two or more characters, when every character is known.
	import { lang, meta } from './lang.js';
	import { hanzi } from './zhdata.js';
	import Tones from './Tones.svelte';
	let { word = '' } = $props();
	let dict = $state(null);
	if (lang === 'zh') hanzi().then((d) => (dict = d));
	const parts = $derived.by(() => {
		const cs = [...word].filter((c) => /\p{Script=Han}/u.test(c));
		if (!dict || cs.length < 2 || cs.length > 6) return [];
		const out = cs.map((c) => ({ c, say: dict[c]?.[0], en: dict[c]?.[1] }));
		return out.every((p) => p.en) ? out : [];
	});
</script>

{#if parts.length}
	<p class="built">{#each parts as p, i}{#if i}<span class="plus">+</span>{/if}<span class="part"><b lang={meta.locale}>{p.c}</b> <em><Tones text={p.say} /></em> <span>{p.en}</span></span>{/each}</p>
{/if}

<style>
	.built { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; font-size: 13px; color: var(--dim); }
	.part { white-space: nowrap; }
	b { font-weight: 500; font-size: 17px; color: var(--ink); }
	em { font: 400 12px var(--mono); font-style: normal; }
	.plus { color: var(--faint); }
</style>
