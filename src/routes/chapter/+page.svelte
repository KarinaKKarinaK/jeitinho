<script>
	import { page } from '$app/state';
	import Exercise from '../../lib/Exercise.svelte';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { UNITS } from '../../lib/content.js';
	import { chapterOpen, chapterReady, chapterQuiz, passChapter, CHAPTER_PASS } from '../../lib/roadmap.js';
	import { today } from '../../lib/fx.js';

	// The quiz at the end of a chapter. Pass it and the next chapter opens.
	const i = +page.url.searchParams.get('i');
	const unit = UNITS[i];
	const plain = $state.snapshot(S);
	const ok = unit && chapterOpen(plain, i) && chapterReady(plain, i);
	const steps = ok ? chapterQuiz(i) : [];

	function finish({ right, total }) {
		const pass = total > 0 && right / total >= CHAPTER_PASS;
		if (pass) passChapter(S, i, today());
		const xp = pass ? 50 : right;
		addXP(xp);
		return { xp, title: pass ? (UNITS[i + 1] ? `Chapter ${i + 2} unlocked` : 'Course complete') : `You need ${Math.ceil(CHAPTER_PASS * total)} right. Review and try again.` };
	}
</script>

{#if steps.length}
	<Exercise {steps} back="/learn" onfinish={finish} />
{:else}
	<div class="stack"><h2>Not ready yet</h2><p class="dim">Finish every lesson in this chapter first.</p><a class="btn" href="/learn">Back to the chapters</a></div>
{/if}
