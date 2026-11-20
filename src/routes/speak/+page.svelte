<script>
	import Exercise from '../../lib/Exercise.svelte';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { cloud } from '../../lib/cloud.svelte.js';

	// Eight sentences from your own word bank: the ones due for review first, then a random mix.
	const now = Date.now();
	const pool = $state.snapshot(S).words.filter((w) => w.ex).sort((a, b) => (a.due <= now ? 0 : 1) - (b.due <= now ? 0 : 1) || Math.random() - 0.5);
	const steps = pool.slice(0, 8).map((w) => ({ kind: 'say', prompt: w.ex, sub: w.exEn, speak: w.ex, answer: w.ex, explain: `${w.pt} = ${w.en}${w.say ? `\nSay it: ${w.say}` : ''}` }));

	function finish({ right }) {
		const xp = right * 3;
		addXP(xp);
		return xp;
	}
</script>

{#if !cloud.ready}
	<span class="spin"></span>
{:else if !cloud.stt}
	<div class="stack">
		<h2>Speaking practice is not set up</h2>
		<p class="dim">It needs a free Deepgram key on the server (DEEPGRAM_API_KEY). See the README.</p>
		<a class="btn" href="/">Back</a>
	</div>
{:else if !steps.length}
	<div class="stack"><h2>No sentences yet</h2><p class="dim">Add words with example sentences to your bank first.</p><a class="btn" href="/add">Add material</a></div>
{:else}
	<Exercise {steps} back="/" onfinish={finish} />
{/if}
