<script>
	import Exercise from '../../lib/Exercise.svelte';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { current, ready, buildTest, passed, levelName } from '../../lib/roadmap.js';
	import { today } from '../../lib/fx.js';
	import { cloud } from '../../lib/cloud.svelte.js';
	import { t } from '../../lib/lang.js';

	const plain = $state.snapshot(S);
	const stage = current(plain);
	const open = stage && ready(plain, stage);
	// wait until we know whether writing and speaking tasks can be graded, then build the test once
	let steps = $state(null);
	$effect(() => {
		if (cloud.ready && !steps) steps = open ? buildTest(plain, stage, { ai: cloud.ai, stt: cloud.stt }) : [];
	});

	function finish({ right, total }) {
		const ok = passed(stage, right, total);
		if (ok) S.badges[stage.id] = today();
		const xp = ok ? 100 : right;
		addXP(xp);
		return { xp, title: ok ? `${levelName(stage)} ${t.won}` : t.need(Math.ceil(stage.pass * total)) };
	}
</script>

{#if !steps}
	<span class="spin"></span>
{:else if steps.length}
	<Exercise {steps} back="/roadmap" onfinish={finish} />
{:else}
	<div class="stack"><h2>Not unlocked yet</h2><p class="dim">Finish the milestones for this stage first.</p><a class="btn" href="/roadmap">Back to the roadmap</a></div>
{/if}
