<script>
	import { fly, scale } from 'svelte/transition';
	import { untrack } from 'svelte';
	import Icon from './Icon.svelte';
	import Star from './Star.svelte';
	import { speak, ding, ai, record, hear } from './fx.js';
	import { check, sayScore } from './quiz.js';
	import { S } from './store.svelte.js';
	import { pack, meta, t, lang } from './lang.js';
	import { P } from './prefs.js';

	let { steps, retry = false, back = '/', onanswer = () => {}, onfinish = () => 0 } = $props();

	const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
	const init = untrack(() => steps.map((s) => ({ ...s, opts: s.options ? shuffle(s.options) : null })));
	let total = $state(init.filter((s) => s.kind !== 'info').length);
	let busy = $state(false);
	let stop = $state(null); // set while the microphone is recording
	let reported = $state(false);
	// flag this question as wrong: sends the question and the expected answer, nothing about you
	function report() {
		reported = true;
		fetch('/api/report', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ lang, source: location.pathname + location.search, prompt: q.prompt, answer: String(q.answer || ''), given: val || picked || '' }) }).catch(() => {});
	}

	let queue = $state(init);
	let i = $state(0);
	let val = $state('');
	let picked = $state(null);
	let res = $state(null);
	let right = $state(0);
	let xp = $state(null);
	let verdict = $state('');
	let input = $state();
	const q = $derived(queue[i]);
	const ready = $derived(!busy && (res || q.kind === 'info' || q.kind === 'say' || (q.kind === 'choice' ? picked !== null : val.trim())));

	async function judge() {
		if (q.kind === 'choice') return { ok: picked === q.answer };
		if (q.kind === 'write') {
			const r = await ai('grade', { task: q.prompt, text: val, level: q.level }, S.pass);
			q.answer = r.fix || val;
			return { ok: r.ok, note: `${r.score}/10. ${r.note}` };
		}
		if (q.kind === 'say') {
			const h = await hear(await stop(), S.pass);
			const sc = sayScore(q.answer, h.words);
			return { ok: sc.score >= 0.7, marks: sc.marks, note: h.text ? `Heard: ${h.text}` : 'Heard nothing. Hold the phone closer.' };
		}
		return check(val, q);
	}

	// a task that cannot be graded (offline, no microphone, model busy) is dropped from the score
	function skip(why) {
		total--;
		res = { ok: true, skipped: true, note: `${why} This one does not count.` };
	}

	async function submit() {
		if (!ready) return;
		if (res || q.kind === 'info') return next();
		if (q.kind === 'say' && !stop) {
			busy = true;
			try {
				stop = await record();
			} catch {
				skip('No microphone access.');
			}
			busy = false;
			return;
		}
		busy = true;
		let r;
		try {
			r = await judge();
		} catch (e) {
			busy = false;
			stop = null;
			return skip(e.message || 'Could not grade that.');
		}
		busy = false;
		stop = null;
		res = r;
		ding(r.ok);
		if (!q.again) {
			if (r.ok) right++;
			onanswer(q, r.ok);
		}
		// missed questions come back once at the end of a lesson
		if (!r.ok && retry && !q.again) queue.push({ ...$state.snapshot(q), again: true });
		if (P.autoplay && q.speak && q.kind !== 'choice') speak(q.speak);
	}

	function next() {
		res = null;
		val = '';
		picked = null;
		reported = false;
		if (i + 1 >= queue.length) {
			const r = onfinish({ right, total }) ?? 0;
			if (r === false) return; // the parent takes over (placement test moves to the next band)
			verdict = r.title || '';
			xp = r.xp ?? r;
		}
		else i++;
	}

	function type(ch) {
		val += ch;
		input?.focus();
	}

	$effect(() => {
		if (xp === null && !res && (q.kind === 'listen' || q.autoplay)) speak(q.speak);
		input?.focus();
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Enter' && !e.isComposing && e.keyCode !== 229 && !e.target.closest?.('button, a, textarea') && submit()} />

{#if xp !== null}
	<section class="fin" in:scale={{ start: 0.9, duration: 350 }}>
		<div class="ring"><span>{right}</span><small>/ {total}</small></div>
		<h1>{verdict ? verdict : right === total ? t.perfect : right / total >= 0.7 ? t.good : t.almost}</h1>
		<p class="eyebrow">+{xp} XP</p>
		<a class="btn primary wide" href={back}>{t.next}</a>
	</section>
{:else}
	<header class="top">
		<a class="icon-btn sm" href={back} aria-label="Close"><Icon name="x" size={18} /></a>
		<div class="bar"><i style:width="{(i / queue.length) * 100}%"></i></div>
		<span class="dim small">{i + 1}/{queue.length}</span>
	</header>

	{#key i}
		<main in:fly={{ x: 28, duration: 240 }}>
			{#if q.kind === 'info'}
				<p class="eyebrow">{t.learn}</p>
				<h1>{q.title}</h1>
				{#if q.html}<div class="body">{@html q.body}</div>{:else}<div class="body">{q.body}</div>{/if}
				{#if q.say}<button class="btn sm" onclick={() => speak(q.say)}><Icon name="sound" size={18} /> {t.hear}</button>{/if}
			{:else}
				<p class="eyebrow">{q.again ? t.again : q.label || (q.kind === 'choice' ? 'Choose' : q.kind === 'listen' ? 'Listen and type' : q.kind === 'say' ? 'Say it out loud' : q.kind === 'write' ? 'Write in Portuguese' : t.typeLabel)}</p>
				{#if q.kind === 'listen'}
					<button class="play" onclick={() => speak(q.speak)} aria-label="Play audio"><Icon name="sound" size={38} /></button>
					<p class="dim">{q.prompt} <button class="chip" onclick={() => speak(q.speak, 0.6)}>slow</button></p>
				{:else}
					<h1 class="prompt">{q.prompt}</h1>
					{#if q.sub}<p class="dim">{q.sub}</p>{/if}
					{#if q.audio}<button class="btn sm" onclick={() => speak(q.speak)}><Icon name="sound" size={18} /> {t.hear}</button>{/if}
				{/if}

				{#if q.kind === 'choice'}
					<div class="opts">
						{#each q.opts as o}
							<button class="opt" class:on={picked === o} class:good={res && o === q.answer} class:bad={res && picked === o && o !== q.answer} disabled={!!res} onclick={() => (picked = o)}>{o}</button>
						{/each}
					</div>
				{:else if q.kind === 'say'}
					<button class="btn sm" onclick={() => speak(q.speak)}><Icon name="sound" size={18} /> {t.hear}</button>
					{#if stop}<p class="rec"><i></i> {t.recording}</p>{/if}
					{#if res?.marks}<p class="marks">{#each res.marks as m}<span class:miss={!m.ok}>{m.w}</span>{' '}{/each}</p>{/if}
				{:else if q.kind === 'write'}
					<textarea bind:this={input} bind:value={val} lang={meta.locale} rows="5" placeholder={t.write} readonly={!!res || busy} autocapitalize="sentences" spellcheck="false"></textarea>
					<div class="keys">
						{#each pack.keys || '' as ch}<button onclick={() => type(ch)} disabled={!!res} tabindex="-1">{ch}</button>{/each}
					</div>
				{:else}
					<input bind:this={input} bind:value={val} type="text" lang={meta.locale} placeholder={t.placeholder} readonly={!!res} autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="done" />
					<div class="keys">
						{#each pack.keys || '' as ch}<button onclick={() => type(ch)} disabled={!!res} tabindex="-1">{ch}</button>{/each}
					</div>
				{/if}
			{/if}
		</main>
	{/key}

	<footer>
		{#if res}
			<div class="fb" class:ok={res.ok} class:shake={!res.ok} in:fly={{ y: 30, duration: 220 }} role="status">
				<div class="row">
					<b class="grow">{res.skipped ? t.skipped : q.kind === 'write' ? (res.ok ? t.polished : t.fixed) : res.ok ? t.right : t.answer}</b>
					{#if q.wid}{@const bw = S.words.find((w) => w.id === q.wid)}{#if bw}<Star word={bw} />{/if}{/if}
					{#if !res.skipped && (q.speak || q.kind !== 'choice')}<button class="icon-btn sm" onclick={() => speak(q.speak || q.answer)} aria-label="Hear it"><Icon name="sound" size={18} /></button>{/if}
				</div>
				{#if !res.ok || (q.kind === 'write' && !res.skipped)}<p class="ans">{q.answer}</p>{/if}
				{#if res.note}<p class="small">{res.note}</p>{/if}
				{#if !res.skipped}<button class="flag" disabled={reported} onclick={report}>{reported ? 'Reported, thank you' : 'Something wrong with this question? Report it'}</button>{/if}
				{#if q.explain}{#if q.html}<p class="ex">{@html q.explain}</p>{:else}<p class="ex">{q.explain}</p>{/if}{/if}
			</div>
		{/if}
		<button class="btn primary wide" disabled={!ready} onclick={submit}>{#if busy}<span class="spin"></span>{:else if res || q.kind === 'info'}{t.next}{:else if q.kind === 'say'}<Icon name="mic" size={18} /> {stop ? t.stop : t.rec}{:else}{t.check}{/if}</button>
	</footer>
{/if}

<style>
	.top { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
	.bar { flex: 1; height: 8px; border-radius: 9px; background: var(--glass2); overflow: hidden; }
	.bar i { display: block; height: 100%; border-radius: 9px; background: linear-gradient(90deg, var(--rose), var(--lime)); transition: width 0.5s cubic-bezier(0.3, 1.4, 0.5, 1); }
	main { flex: 1; display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
	.prompt { font-size: clamp(26px, 7vw, 34px); }
	.body { font-size: 18px; line-height: 1.65; color: var(--dim); white-space: pre-line; }
	.body :global(b) { color: var(--ink); font-weight: 500; }
	input { font-size: 22px; padding: 18px 20px; margin-top: 6px; }
	.keys { display: flex; gap: 6px; flex-wrap: wrap; }
	.keys button { width: 36px; height: 38px; border-radius: 12px; border: 1px solid var(--line); background: var(--glass); color: var(--ink); font: 400 17px var(--font); cursor: pointer; }
	.keys button:active { background: var(--glass2); }
	.opts { display: grid; gap: 10px; width: 100%; margin-top: 6px; }
	.opt { text-align: left; padding: 17px 20px; border-radius: 22px; border: 1px solid var(--line); background: var(--glass); color: var(--ink); font: 400 17px var(--font); cursor: pointer; transition: transform 0.12s, border-color 0.15s, background 0.15s; }
	.opt:active { transform: scale(0.98); }
	.opt.on { border-color: var(--ink); background: var(--glass2); }
	.opt.good { border-color: var(--ok); background: rgba(166, 232, 143, 0.14); }
	.opt.bad { border-color: var(--bad); background: rgba(255, 143, 143, 0.12); }
	.play { width: 108px; height: 108px; border-radius: 50%; border: 0; cursor: pointer; color: var(--hero-ink); background: var(--grad); box-shadow: 0 20px 40px -18px var(--glow); transition: transform 0.12s; }
	.play:active { transform: scale(0.93); }
	footer { position: sticky; bottom: calc(env(safe-area-inset-bottom) + 12px); display: grid; gap: 12px; margin-top: 24px; }
	.fb { padding: 16px 18px; border-radius: 24px; border: 1px solid rgba(255, 143, 143, 0.5); background: var(--bad-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); display: grid; gap: 6px; }
	.fb.ok { border-color: rgba(166, 232, 143, 0.5); background: var(--ok-bg); }
	.fb b { font-weight: 500; color: var(--bad); }
	.fb.ok b { color: var(--ok); }
	.ans { font-size: 22px; }
	.ex { font-size: 14px; color: var(--dim); white-space: pre-line; line-height: 1.6; }
	.ex :global(b) { color: var(--ink); font-weight: 500; }
	.ans { animation: pop-in 0.28s cubic-bezier(0.3, 1.5, 0.5, 1); }
	.fb.ok { animation: glow 0.5s ease-out; }
	.fb.shake { animation: shake 0.28s ease-out; }
	@keyframes glow { from { box-shadow: 0 0 0 0 rgba(166, 232, 143, 0.55); } to { box-shadow: 0 0 0 18px rgba(166, 232, 143, 0); } }
	@keyframes shake { 25% { transform: translateX(-5px); } 60% { transform: translateX(4px); } }
	@keyframes pop-in { from { transform: scale(0.92); opacity: 0; } }
	.opt.good { animation: pop-in 0.25s cubic-bezier(0.3, 1.6, 0.5, 1); }
	.rec { display: flex; align-items: center; gap: 10px; color: var(--bad); }
	.rec i { width: 12px; height: 12px; border-radius: 50%; background: var(--bad); animation: pulse 0.9s ease-in-out infinite; }
	@keyframes pulse { 50% { transform: scale(1.7); opacity: 0.4; } }
	.marks { font-size: 22px; line-height: 1.5; color: var(--ok); }
	.marks .miss { color: var(--bad); text-decoration: underline wavy; text-underline-offset: 5px; }
	textarea { font-size: 18px; }
	.flag { justify-self: start; background: none; border: 0; padding: 0; color: var(--dim); font: 400 12px var(--font); cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
	.flag:disabled { text-decoration: none; cursor: default; }
	.fin { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; text-align: center; }
	.ring { width: 170px; height: 170px; border-radius: 50%; display: grid; place-content: center; background: radial-gradient(closest-side, var(--bg) 82%, transparent 84%), conic-gradient(var(--lime), var(--rose), var(--mauve), var(--lime)); animation: pop 0.7s cubic-bezier(0.3, 1.6, 0.5, 1); box-shadow: 0 0 80px -10px var(--glow); }
	.ring span { font-size: 64px; font-weight: 300; line-height: 1; }
	.ring small { color: var(--dim); }
	@keyframes pop { from { transform: scale(0.4) rotate(-40deg); opacity: 0; } }
</style>
