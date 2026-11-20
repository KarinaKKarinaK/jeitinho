<script>
	import Exercise from '../../lib/Exercise.svelte';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { current, ready, buildTest, passed } from '../../lib/roadmap.js';
	import { today } from '../../lib/fx.js';

	const plain = $state.snapshot(S);
	const stage = current(plain);
	const steps = stage && ready(plain, stage) ? buildTest(plain, stage) : [];

	function finish({ right, total }) {
		const ok = passed(stage, right, total);
		if (ok) S.badges[stage.id] = today();
		const xp = ok ? 100 : right;
		addXP(xp);
		return { xp, title: ok ? `${stage.id} conquistado!` : `Precisa de ${Math.ceil(stage.pass * total)}. Tenta de novo!` };
	}
</script>

{#if steps.length}
	<Exercise {steps} back="/roadmap" onfinish={finish} />
{:else}
	<div class="stack"><h2>Not unlocked yet</h2><p class="dim">Finish the milestones for this stage first.</p><a class="btn" href="/roadmap">Back to the roadmap</a></div>
{/if}
