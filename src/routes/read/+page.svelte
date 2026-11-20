<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Icon from '../../lib/Icon.svelte';
	import Star from '../../lib/Star.svelte';
	import { S, addWords, addXP } from '../../lib/store.svelte.js';
	import { ai, speak, today } from '../../lib/fx.js';
	import { wordKey, splitSentences as sentences } from '../../lib/quiz.js';
	import { meta, lang, loadTexts } from '../../lib/lang.js';

	// Reading practice: the course's graded texts plus your own. Point at a word (or tap it on a phone)
	// to see what it means here and its part of speech; tap to keep it.
	let TEXTS = $state([]);
	let loaded = $state(false);
	onMount(async () => {
		TEXTS = await loadTexts();
		loaded = true;
	});
	const id = $derived(page.url.searchParams.get('id'));
	const all = $derived([...TEXTS.map((x) => ({ ...x, own: false })), ...S.texts.map((x) => ({ ...x, own: true }))]);
	const text = $derived(all.find((x) => x.id === id));

	const seg = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(meta.locale, { granularity: 'word' }) : null;
	const words = (s) => (seg ? [...seg.segment(s)].map((p) => ({ t: p.segment, w: p.isWordLike })) : s.split(/(\s+)/).map((t) => ({ t, w: /\S/.test(t) })));
	const paras = $derived(text ? text.text.split(/\n\s*\n/).map((p) => sentences(p.trim())) : []);
	const parasEn = $derived(text?.en ? text.en.split(/\n\s*\n/) : []);

	let showEn = $state(false);
	let tip = $state(null); // { x, y, key, word, info, loading }
	let pinned = $state(null); // the word card kept open after a tap
	let err = $state('');
	let timer;
	const pending = new Map(); // sentence key -> promise, so one sentence is only asked for once

	// Where a meaning comes from, cheapest first:
	// 1. prepared in advance for the built-in texts (a file shipped with the app, no AI at all)
	// 2. your own word bank, and a dictionary of the words those prepared texts contain
	// 3. the AI, one sentence at a time, only when you click a word nothing else knows; the answer is remembered
	let pre = $state(null);
	onMount(async () => {
		pre = await fetch(`/gloss/${lang}.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null);
	});
	const glossOf = (k) => S.gloss[id]?.[k] || pre?.texts?.[id]?.[k];
	const find = (g, w) => g?.words[w.toLowerCase()] || Object.values(g?.words || {}).find((x) => wordKey(x.w) === wordKey(w) || wordKey(x.pt) === wordKey(w)) ||
		// the model may group several words into one expression: the word you pointed at is inside it
		Object.values(g?.words || {}).find((x) => (meta.chars ? x.w.includes(w) : x.w.toLowerCase().split(/\s+/).includes(w.toLowerCase())));
	// a general meaning, not tied to this sentence
	function known(w) {
		const mine = S.words.find((x) => wordKey(x.pt) === wordKey(w));
		if (mine) return { pt: mine.pt, en: mine.en, pos: mine.pos, say: mine.say };
		return pre?.dict?.[w.toLowerCase()] || null;
	}
	const lookup = (k, w) => find(glossOf(k), w) || known(w);

	function load(k, sentence) {
		if (glossOf(k)) return Promise.resolve(glossOf(k));
		if (!pending.has(k))
			pending.set(k, ai('gloss', { text: sentence }, S.pass).then((r) => {
				const map = Object.fromEntries(r.words.map((w) => [w.w.toLowerCase(), w]));
				(S.gloss[id] ??= {})[k] = { en: r.en, words: map };
				return S.gloss[id][k];
			}).finally(() => pending.delete(k)));
		return pending.get(k);
	}

	// pointing never calls the AI; clicking does, and only when the word is not already known
	async function show(e, k, sentence, w, pin, force = false) {
		clearTimeout(timer);
		const r = e.currentTarget.getBoundingClientRect();
		const info = lookup(k, w);
		const at = { x: Math.min(Math.max(r.left + r.width / 2, 150), innerWidth - 150), y: r.top, key: k + w, k, word: w, info, loading: false, exact: !!find(glossOf(k), w), en: glossOf(k)?.en };
		if (!pin) return void (tip = at);
		pinned = { ...at, sentence, loading: (!info || force) && !at.exact };
		err = '';
		if (!pinned.loading) return;
		try {
			const g = await load(k, sentence);
			if (pinned?.key === at.key) pinned = { ...pinned, loading: false, info: find(g, w) || info, exact: true, en: g.en };
		} catch (x) {
			err = x.message;
			if (pinned?.key === at.key) pinned = { ...pinned, loading: false };
		}
	}
	const hover = (e, k, s, w) => { clearTimeout(timer); const ev = { currentTarget: e.currentTarget }; timer = setTimeout(() => show(ev, k, s, w, false), 220); };
	const leave = () => { clearTimeout(timer); tip = null; };
	const have = (pt) => S.words.some((w) => wordKey(w.pt) === wordKey(pt));
	const asWord = (p) => ({ pt: p.info.pt || p.word, en: p.info.en, pos: p.info.pos, say: p.info.say, ex: p.sentence.trim(), exEn: p.en || '' });

	function done() {
		if (!S.read[id]) addXP(8);
		S.read[id] = today();
	}
	function remove() {
		S.texts = S.texts.filter((x) => x.id !== id);
		delete S.gloss[id];
		history.back();
	}
	const count = (x) => (meta.chars ? [...x.text.replace(/[\s\p{P}]/gu, '')].length + ' characters' : x.text.trim().split(/\s+/).length + ' words');
</script>

{#if !id}
	<header class="head"><h1>Reading</h1><a class="btn sm" href="/add"><Icon name="plus" size={16} /> Add a text</a></header>
	<div class="stack rise">
		<p class="dim">Short texts to read at your own pace. Point at any word to see what it means, and tap to keep it.</p>
		{#if S.texts.length}
			<p class="eyebrow">Your texts</p>
			{#each S.texts as x (x.id)}
				<a class="item" class:done={S.read[x.id]} href="/read?id={x.id}">
					<span class="dot"><Icon name={S.read[x.id] ? 'check' : 'page'} /></span>
					<span class="grow"><b>{x.title}</b><small>{count(x)}</small></span>
					<Icon name="chev" size={18} />
				</a>
			{/each}
		{/if}
		<p class="eyebrow">Graded texts</p>
		{#each TEXTS as x (x.id)}
			<a class="item" class:done={S.read[x.id]} href="/read?id={x.id}">
				<span class="dot lv">{#if S.read[x.id]}<Icon name="check" />{:else}{x.level}{/if}</span>
				<span class="grow"><b lang={meta.locale}>{x.title}</b><small>{x.titleEn} · {count(x)}</small></span>
				<Icon name="chev" size={18} />
			</a>
		{:else}
			<p class="dim small">No graded texts for this language yet. Add your own from the Add tab.</p>
		{/each}
	</div>
{:else if !text && !loaded}
	<span class="spin"></span>
{:else if !text}
	<div class="stack"><h2>Text not found</h2><a class="btn" href="/read">Back to reading</a></div>
{:else}
	<header class="head">
		<a class="icon-btn" href="/read" aria-label="Back"><Icon name="back" /></a>
		<div class="chips">
			{#if parasEn.length}<button class="chip" class:on={showEn} onclick={() => (showEn = !showEn)}>English</button>{/if}
			{#if text.own}<button class="chip" onclick={remove}><Icon name="trash" size={14} /> Remove</button>{/if}
		</div>
	</header>

	<article class="stack" lang={meta.locale}>
		<div>
			<p class="eyebrow">{text.level || 'Your text'} · {count(text)}</p>
			<h1>{text.title}</h1>
		</div>
		{#each paras as sents, pi}
			<div class="para">
				<p>
					{#each sents as s, si}
						{@const k = pi + ':' + si}
						{#each words(s) as p}{#if p.w}<button class="w" class:known={have(p.t)} class:lit={tip?.key === k + p.t || pinned?.key === k + p.t}
							onpointerenter={(e) => e.pointerType === 'mouse' && hover(e, k, s, p.t)} onpointerleave={leave}
							onclick={(e) => { tip = null; show(e, k, s, p.t, true); }}>{p.t}</button>{:else}{p.t}{/if}{/each}
					{/each}
					<button class="say" onclick={() => speak(sents.join(' '))} aria-label="Hear this paragraph"><Icon name="sound" size={15} /></button>
				</p>
				{#if showEn && parasEn[pi]}<p class="en" lang="en">{parasEn[pi]}</p>{/if}
			</div>
		{/each}
		<button class="btn wide" class:primary={!S.read[id]} onclick={done}>{S.read[id] ? 'Read on ' + S.read[id] : 'I have read it'}</button>
		{#if err}<p class="err" role="alert">{err}</p>{/if}
	</article>

	{#if tip}
		<div class="tip" style:left="{tip.x}px" style:top="{tip.y}px" role="tooltip">
			{#if tip.info}<b>{tip.info.en}</b>{#if tip.info.pos}<i>{tip.info.pos}</i>{/if}{#if tip.info.say}<em>{tip.info.say}</em>{/if}{:else}<span>click to look it up</span>{/if}
		</div>
	{/if}

	{#if pinned}
		<div class="sheet card" in:fly={{ y: 30, duration: 200 }} role="dialog" aria-label="Word meaning">
			<div class="row">
				<span class="grow"><b lang={meta.locale}>{pinned.info?.pt || pinned.word}</b>{#if pinned.info?.say}<em>{pinned.info.say}</em>{/if}</span>
				{#if pinned.info}<Star word={asWord(pinned)} src={text.title} />{/if}
				<button class="icon-btn sm" onclick={() => speak(pinned.info?.pt || pinned.word)} aria-label="Hear it"><Icon name="sound" size={16} /></button>
				<button class="icon-btn sm" onclick={() => (pinned = null)} aria-label="Close"><Icon name="x" size={16} /></button>
			</div>
			{#if pinned.loading}
				<p class="dim small row"><span class="spin"></span> Looking it up...</p>
			{:else if pinned.info}
				<p>{pinned.info.en}{#if pinned.info.pos} <span class="pos">{pinned.info.pos}</span>{/if}</p>
				{#if pinned.en}<p class="dim small">{pinned.en}</p>{/if}
				{#if !pinned.exact}<button class="link" onclick={(e) => show({ currentTarget: document.querySelector('.w.lit') || e.currentTarget }, pinned.k, pinned.sentence, pinned.word, true, true)}>This is the general meaning. Explain it in this sentence</button>{/if}
				{#if have(pinned.info.pt || pinned.word)}
					<p class="small" style="color:var(--ok)">In your word bank.</p>
				{:else}
					<button class="btn primary sm" onclick={() => addWords([asWord(pinned)], text.title)}><Icon name="plus" size={16} /> Save to my word bank</button>
				{/if}
			{:else}
				<p class="dim small">No meaning found for this word.</p>
			{/if}
		</div>
	{/if}
{/if}

<style>
	.lv { font: 500 12px var(--mono); }
	article p { font-size: 20px; line-height: 1.75; }
	.para { display: grid; gap: 6px; }
	.en { font-size: 15px !important; line-height: 1.55 !important; color: var(--dim); }
	.w { background: none; border: 0; padding: 0; margin: 0; color: inherit; font: inherit; cursor: pointer; border-radius: 6px; transition: background 0.12s; }
	.w:hover, .w.lit { background: var(--glass2); }
	.w.known { text-decoration: underline; text-decoration-color: var(--rose); text-underline-offset: 5px; }
	.link { background: none; border: 0; padding: 0; color: var(--rose); font: 400 13px var(--font); text-align: left; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
	.say { background: none; border: 0; color: var(--faint); cursor: pointer; padding: 0 0 0 6px; vertical-align: middle; }
	.tip { position: fixed; z-index: 30; transform: translate(-50%, calc(-100% - 8px)); max-width: 280px; padding: 8px 12px; border-radius: 14px; background: var(--solid); color: var(--on-solid); font-size: 14px; pointer-events: none; display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; box-shadow: 0 10px 30px -10px var(--shadow); }
	.tip b { font-weight: 500; }
	.tip i, .pos { font: 500 10px var(--mono); letter-spacing: 0.06em; text-transform: uppercase; font-style: normal; opacity: 0.7; }
	.tip em { font: 400 12px var(--mono); font-style: normal; opacity: 0.8; }
	.tip .spin { border-color: transparent; border-top-color: var(--on-solid); }
	.sheet { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(env(safe-area-inset-bottom) + 84px); width: min(484px, calc(100% - 36px)); z-index: 20; display: grid; gap: 8px; background: linear-gradient(160deg, var(--card-a), var(--card-b)), var(--bg); border: 1px solid var(--line); box-shadow: 0 20px 50px -16px var(--shadow); }
	.sheet b { font-size: 20px; font-weight: 500; }
	.sheet em { display: block; font: 400 12px var(--mono); color: var(--rose); font-style: normal; }
	.sheet .pos { padding: 3px 8px; border-radius: 999px; background: var(--glass2); margin-left: 6px; }
	@media (min-width: 900px) { .sheet { left: calc(50% + 114px); bottom: 28px; } }
</style>
