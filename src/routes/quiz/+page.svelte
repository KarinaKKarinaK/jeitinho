<script>
	import Exercise from '../../lib/Exercise.svelte';
	import { S, addXP } from '../../lib/store.svelte.js';
	import { dailyQuiz, fromKey, markAsked } from '../../lib/quiz.js';
	import { today } from '../../lib/fx.js';
	import { P } from '../../lib/prefs.js';

	const day = today();
	const plain = $state.snapshot(S);
	const extra = !!S.quiz[day]?.done; // already done today: a bonus round that does not touch the score
	if (!S.quiz[day]) {
		for (const d of Object.keys(S.quiz).sort().slice(0, -14)) delete S.quiz[d];
		S.quiz[day] = { keys: dailyQuiz(plain, day, undefined, P), done: false, score: 0 };
	}
	const keys = extra ? dailyQuiz(plain, day + Math.random(), undefined, P) : S.quiz[day].keys;
	const steps = keys.map((k) => fromKey(plain, k)).filter(Boolean);

	function finish({ right }) {
		const xp = extra ? right * 2 : 30 + right * 3;
		if (!extra) {
			Object.assign(S.quiz[day], { done: true, score: right });
			S.nquiz++;
		}
		addXP(xp);
		return xp;
	}
</script>

<Exercise {steps} back="/" onanswer={(q, ok) => markAsked(S, q, ok)} onfinish={finish} />
