<script>
	import { goto } from '$app/navigation';
	import Exercise from '../../lib/Exercise.svelte';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { PLACEMENT } from '../../lib/content.js';
	import { place, placementSteps, placementVerdict, retakeAt, RETAKE_DAYS } from '../../lib/roadmap.js';
	import { cloud } from '../../lib/cloud.svelte.js';
	import { today } from '../../lib/fx.js';
	import { lang, meta, t, AVAILABLE, switchLang } from '../../lib/lang.js';

	let band = $state(-1); // -1 intro, 0..n-1 testing, n result
	let passed = $state(0);
	let scores = [];
	const wait = retakeAt(S); // a full retake is allowed every few days
	let stage = $state(null);
	let steps = $state([]);

	// each band draws fresh questions, so a retake is a different test
	function open(i) {
		steps = placementSteps(S, i);
		band = i;
	}

	function done(bands, tested = true) {
		passed = bands;
		if (tested) S.placedAt = Date.now();
		stage = place(S, bands, today());
		if (bands) addXP(bands * 20);
		band = PLACEMENT.length;
	}

	// climb a level at a time; one failed level still gets you a try at the next
	function finish({ right }) {
		scores.push(right);
		const v = placementVerdict(scores, PLACEMENT.length);
		if (v.stop) done(v.bands);
		else open(band + 1);
		return false;
	}
</script>

{#if band === -1}
	<div class="intro stack rise">
		<img src="/icon.svg" alt="" width="84" height="84" />
		<p class="eyebrow">{t.welcome}</p>
		<h1>Where should<br />you start?</h1>
		<div class="chips" role="group" aria-label="Language to learn">
			{#each AVAILABLE as l}<button class="chip" class:on={l.code === lang} onclick={() => l.code !== lang && switchLang(l.code, '/welcome')}>{l.label}</button>{/each}
		</div>
		<p class="dim">A test finds your level in {meta.name}. Six questions per level, two slips allowed, and one weak level still gets you a try at the next. It takes 2 to 8 minutes.</p>
		{#if wait}
			<p class="dim small">You took the test recently. You can retake it on {new Date(wait).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })} (once every {RETAKE_DAYS} days).</p>
			<a class="btn primary wide" href="/">Back</a>
		{:else}
			<button class="btn primary wide" onclick={() => open(0)}>Find my level</button>
			{#if !S.onboarded}<button class="btn wide" onclick={() => { done(0, false); goto('/'); }}>I am new, start from zero</button>{/if}
		{/if}
	</div>
{:else if band < PLACEMENT.length}
	{#key band}
		<Exercise {steps} back="/" onfinish={finish} />
	{/key}
{:else}
	<div class="intro stack rise">
		<div class="badge">{stage.id}</div>
		<p class="eyebrow">Your starting point</p>
		<h1>{stage.title}</h1>
		<p class="dim">{passed ? `You passed level ${PLACEMENT[passed - 1].band}, so the earlier badges are yours and their lessons are marked done. You can still open them.` : 'You start at the beginning. That is the fastest way to get the sounds right.'}</p>
		<p class="dim small">Next goal: {stage.can}.</p>
		<a class="btn primary wide" href="/">{t.start}</a>
		{#if cloud.status === 'out'}<a class="btn wide" href="/account">Save this to an account</a><p class="dim small">Your level is kept on this device, and it moves into your account when you sign up or sign in.</p>{/if}
	</div>
{/if}

<style>
	.intro { flex: 1; justify-content: center; align-items: flex-start; }
	.intro img { border-radius: 24px; box-shadow: 0 24px 50px -20px rgba(201, 130, 190, 0.7); }
	.badge { width: 110px; height: 110px; border-radius: 50%; display: grid; place-items: center; font: 500 26px var(--mono); color: #17121c; background: linear-gradient(150deg, var(--lime), var(--rose)); box-shadow: 0 0 70px -10px rgba(227, 163, 198, 0.7); animation: pop 0.6s cubic-bezier(0.3, 1.6, 0.5, 1); }
	@keyframes pop { from { transform: scale(0.4) rotate(-30deg); opacity: 0; } }
</style>
