<script>
	import { page } from '$app/state';
	import Exercise from '../../lib/Exercise.svelte';
	import { LESSONS } from '../../lib/content.js';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { cleanSteps } from '../../lib/quiz.js';

	const id = page.url.searchParams.get('id');
	// custom lessons were written by an LLM: always re-sanitise, never render as html
	const steps = LESSONS[id]?.steps || cleanSteps($state.snapshot(S.custom[id]?.steps));

	function finish({ right, total }) {
		const xp = 10 + right * 2;
		S.done[id] = Math.max(S.done[id] || 0, total ? right / total : 1);
		addXP(xp);
		return xp;
	}
</script>

{#if steps.length}
	<Exercise {steps} retry back="/learn" onfinish={finish} />
{:else}
	<div class="stack"><h2>Lesson not found</h2><a class="btn" href="/learn">Back to lessons</a></div>
{/if}
