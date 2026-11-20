<script>
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import Icon from '../../lib/Icon.svelte';
	import Star from '../../lib/Star.svelte';
	import Built from '../../lib/Built.svelte';
	import { S, addWords } from '../../lib/store.svelte.js';
	import { ai, speak } from '../../lib/fx.js';
	import { wordKey, songSteps } from '../../lib/quiz.js';
	import { meta } from '../../lib/lang.js';

	// A song in three moves: read the lyrics and tap what you do not know, pick the words to keep, take the quiz.
	const id = page.url.searchParams.get('id');
	const m = $derived(S.materials.find((x) => x.id === id && x.lyrics?.length));
	let tab = $state('lyrics');
	let tapped = $state(null); // the word being explained
	let err = $state('');

	const have = (pt) => S.words.some((w) => wordKey(w.pt) === wordKey(pt));
	const mine = $derived(m ? S.words.filter((w) => w.src === m.title) : []);
	const suggested = $derived((m?.words || []).filter((w) => !have(w.pt)));
	const questions = $derived(m ? songSteps($state.snapshot(m.lyrics), $state.snapshot(mine), $state.snapshot(S.custom['m-' + id]?.steps)).length : 0);

	// split a line into words in any language, including ones written without spaces
	const seg = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(meta.locale, { granularity: 'word' }) : null;
	const parts = (line) => (seg ? [...seg.segment(line)].map((p) => ({ text: p.segment, word: p.isWordLike })) : line.split(/(\s+)/).map((text) => ({ text, word: /\S/.test(text) })));

	async function tap(word, line) {
		err = '';
		tapped = { pt: word, loading: true };
		try {
			tapped = await ai('define', { word, line: line.pt, lineEn: line.en }, S.pass);
		} catch (e) {
			tapped = null;
			err = e.message;
		}
	}
	const keep = (w) => addWords([w], m.title);
</script>

{#if !m}
	<div class="stack"><h2>Song not found</h2><a class="btn" href="/add">Add a song</a></div>
{:else}
	<header class="head">
		<a class="icon-btn" href="/bank?tab=saved" aria-label="Back"><Icon name="back" /></a>
		<div class="tabs">
			{#each [['lyrics', 'Lyrics'], ['words', `Words ${mine.length || ''}`], ['quiz', 'Quiz']] as [k, label]}
				<button class:on={tab === k} onclick={() => (tab = k)}>{label}</button>
			{/each}
		</div>
	</header>

	<div class="stack">
		<div>
			<p class="eyebrow">Song</p>
			<h2>{m.title}</h2>
			{#if m.summary}<p class="dim small" style="margin-top:8px">{m.summary}</p>{/if}
		</div>

		{#if tab === 'lyrics'}
			<p class="dim small">Tap any word to see what it means here, then keep the ones you want.</p>
			<div class="lyrics">
				{#each m.lyrics as l}
					<div class="line">
						<p lang={meta.locale}>
							{#each parts(l.pt) as p}{#if p.word}<button class="w" class:known={have(p.text)} onclick={() => tap(p.text, l)}>{p.text}</button>{:else}{p.text}{/if}{/each}
							<button class="say" onclick={() => speak(l.pt)} aria-label="Hear this line"><Icon name="sound" size={14} /></button>
						</p>
						{#if l.en}<span>{l.en}</span>{/if}
					</div>
				{/each}
			</div>
			<p class="dim small">Lyrics from LRCLIB. They belong to their writers and publishers and are shown here for your own study.</p>
			<button class="btn primary wide" onclick={() => (tab = 'words')}>Next: pick your words</button>
		{:else if tab === 'words'}
			{#if suggested.length}
				<p class="eyebrow">Suggested from this song</p>
				{#each suggested as w}
					<div class="item"><span class="grow"><b>{w.pt}</b><small>{w.en}</small></span><Star word={w} src={m.title} /><button class="btn sm" onclick={() => keep(w)}><Icon name="plus" size={16} /> Keep</button></div>
				{/each}
				<button class="btn" onclick={() => suggested.forEach(keep)}>Keep all {suggested.length}</button>
			{/if}
			<p class="eyebrow">Your words from this song</p>
			{#each mine as w}
				<div class="item done"><span class="dot"><Icon name="check" size={18} /></span><span class="grow"><b>{w.pt}</b><small>{w.en}</small></span><Star word={w} /><button class="icon-btn sm" onclick={() => speak(w.pt)} aria-label="Hear {w.pt}"><Icon name="sound" size={16} /></button></div>
			{:else}
				<p class="dim small">None yet. Keep a suggestion above, or go back to the lyrics and tap words.</p>
			{/each}
			<button class="btn primary wide" onclick={() => (tab = 'quiz')}>Next: the quiz</button>
		{:else}
			<div class="card stack">
				<h3>{questions} questions on this song</h3>
				<p class="dim">What lines mean, gaps to fill from the lyrics, lines to type by ear, and the {mine.length} {mine.length === 1 ? 'word' : 'words'} you kept. It is built fresh each time, so you can take it again.</p>
				{#if questions}
					<a class="btn primary wide" href="/lesson?id=m-{id}"><Icon name="music" size={18} /> Start the song quiz</a>
				{:else}
					<p class="dim small">This song is too short to build questions from.</p>
				{/if}
				{#if mine.length < 3}<p class="dim small">Tip: keep a few words first. They become questions here and join your daily quiz.</p>{/if}
			</div>
			{#each m.notes || [] as n}<p class="small note">{n}</p>{/each}
		{/if}
		{#if err}<p class="err" role="alert">{err}</p>{/if}
	</div>

	{#if tapped}
		<div class="sheet card" in:fly={{ y: 30, duration: 200 }} role="dialog" aria-label="Word meaning">
			{#if tapped.loading}
				<div class="row"><span class="spin"></span><b>{tapped.pt}</b></div>
			{:else}
				<div class="row">
					<span class="grow"><b>{tapped.pt}</b>{#if tapped.say}<em>{tapped.say}</em>{/if}</span>
					<Star word={tapped} src={m.title} />
					<button class="icon-btn sm" onclick={() => speak(tapped.pt)} aria-label="Hear it"><Icon name="sound" size={16} /></button>
					<button class="icon-btn sm" onclick={() => (tapped = null)} aria-label="Close"><Icon name="x" size={16} /></button>
				</div>
				<p>{tapped.en}</p>
				<Built word={tapped.pt} />
				{#if tapped.note}<p class="dim small">{tapped.note}</p>{/if}
				{#if have(tapped.pt)}
					<p class="small" style="color:var(--ok)">In your word bank.</p>
				{:else}
					<button class="btn primary sm" onclick={() => keep(tapped)}><Icon name="plus" size={16} /> Keep this word</button>
				{/if}
			{/if}
		</div>
	{/if}
{/if}

<style>
	.lyrics { display: grid; gap: 14px; padding-bottom: 8px; }
	.line p { font-size: 19px; line-height: 1.5; }
	.line span { display: block; color: var(--dim); font-size: 14px; }
	.w { background: none; border: 0; padding: 0; margin: 0; color: inherit; font: inherit; cursor: pointer; border-radius: 6px; transition: background 0.15s; }
	.w:hover, .w:active { background: var(--glass2); }
	.w.known { text-decoration: underline; text-decoration-color: var(--rose); text-underline-offset: 4px; }
	.say { background: none; border: 0; color: var(--faint); cursor: pointer; padding: 0 0 0 6px; vertical-align: middle; }
	.item { border-radius: 22px; }
	.note { padding-left: 12px; border-left: 2px solid var(--mauve); }
	.sheet { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(env(safe-area-inset-bottom) + 84px); width: min(484px, calc(100% - 36px)); z-index: 20; display: grid; gap: 8px; background: linear-gradient(160deg, var(--card-a), var(--card-b)), var(--bg); border: 1px solid var(--line); box-shadow: 0 20px 50px -16px var(--shadow); }
	.sheet b { font-size: 20px; font-weight: 500; }
	.sheet em { display: block; font: 400 12px var(--mono); color: var(--rose); font-style: normal; }
	@media (min-width: 900px) { .sheet { left: calc(50% + 114px); bottom: 28px; } }
</style>
