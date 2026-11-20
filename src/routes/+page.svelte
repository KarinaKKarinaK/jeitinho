<script>
	import { goto } from '$app/navigation';
	import Icon from '../lib/Icon.svelte';
	import Heatmap from '../lib/Heatmap.svelte';
	import { S, streak, level } from '../lib/store.svelte.js';
	import { LESSON_LIST, CHAPTER_OF, UNITS } from '../lib/content.js';
	import { chapterOpen } from '../lib/roadmap.js';
	import { today, DAY } from '../lib/fx.js';
	import { P } from '../lib/prefs.js';
	import { cloud } from '../lib/cloud.svelte.js';
	import { lang, meta, t, AVAILABLE, switchLang } from '../lib/lang.js';
	import { current, earned, milestones } from '../lib/roadmap.js';

	// brand new here: offer the placement test once
	if (!S.onboarded && S.xp === 0 && !Object.keys(S.done).length) goto('/welcome', { replaceState: true });

	const GOAL = P.goalMin; // minutes of study that fill a day ring
	const QUIZ_LEN = P.quizLen;
	const now = Date.now();
	// two weeks of rings; phones show the last seven, wide screens show all fourteen
	const week = Array.from({ length: 14 }, (_, k) => {
		const d = new Date(now - (13 - k) * DAY);
		return { key: today(d), label: k === 13 ? t.today : t.days[d.getDay()], date: d.getDate(), now: k === 13, old: k < 7 };
	});
	const hour = new Date().getHours();
	const hello = t.hello[hour < 12 ? 0 : hour < 18 ? 1 : 2];
	let picking = $state(false);
	const quiz = $derived(S.quiz[today()]);
	const next = $derived(LESSON_LIST.find((l) => !(l.id in S.done)));
	// if the next lesson sits in a locked chapter, the next step is the quiz of the chapter before it
	const gate = $derived(next && !chapterOpen(S, CHAPTER_OF[next.id]) ? CHAPTER_OF[next.id] - 1 : -1);
	const due = $derived(S.words.filter((w) => w.reps > 0 && w.due <= now).length);
	const lv = $derived(level());
	const stage = $derived(current(S));
	const ms = $derived(stage ? milestones(S, stage) : []);
</script>

<div class="stack rise home">
	<header class="head" style="margin-bottom:4px">
		<div>
			<p class="dim small">{hello}{cloud.name ? `, ${cloud.name}` : ''}</p>
			<h2>{lv.name}</h2>
		</div>
		<div class="row" style="gap:8px">
			<button class="streak lang" onclick={() => (picking = !picking)} aria-label="Switch language" aria-expanded={picking}>{meta.short}</button>
			<div class="streak" class:lit={streak() > 0}><Icon name="flame" size={18} /> {streak()}</div>
			<a class="icon-btn" class:solid={!!cloud.user} href="/account" aria-label={cloud.user ? 'Account, signed in' : 'Sign in'}>{#if cloud.avatar}<img class="me" src={cloud.avatar} alt="" />{:else}<Icon name="user" size={20} />{/if}</a>
		</div>
	</header>

	{#if picking}
		<div class="card stack langs" style="gap:8px">
			<p class="eyebrow">Your languages</p>
			{#each AVAILABLE as l}
				<button class="item" class:done={l.code === lang} onclick={() => (l.code === lang ? (picking = false) : switchLang(l.code))}>
					<span class="dot">{l.short}</span>
					<span class="grow"><b>{l.label}</b><small>{l.name}</small></span>
					{#if l.code === lang}<Icon name="check" size={18} />{/if}
				</button>
			{/each}
			<p class="small dim">Each language keeps its own progress, word bank and badges under the same account.</p>
		</div>
	{/if}

	<div class="week">
		{#each week as d}
			{@const m = Math.round(S.mins?.[d.key] || 0)}
			<div class="day" class:now={d.now} class:old={d.old}>
				<span>{d.label}</span>
				<!-- first lap fills toward the daily goal; past the goal a second lap starts on top -->
				<div class="ring" class:done={m >= GOAL} style:--p={Math.min(1, m / GOAL)} style:--x={Math.min(1, Math.max(0, m / GOAL - 1))} title="{m} of {GOAL} minutes">{m || ''}</div>
				<small>{d.date}</small>
			</div>
		{/each}
	</div>

	<a class="card hero" href="/quiz">
		<p class="eyebrow">{t.quiz}</p>
		<h1>{QUIZ_LEN} {t.quizA}<br />{t.quizB}</h1>
		<div class="row">
			<span class="grow">{quiz?.done ? `${t.done} · ${quiz.score}/${QUIZ_LEN}` : 'A fresh mix from your word bank and drills'}</span>
			<span class="pill">{quiz?.done ? t.extra : quiz ? t.next : t.start} <Icon name="chev" size={16} /></span>
		</div>
	</a>

	{#if gate >= 0}
		<a class="item" href="/chapter?i={gate}">
			<span class="dot"><Icon name="lock" /></span>
			<span class="grow"><small>Chapter {gate + 1} quiz</small><b>Pass it to open {UNITS[gate + 1].title}</b></span>
			<Icon name="chev" size={18} />
		</a>
	{:else if next}
		<a class="item" href="/lesson?id={next.id}">
			<span class="dot"><Icon name="book" /></span>
			<span class="grow"><small>{t.nextLesson}</small><b>{next.title}</b></span>
			<Icon name="chev" size={18} />
		</a>
	{/if}

	<div class="tiles">
		<a class="card" href="/drill"><Icon name="bolt" /><h3>{t.drill}</h3><p class="dim small">{t.drillSub}</p></a>
		<a class="card" href="/bank?tab=review"><Icon name="layers" /><h3>{t.review}</h3><p class="dim small">{due} due · {S.words.length} words</p></a>
		<a class="card" href="/add"><Icon name="music" /><h3>{t.songs}</h3><p class="dim small">Turn them into lessons</p></a>
		<a class="card" href="/speak"><Icon name="mic" /><h3>{t.speak}</h3><p class="dim small">Say it out loud, get scored</p></a>
	</div>

	<a class="card stack heat" href="/account" aria-label="Your activity">
		<div class="row"><p class="eyebrow grow">Minutes per day</p><span class="dim small">goal {GOAL} min</span></div>
		<Heatmap />
	</a>

	<a class="card xp" href="/roadmap">
		<div class="row">
			<span class="lvl">{earned(S)?.id || '0'}</span>
			<span class="grow"><b>{stage ? `Next badge: ${stage.id}` : 'Every badge earned'}</b><small class="dim">{stage ? `${ms.filter((m) => m.ok).length} of ${ms.length} milestones · ${S.xp} XP` : `${S.xp} XP`}</small></span>
			<Icon name="chev" size={18} />
		</div>
		<div class="bar"><i style:width="{stage ? (ms.reduce((a, m) => a + m.have / m.need, 0) / ms.length) * 100 : 100}%"></i></div>
	</a>


	<p class="foot"><a href="/privacy">Privacy</a><span>·</span><a href="https://github.com/KarinaKKarinaK/jeitinho" target="_blank" rel="noopener noreferrer">Open source</a></p>
</div>

<style>
	.streak { display: flex; align-items: center; gap: 6px; height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); background: var(--glass); color: var(--dim); font-weight: 500; }
	@media (min-width: 900px) {
		.home { display: grid; grid-template-columns: 1.15fr 1fr; gap: 18px; align-items: start; }
		.home > header, .home > .langs, .home > .week, .home > .heat { grid-column: 1 / -1; }
		.home > .week { justify-content: space-between; margin-bottom: 6px; }
		.home > .week > .day.old { display: grid; }
		.home > .hero { grid-row: span 2; min-height: 100%; }
		.home > .hero h1 { font-size: 52px; }
	}
	.foot { display: flex; justify-content: center; gap: 10px; font: 500 11px var(--mono); letter-spacing: 0.1em; text-transform: uppercase; color: var(--faint); padding-top: 6px; }
	.foot a { transition: color 0.2s; }
	.foot a:hover { color: var(--ink); }
	@media (min-width: 900px) { .home > .foot { grid-column: 1 / -1; } }
	.day.old { display: none; }
	.me { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
	.streak.lang { font: 500 13px var(--mono); cursor: pointer; color: var(--ink); padding: 0 14px; }
	.langs .item { width: 100%; color: var(--ink); font: inherit; text-align: left; cursor: pointer; }
	.langs .dot { font: 500 12px var(--mono); }
	.streak.lit { color: var(--amber); border-color: rgba(242, 166, 90, 0.4); }
	.week { display: flex; justify-content: space-between; }
	.day { display: grid; gap: 8px; justify-items: center; font: 500 11px var(--mono); letter-spacing: 0.04em; text-transform: uppercase; color: var(--dim); }
	.ring { transition: transform 0.2s cubic-bezier(0.3, 1.6, 0.5, 1); animation: ring-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
	.day:active .ring { transform: scale(0.9); }
	@keyframes ring-in { from { transform: scale(0.5); opacity: 0; } }
	input[type='time'] { background: rgba(0, 0, 0, 0.25); color: var(--ink); border: 0; border-radius: 12px; padding: 8px 10px; font: 400 15px var(--font); }
	.day.now { color: var(--ink); }
	.ring { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font: 500 11px var(--mono); color: var(--dim); background: radial-gradient(closest-side, var(--ring-bg) 76%, transparent 79%), conic-gradient(var(--rose) calc(var(--x) * 360deg), var(--lime) 0 calc(var(--p) * 360deg), var(--glass2) 0); }
	.ring.done { color: var(--ink); }
	.day small { font: 400 11px var(--mono); color: var(--faint); }
	.day.now small { color: var(--ink); }
	.day.now .ring { width: 46px; height: 46px; margin-top: -3px; color: var(--ink); box-shadow: 0 0 24px -6px rgba(228, 240, 96, 0.5); }
	.pill { display: inline-flex; align-items: center; gap: 4px; height: 38px; padding: 0 14px 0 18px; border-radius: 999px; background: #fff; color: #17121c; font-weight: 500; font-size: 15px; }
	.hero { transition: transform 0.15s; }
	.hero:active { transform: scale(0.98); }
	.hero .row { font-size: 14px; }
	.tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
	.tiles .card { display: grid; gap: 4px; transition: transform 0.12s; }
	.tiles .card:active { transform: scale(0.97); }
	.tiles h3 { margin-top: 14px; }
	.xp { display: grid; gap: 14px; }
	.xp b { display: block; font-weight: 500; }
	.lvl { width: 46px; height: 46px; flex: none; border-radius: 50%; display: grid; place-items: center; font: 500 12px var(--mono); color: #17121c; background: linear-gradient(150deg, var(--lime), var(--rose)); }
	.bar { height: 8px; border-radius: 9px; background: var(--glass2); overflow: hidden; }
	.bar i { display: block; height: 100%; border-radius: 9px; background: linear-gradient(90deg, var(--mauve), var(--rose)); }
	summary { cursor: pointer; color: var(--dim); }
	label { display: grid; gap: 8px; }
	input[type='range'] { accent-color: var(--rose); width: 100%; }
</style>
