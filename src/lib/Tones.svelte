<script>
	// Pinyin coloured by tone, so the melody of a word is visible at a glance. Other languages: plain text.
	// ponytail: colours one written chunk by its first tone mark; pinyin written without spaces ("xuésheng")
	// gets one colour. Split into syllables if that ever matters.
	import { lang } from './lang.js';
	import { toneOf } from './tone.js';
	let { text = '' } = $props();
</script>

{#if lang === 'zh'}{#each text.split(/(\s+)/) as s}<span class="t{toneOf(s)}">{s}</span>{/each}{:else}{text}{/if}

<style>
	.t1 { color: var(--t1); }
	.t2 { color: var(--t2); }
	.t3 { color: var(--t3); }
	.t4 { color: var(--t4); }
	.t0 { color: var(--dim); }
</style>
