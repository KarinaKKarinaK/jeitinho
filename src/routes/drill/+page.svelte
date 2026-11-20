<script>
	import Icon from '../../lib/Icon.svelte';
	import Exercise from '../../lib/Exercise.svelte';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { fromKey } from '../../lib/quiz.js';
	import { pack, t } from '../../lib/lang.js';

	const D = pack.drill;

	let steps = $state(null);
	let pair = $state(!!D.pair);

	function toggle(t) {
		S.drill = S.drill.includes(t) ? S.drill.filter((x) => x !== t) : [...S.drill, t];
	}

	function start() {
		const pool = D.pool(S.drill, pair).sort(() => Math.random() - 0.5);
		const seen = new Set();
		// in pair mode (Portuguese eu vs você), ask both forms of the same verb back to back
		const keys = pair
			? pool.filter((c) => !seen.has(c.group) && seen.add(c.group)).slice(0, 5).flatMap((c) => D.pair.keys(c.group))
			: pool.slice(0, 10).map((c) => c.key);
		steps = keys.map((k) => fromKey(S, k)).filter(Boolean);
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
		<p class="eyebrow">{t.drillEyebrow}</p>
		<h1>{t.drillQ}</h1>
		<div class="chips">
			{#each Object.entries(D.groups) as [k, g]}
				<button class="chip" class:on={S.drill.includes(k)} onclick={() => toggle(k)}>{g.name}</button>
			{/each}
		</div>
		{#if D.pair}
			<div class="tabs" style="align-self:flex-start">
				<button class:on={pair} onclick={() => (pair = true)}>{D.pair.on}</button>
				<button class:on={!pair} onclick={() => (pair = false)}>{D.pair.off}</button>
			</div>
		{/if}
		<p class="dim">{t.drillBlurb}</p>
		<button class="btn primary wide" disabled={!S.drill.length} onclick={start}>{t.start}</button>
	</div>
{/if}
