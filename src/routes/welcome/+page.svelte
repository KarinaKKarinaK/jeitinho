<script>
	import { goto } from '$app/navigation';
	import Exercise from '../../lib/Exercise.svelte';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { PLACEMENT } from '../../lib/content.js';
	import { place, PASS_BAND } from '../../lib/roadmap.js';
	import { today } from '../../lib/fx.js';

	let band = $state(-1); // -1 intro, 0..n-1 testing, n result
	let passed = $state(0);
	let stage = $state(null);

	function done(bands) {
		stage = place(S, bands, today());
		if (bands) addXP(bands * 20);
		band = PLACEMENT.length;
	}

	// climb one band at a time, stop at the first one not passed
	function finish({ right }) {
		if (right < PASS_BAND) done(passed);
		else if (++passed === PLACEMENT.length) done(passed);
		else band++;
		return false;
	}
</script>

{#if band === -1}
	<div class="intro stack rise">
		<img src="/icon.svg" alt="" width="84" height="84" />
		<p class="eyebrow">Bem-vindo</p>
		<h1>Where should<br />you start?</h1>
		<p class="dim">A short test finds your level. It gets harder as you go and stops when it gets too hard, so it takes 1 to 5 minutes.</p>
		<button class="btn primary wide" onclick={() => (band = 0)}>Find my level</button>
		<button class="btn wide" onclick={() => { done(0); goto('/'); }}>I am new, start from zero</button>
	</div>
{:else if band < PLACEMENT.length}
	{#key band}
		<Exercise steps={PLACEMENT[band].steps} back="/" onfinish={finish} />
	{/key}
{:else}
	<div class="intro stack rise">
		<div class="badge">{stage.id}</div>
		<p class="eyebrow">Your starting point</p>
		<h1>{stage.title}</h1>
		<p class="dim">{passed ? `You cleared ${passed} of ${PLACEMENT.length} levels, so the earlier badges are yours and their lessons are marked done. You can still open them.` : 'You start at the beginning. That is the fastest way to get the sounds right.'}</p>
		<p class="dim small">Next goal: {stage.can}.</p>
		<a class="btn primary wide" href="/">Começar</a>
	</div>
{/if}

<style>
	.intro { flex: 1; justify-content: center; align-items: flex-start; }
	.intro img { border-radius: 24px; box-shadow: 0 24px 50px -20px rgba(201, 130, 190, 0.7); }
	.badge { width: 110px; height: 110px; border-radius: 50%; display: grid; place-items: center; font: 500 26px var(--mono); color: #17121c; background: linear-gradient(150deg, var(--lime), var(--rose)); box-shadow: 0 0 70px -10px rgba(227, 163, 198, 0.7); animation: pop 0.6s cubic-bezier(0.3, 1.6, 0.5, 1); }
	@keyframes pop { from { transform: scale(0.4) rotate(-30deg); opacity: 0; } }
</style>
