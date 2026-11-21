<script>
	import Exercise from '../../lib/Exercise.svelte';
	import Icon from '../../lib/Icon.svelte';
	import { S, addXP, removeFix } from '../../lib/store.svelte.js';
	import { cloud } from '../../lib/cloud.svelte.js';
	import { speak } from '../../lib/fx.js';
	import { fixQ } from '../../lib/quiz.js';
	import { meta } from '../../lib/lang.js';

	// Sentences the chat corrected. See what kind of mistake you make most, then practise the right versions:
	// type each one, and say it aloud when speech recognition is set up.
	let steps = $state(null);
	const counts = $derived(Object.entries(S.fixes.reduce((n, f) => ({ ...n, [f.kind || 'other']: (n[f.kind || 'other'] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1]));

	function practise() {
		const pick = $state.snapshot(S.fixes).sort(() => Math.random() - 0.5).slice(0, 6);
		steps = pick.flatMap((f) => [fixQ(f), ...(cloud.stt ? [{ kind: 'say', prompt: f.fix, sub: 'Now say the right version', speak: f.fix, answer: f.fix, explain: f.tip }] : [])]);
	}
	function finish({ right }) {
		addXP(right * 2);
		return right * 2;
	}
</script>

{#if steps}
	<Exercise {steps} back="/chat" onfinish={finish} />
{:else}
	<header class="head">
		<a class="icon-btn" href="/chat" aria-label="Back"><Icon name="back" /></a>
	</header>
	<div class="stack">
		<div>
			<p class="eyebrow">From your chats</p>
			<h1>Your mistakes</h1>
		</div>
		{#if S.fixes.length}
			<div class="chips">{#each counts as [k, n]}<span class="chip">{k} {n}</span>{/each}</div>
			<button class="btn primary wide" onclick={practise}>Practise {Math.min(6, S.fixes.length)} of them</button>
			{#each [...S.fixes].reverse() as f (f.id)}
				<div class="card fix">
					<p class="dim bad">{f.bad}</p>
					<p lang={meta.locale}>{f.fix}</p>
					{#if f.tip}<p class="dim small">{f.tip}</p>{/if}
					<div class="row">
						{#if f.kind}<span class="eyebrow grow">{f.kind}</span>{:else}<span class="grow"></span>{/if}
						<button class="icon-btn sm" onclick={() => speak(f.fix)} aria-label="Hear the right version"><Icon name="sound" size={16} /></button>
						<button class="icon-btn sm" onclick={() => removeFix(f)} aria-label="Remove"><Icon name="trash" size={16} /></button>
					</div>
				</div>
			{/each}
		{:else}
			<p class="dim">Nothing here yet. Chat for a while: every sentence that gets corrected is saved here, and comes back in your daily quiz.</p>
			<a class="btn" href="/chat">Open the chat</a>
		{/if}
	</div>
{/if}

<style>
	.fix { display: grid; gap: 6px; }
	.bad { text-decoration: line-through; }
</style>
