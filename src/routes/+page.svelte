<script>
	import { goto } from '$app/navigation';
	import Icon from '../lib/Icon.svelte';
	import { S, streak, level } from '../lib/store.svelte.js';
	import { LESSON_LIST } from '../lib/content.js';
	import { today, DAY } from '../lib/fx.js';
	import { QUIZ_LEN } from '../lib/quiz.js';
	import { cloud } from '../lib/cloud.svelte.js';
	import { lang, t, AVAILABLE, switchLang } from '../lib/lang.js';
	import { current, earned, milestones } from '../lib/roadmap.js';

	// brand new here: offer the placement test once
	if (!S.onboarded && S.xp === 0 && !Object.keys(S.done).length) goto('/welcome', { replaceState: true });

	const GOAL = 60; // XP that fills a day ring
	const now = Date.now();
	const week = Array.from({ length: 7 }, (_, k) => {
		const d = new Date(now - (6 - k) * DAY);
		return { key: today(d), label: k === 6 ? t.today : t.days[d.getDay()], now: k === 6 };
	});
	let remind = $state('19:00');
	const hour = new Date().getHours();
	const hello = t.hello[hour < 12 ? 0 : hour < 18 ? 1 : 2];
	let picking = $state(false);
	const quiz = $derived(S.quiz[today()]);
	const next = $derived(LESSON_LIST.find((l) => !(l.id in S.done)));
	const due = $derived(S.words.filter((w) => w.reps > 0 && w.due <= now).length);
	const lv = $derived(level());
	const stage = $derived(current(S));
	const ms = $derived(stage ? milestones(S, stage) : []);

	function exportData() {
		const a = document.createElement('a');
		a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: 'application/json' }));
		a.download = `jeitinho-${today()}.json`;
		a.click();
	}
	async function importData(e) {
		try {
			const d = JSON.parse(await e.target.files[0].text());
			if (!Array.isArray(d.words)) throw 0;
			Object.assign(S, d);
		} catch {
			alert('That file is not a jeitinho backup.');
		}
	}
</script>

<div class="stack rise">
	<header class="head" style="margin-bottom:4px">
		<div>
			<p class="dim small">{hello}</p>
			<h2>{lv.name}</h2>
		</div>
		<div class="row" style="gap:8px">
			<button class="streak lang" onclick={() => (picking = !picking)} aria-label="Switch language" aria-expanded={picking}>{lang.toUpperCase()}</button>
			<div class="streak" class:lit={streak() > 0}><Icon name="flame" size={18} /> {streak()}</div>
			<a class="icon-btn" class:solid={!!cloud.user} href="/account" aria-label={cloud.user ? 'Account, signed in' : 'Sign in'}><Icon name="user" size={20} /></a>
		</div>
	</header>

	{#if picking}
		<div class="card stack langs" style="gap:8px">
			<p class="eyebrow">Your languages</p>
			{#each AVAILABLE as l}
				<button class="item" class:done={l.code === lang} onclick={() => (l.code === lang ? (picking = false) : switchLang(l.code))}>
					<span class="dot">{l.code.toUpperCase()}</span>
					<span class="grow"><b>{l.label}</b><small>{l.name}</small></span>
					{#if l.code === lang}<Icon name="check" size={18} />{/if}
				</button>
			{/each}
			<p class="small dim">Each language keeps its own progress, word bank and badges under the same account.</p>
		</div>
	{/if}

	<div class="week">
		{#each week as d}
			<div class="day" class:now={d.now}>
				<span>{d.label}</span>
				<div class="ring" style:--p={Math.min(1, (S.days[d.key] || 0) / GOAL)}>{S.days[d.key] || ''}</div>
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

	{#if next}
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

	<a class="card xp" href="/roadmap">
		<div class="row">
			<span class="lvl">{earned(S)?.id || '0'}</span>
			<span class="grow"><b>{stage ? `Next badge: ${stage.id}` : 'Every badge earned'}</b><small class="dim">{stage ? `${ms.filter((m) => m.ok).length} of ${ms.length} milestones · ${S.xp} XP` : `${S.xp} XP`}</small></span>
			<Icon name="chev" size={18} />
		</div>
		<div class="bar"><i style:width="{stage ? (ms.reduce((a, m) => a + m.have / m.need, 0) / ms.length) * 100 : 100}%"></i></div>
	</a>

	<details class="card">
		<summary>Settings</summary>
		<div class="stack" style="margin-top:16px">
			<label class="small dim">Voice speed: {S.rate}<input type="range" min="0.5" max="1.2" step="0.1" bind:value={S.rate} /></label>
			<label class="small dim">Passcode (only if you set APP_PASSCODE)<input type="password" bind:value={S.pass} autocomplete="off" /></label>
			<div class="row small dim"><Icon name="bell" size={18} /><span class="grow">Daily reminder</span><input type="time" bind:value={remind} aria-label="Reminder time" /><a class="btn sm" href="/api/reminder?t={remind}" data-sveltekit-reload>Add to calendar</a></div>
			<div class="chips">
				<button class="btn sm" onclick={exportData}>Export backup</button>
				<a class="btn sm" href="/welcome">Placement test</a>
				<label class="btn sm">Import backup<input type="file" accept="application/json" hidden onchange={importData} /></label>
			</div>
			<p class="small dim">{cloud.user ? `Signed in as ${cloud.user.email}. Progress syncs to your account.` : 'Your progress lives only on this device.'} <a href="/account" style="text-decoration:underline">{cloud.user ? 'Account' : 'Sign in to save it'}</a></p>
		</div>
	</details>
</div>

<style>
	.streak { display: flex; align-items: center; gap: 6px; height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); background: var(--glass); color: var(--dim); font-weight: 500; }
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
	.ring { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font-size: 11px; color: var(--dim); background: radial-gradient(closest-side, #15111a 76%, transparent 79%), conic-gradient(var(--lime) calc(var(--p) * 360deg), var(--line) 0); transition: --p 0.6s; }
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
