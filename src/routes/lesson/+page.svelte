<script>
	import { page } from '$app/state';
	import Exercise from '../../lib/Exercise.svelte';
	import { LESSONS } from '../../lib/content.js';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { cleanSteps, songSteps } from '../../lib/quiz.js';

	const id = page.url.searchParams.get('id');
	// custom lessons were written by an LLM: always re-sanitise, never render as html
	// a song lesson is rebuilt each time from its lyrics, the words you kept from it and the model's own questions
	const song = id?.startsWith('m-') && $state.snapshot(S.materials).find((m) => 'm-' + m.id === id && m.lyrics?.length);
	const steps = song
		? songSteps(song.lyrics, $state.snapshot(S.words).filter((w) => w.src === song.title), $state.snapshot(S.custom[id]?.steps))
		: LESSONS[id]?.steps || cleanSteps($state.snapshot(S.custom[id]?.steps));

	function finish({ right, total }) {
		const xp = 10 + right * 2;
		S.done[id] = Math.max(S.done[id] || 0, total ? right / total : 1);
		addXP(xp);
		return xp;
	}
</script>

{#if steps.length}
	<Exercise {steps} retry back={song ? `/song?id=${song.id}` : '/learn'} onfinish={finish} />
{:else}
	<div class="stack"><h2>Lesson not found</h2><a class="btn" href="/learn">Back to lessons</a></div>
{/if}
