<script>
	import Icon from '../../lib/Icon.svelte';
	import Exercise from '../../lib/Exercise.svelte';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { TENSES } from '../../lib/conj.js';
	import { conjPool, fromKey } from '../../lib/quiz.js';

	let steps = $state(null);
	let pair = $state(true);

	function toggle(t) {
		S.drill = S.drill.includes(t) ? S.drill.filter((x) => x !== t) : [...S.drill, t];
	}

	function start() {
		const pool = conjPool(S, Date.now(), S.drill, pair ? [0, 1] : [0, 1, 2, 3]).sort(() => Math.random() - 0.5);
		const seen = new Set();
		// in eu vs você mode, ask both forms of the same verb back to back
		const keys = pair
			? pool.filter((c) => !seen.has(c.group) && seen.add(c.group)).slice(0, 5).flatMap((c) => [0, 1].map((p) => `conj:${c.group}:${p}`))
			: pool.slice(0, 10).map((c) => c.key);
		steps = keys.map((k) => fromKey(S, k));
	}

	function finish({ right }) {
		addXP(right * 2);
		return right * 2;
	}
</script>

{#if steps}
	<Exercise {steps} retry back="/" onfinish={finish} />
{:else}
	<header class="head">
		<a class="icon-btn" href="/" aria-label="Back"><Icon name="back" /></a>
	</header>
	<div class="stack rise">
		<p class="eyebrow">Drill de verbos</p>
		<h1>Which tenses?</h1>
		<div class="chips">
			{#each Object.entries(TENSES) as [k, t]}
				<button class="chip" class:on={S.drill.includes(k)} onclick={() => toggle(k)}>{t.name}</button>
			{/each}
		</div>
		<div class="tabs" style="align-self:flex-start">
			<button class:on={pair} onclick={() => (pair = true)}>eu vs você</button>
			<button class:on={!pair} onclick={() => (pair = false)}>All persons</button>
		</div>
		<p class="dim">Ten quick questions. Each one gives you a time cue (Ontem, Se, Quando) so the tense becomes a reflex, and missed ones come back at the end.</p>
		<button class="btn primary wide" disabled={!S.drill.length} onclick={start}>Começar</button>
	</div>
{/if}
