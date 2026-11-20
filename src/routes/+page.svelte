<script>
	import Icon from '../lib/Icon.svelte';
	import { S, streak, level } from '../lib/store.svelte.js';
	import { LESSON_LIST } from '../lib/content.js';
	import { today, DAY } from '../lib/fx.js';
	import { QUIZ_LEN } from '../lib/quiz.js';

	const GOAL = 60; // XP that fills a day ring
	const now = Date.now();
	const week = Array.from({ length: 7 }, (_, k) => {
		const d = new Date(now - (6 - k) * DAY);
		return { key: today(d), label: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][d.getDay()], now: k === 6 };
	});
	const hour = new Date().getHours();
	const hello = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
	const quiz = $derived(S.quiz[today()]);
	const next = $derived(LESSON_LIST.find((l) => !(l.id in S.done)));
	const due = $derived(S.words.filter((w) => w.reps > 0 && w.due <= now).length);
	const lv = $derived(level());

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
		<div class="streak" class:lit={streak() > 0}><Icon name="flame" size={18} /> {streak()}</div>
	</header>

	<div class="week">
		{#each week as d}
			<div class="day" class:now={d.now}>
				<span>{d.label}</span>
				<div class="ring" style:--p={Math.min(1, (S.days[d.key] || 0) / GOAL)}>{S.days[d.key] || ''}</div>
			</div>
		{/each}
	</div>

	<a class="card hero" href="/quiz">
		<p class="eyebrow">Quiz do dia</p>
		<h1>{QUIZ_LEN} perguntas<br />difíceis</h1>
		<div class="row">
			<span class="grow">{quiz?.done ? `Feito hoje · ${quiz.score}/${QUIZ_LEN}` : 'A fresh mix from your word bank and tenses'}</span>
			<span class="pill">{quiz?.done ? 'Extra' : quiz ? 'Continuar' : 'Começar'} <Icon name="chev" size={16} /></span>
		</div>
	</a>

	{#if next}
		<a class="item" href="/lesson?id={next.id}">
			<span class="dot"><Icon name="book" /></span>
			<span class="grow"><small>Próxima lição</small><b>{next.title}</b></span>
			<Icon name="chev" size={18} />
		</a>
	{/if}

	<div class="tiles">
		<a class="card" href="/drill"><Icon name="bolt" /><h3>Verbos</h3><p class="dim small">Drill eu vs você</p></a>
		<a class="card" href="/bank?tab=review"><Icon name="layers" /><h3>Revisar</h3><p class="dim small">{due} due · {S.words.length} words</p></a>
		<a class="card" href="/add"><Icon name="music" /><h3>Músicas e links</h3><p class="dim small">Turn them into lessons</p></a>
		<a class="card" href="/chat"><Icon name="chat" /><h3>Bate-papo</h3><p class="dim small">Chat with Bia from BH</p></a>
	</div>

	<div class="card xp">
		<div class="row"><span class="grow">{S.xp} XP</span><span class="dim small">{lv.next ? `${lv.next - S.xp} to next level` : 'Top level'}</span></div>
		<div class="bar"><i style:width="{lv.pct * 100}%"></i></div>
	</div>

	<details class="card">
		<summary>Settings</summary>
		<div class="stack" style="margin-top:16px">
			<label class="small dim">Voice speed: {S.rate}<input type="range" min="0.5" max="1.2" step="0.1" bind:value={S.rate} /></label>
			<label class="small dim">Passcode (only if you set APP_PASSCODE)<input type="password" bind:value={S.pass} autocomplete="off" /></label>
			<div class="chips">
				<button class="btn sm" onclick={exportData}>Export backup</button>
				<label class="btn sm">Import backup<input type="file" accept="application/json" hidden onchange={importData} /></label>
			</div>
			<p class="small dim">Your progress lives only on this device. Export a backup now and then.</p>
		</div>
	</details>
</div>

<style>
	.streak { display: flex; align-items: center; gap: 6px; height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); background: var(--glass); color: var(--dim); font-weight: 500; }
	.streak.lit { color: var(--amber); border-color: rgba(242, 166, 90, 0.4); }
	.week { display: flex; justify-content: space-between; }
	.day { display: grid; gap: 8px; justify-items: center; font-size: 13px; color: var(--faint); }
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
	.xp { display: grid; gap: 12px; }
	.bar { height: 8px; border-radius: 9px; background: var(--glass2); overflow: hidden; }
	.bar i { display: block; height: 100%; border-radius: 9px; background: linear-gradient(90deg, var(--mauve), var(--rose)); }
	summary { cursor: pointer; color: var(--dim); }
	label { display: grid; gap: 8px; }
	input[type='range'] { accent-color: var(--rose); width: 100%; }
</style>
