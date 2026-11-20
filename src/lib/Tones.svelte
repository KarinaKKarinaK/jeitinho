<script>
	// Pinyin coloured by tone, so the melody of a word is visible at a glance. Other languages: plain text.
	import { lang } from './lang.js';
	import { toneOf, syllables } from './tone.js';
	// keep spaces and punctuation as written, colour each syllable
	const SPLIT = (text) => text.split(/(\s+)/).flatMap((chunk) => { const syl = syllables(chunk); return syl.join('') === chunk ? syl : [chunk]; });
	let { text = '' } = $props();
</script>

{#if lang === 'zh'}{#each SPLIT(text) as s}<span class="t{toneOf(s)}">{s}</span>{/each}{:else}{text}{/if}

<style>
	.t1 { color: var(--t1); }
	.t2 { color: var(--t2); }
	.t3 { color: var(--t3); }
	.t4 { color: var(--t4); }
	.t0 { color: var(--dim); }
</style>
