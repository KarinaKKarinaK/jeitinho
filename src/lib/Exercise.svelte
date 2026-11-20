<script>
	import { fly, scale } from 'svelte/transition';
	import { untrack } from 'svelte';
	import Icon from './Icon.svelte';
	import { speak, ding } from './fx.js';
	import { check } from './quiz.js';
	import { S } from './store.svelte.js';

	let { steps, retry = false, back = '/', onanswer = () => {}, onfinish = () => 0 } = $props();

	const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
	const init = untrack(() => steps.map((s) => ({ ...s, opts: s.options ? shuffle(s.options) : null })));
	const total = init.filter((s) => s.kind !== 'info').length;

	let queue = $state(init);
	let i = $state(0);
	let val = $state('');
	let picked = $state(null);
	let res = $state(null);
	let right = $state(0);
	let xp = $state(null);
	let input = $state();
	const q = $derived(queue[i]);
	const ready = $derived(res || q.kind === 'info' || (q.kind === 'choice' ? picked !== null : val.trim()));

	function submit() {
		if (!ready) return;
		if (res || q.kind === 'info') return next();
		const r = q.kind === 'choice' ? { ok: picked === q.answer } : check(val, q);
		res = r;
		ding(r.ok);
		if (!q.again) {
			if (r.ok) right++;
			onanswer(q, r.ok);
		}
		// missed questions come back once at the end of a lesson
		if (!r.ok && retry && !q.again) queue.push({ ...$state.snapshot(q), again: true });
		if (q.speak && q.kind !== 'choice') speak(q.speak, S.rate);
	}

	function next() {
		res = null;
		val = '';
		picked = null;
		if (i + 1 >= queue.length) xp = onfinish({ right, total }) ?? 0;
		else i++;
	}

	function type(ch) {
		val += ch;
		input?.focus();
	}

	$effect(() => {
		if (xp === null && q.kind === 'listen') speak(q.speak, S.rate);
		input?.focus();
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Enter' && !e.target.closest?.('button, a') && submit()} />

{#if xp !== null}
	<section class="fin" in:scale={{ start: 0.9, duration: 350 }}>
		<div class="ring"><span>{right}</span><small>/ {total}</small></div>
		<h1>{right === total ? 'Perfeito!' : right / total >= 0.7 ? 'Mandou bem!' : 'Quase lá'}</h1>
		<p class="eyebrow">+{xp} XP</p>
		<a class="btn primary wide" href={back}>Continuar</a>
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
				<p class="eyebrow">Aprenda</p>
				<h1>{q.title}</h1>
				{#if q.html}<div class="body">{@html q.body}</div>{:else}<div class="body">{q.body}</div>{/if}
				{#if q.say}<button class="btn sm" onclick={() => speak(q.say, S.rate)}><Icon name="sound" size={18} /> Ouvir</button>{/if}
			{:else}
				<p class="eyebrow">{q.again ? 'De novo' : q.label || (q.kind === 'choice' ? 'Choose' : q.kind === 'listen' ? 'Listen and type' : 'Type in Portuguese')}</p>
				{#if q.kind === 'listen'}
					<button class="play" onclick={() => speak(q.speak, S.rate)} aria-label="Play audio"><Icon name="sound" size={38} /></button>
					<p class="dim">{q.prompt} <button class="chip" onclick={() => speak(q.speak, 0.6)}>slow</button></p>
				{:else}
					<h1 class="prompt">{q.prompt}</h1>
					{#if q.sub}<p class="dim">{q.sub}</p>{/if}
				{/if}

				{#if q.kind === 'choice'}
					<div class="opts">
						{#each q.opts as o}
							<button class="opt" class:on={picked === o} class:good={res && o === q.answer} class:bad={res && picked === o && o !== q.answer} disabled={!!res} onclick={() => (picked = o)}>{o}</button>
						{/each}
					</div>
				{:else}
					<input bind:this={input} bind:value={val} type="text" lang="pt-BR" placeholder="Em português..." readonly={!!res} autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="done" />
					<div class="keys">
						{#each 'áâãàçéêíóôõú' as ch}<button onclick={() => type(ch)} disabled={!!res} tabindex="-1">{ch}</button>{/each}
					</div>
				{/if}
			{/if}
		</main>
	{/key}

	<footer>
		{#if res}
			<div class="fb" class:ok={res.ok} in:fly={{ y: 30, duration: 220 }} role="status">
				<div class="row">
					<b class="grow">{res.ok ? 'Isso!' : 'Resposta certa:'}</b>
					{#if q.speak || q.kind !== 'choice'}<button class="icon-btn sm" onclick={() => speak(q.speak || q.answer, S.rate)} aria-label="Hear it"><Icon name="sound" size={18} /></button>{/if}
				</div>
				{#if !res.ok}<p class="ans">{q.answer}</p>{/if}
				{#if res.note}<p class="small">{res.note}</p>{/if}
				{#if q.explain}{#if q.html}<p class="ex">{@html q.explain}</p>{:else}<p class="ex">{q.explain}</p>{/if}{/if}
			</div>
		{/if}
		<button class="btn primary wide" disabled={!ready} onclick={submit}>{res || q.kind === 'info' ? 'Continuar' : 'Verificar'}</button>
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
	.opt.on { border-color: #fff; background: var(--glass2); }
	.opt.good { border-color: var(--ok); background: rgba(166, 232, 143, 0.14); }
	.opt.bad { border-color: var(--bad); background: rgba(255, 143, 143, 0.12); }
	.play { width: 108px; height: 108px; border-radius: 50%; border: 0; cursor: pointer; color: #fff; background: linear-gradient(160deg, #d79ac3, #7d569c); box-shadow: 0 20px 40px -18px rgba(201, 130, 190, 0.8); transition: transform 0.12s; }
	.play:active { transform: scale(0.93); }
	footer { position: sticky; bottom: calc(env(safe-area-inset-bottom) + 12px); display: grid; gap: 12px; margin-top: 24px; }
	.fb { padding: 16px 18px; border-radius: 24px; border: 1px solid rgba(255, 143, 143, 0.5); background: rgba(48, 20, 26, 0.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); display: grid; gap: 6px; }
	.fb.ok { border-color: rgba(166, 232, 143, 0.5); background: rgba(22, 40, 24, 0.92); }
	.fb b { font-weight: 500; color: var(--bad); }
	.fb.ok b { color: var(--ok); }
	.ans { font-size: 22px; }
	.ex { font-size: 14px; color: var(--dim); white-space: pre-line; line-height: 1.6; }
	.ex :global(b) { color: var(--ink); font-weight: 500; }
	.fin { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; text-align: center; }
	.ring { width: 170px; height: 170px; border-radius: 50%; display: grid; place-content: center; background: radial-gradient(closest-side, var(--bg) 82%, transparent 84%), conic-gradient(var(--lime), var(--rose), var(--mauve), var(--lime)); animation: pop 0.7s cubic-bezier(0.3, 1.6, 0.5, 1); box-shadow: 0 0 80px -10px rgba(227, 163, 198, 0.55); }
	.ring span { font-size: 64px; font-weight: 300; line-height: 1; }
	.ring small { color: var(--dim); }
	@keyframes pop { from { transform: scale(0.4) rotate(-40deg); opacity: 0; } }
</style>
