<script>
	// The course as a board-game path: one tile per step, snaking down the page from chapter to chapter.
	// Each chapter has its own colour. Tiles are: the chapter start, its lessons, and the quiz that opens the next one.
	import Icon from './Icon.svelte';
	import { S } from './store.svelte.js';
	import { UNITS } from './content.js';
	import { chapterOpen, chapterPassed, chapterReady } from './roadmap.js';

	const COLORS = ['#e9a8c9', '#b592d6', '#f4b06a', '#dfe56a', '#7fd6c4', '#8fb8f2', '#f29a9a'];
	let width = $state(0);
	const cols = $derived(width >= 760 ? 7 : width >= 520 ? 5 : 4);

	// every step of the course, in order
	const steps = $derived(
		UNITS.flatMap((u, c) => {
			const open = chapterOpen(S, c);
			const passed = chapterPassed(S, c);
			const color = COLORS[c % COLORS.length];
			return [
				{ kind: 'start', c, color, open, done: passed, title: u.title, sub: u.sub },
				...u.lessons.map((l, i) => ({ kind: 'lesson', c, color, open, done: l.id in S.done, title: l.title, sub: l.sub, n: i + 1, href: `/lesson?id=${l.id}`, count: l.steps.length })),
				{ kind: 'quiz', c, color, open: open && chapterReady(S, c), done: passed, title: `Chapter ${c + 1} quiz`, sub: passed ? 'Passed. You can retake it.' : open ? (chapterReady(S, c) ? '10 questions, 8 to pass. It opens the next chapter.' : 'Finish the lessons of this chapter first.') : `Pass the chapter ${c} quiz first.`, href: `/chapter?i=${c}` }
			];
		})
	);
	// where you are: the first step that is open and not done
	const here = $derived(steps.findIndex((s) => s.kind !== 'start' && s.open && !s.done));
	let picked = $state(-1);
	const sel = $derived(steps[picked >= 0 ? picked : Math.max(0, here)]);
	// A winding road, as on a board game: a row of tiles runs across, one tile steps down at the end,
	// then the next row runs back the other way. The gaps between the rows are what make it read as a path.
	const place = (i) => {
		const lap = Math.floor(i / (cols + 1)); // one row plus its turn tile
		const pos = i % (cols + 1);
		const back = lap % 2 === 1;
		if (pos < cols) return { row: lap * 2 + 1, col: (back ? cols - 1 - pos : pos) + 1, turn: false };
		return { row: lap * 2 + 2, col: back ? 1 : cols, turn: true };
	};
	const rows = $derived(place(steps.length - 1).row);
</script>

<div class="card stack info" style:--c={sel.color}>
	<p class="eyebrow">Chapter {sel.c + 1}{sel.kind === 'lesson' ? ` · lesson ${sel.n}` : sel.kind === 'quiz' ? ' · quiz' : ''}{sel.done ? ' · done' : sel.open ? '' : ' · locked'}</p>
	<h2>{sel.title}</h2>
	<p class="dim small">{sel.kind === 'start' && !sel.open ? `Pass the chapter ${sel.c} quiz to open this chapter.` : sel.sub}</p>
	{#if sel.href && sel.open}
		<a class="btn primary" href={sel.href}>{sel.kind === 'quiz' ? (sel.done ? 'Retake the quiz' : 'Take the quiz') : sel.done ? 'Do it again' : 'Start'}{sel.count ? `, ${sel.count} steps` : ''}</a>
	{:else if sel.kind !== 'start'}
		<span class="btn" aria-disabled="true"><Icon name="lock" size={18} /> Locked</span>
	{/if}
</div>

<div class="board" bind:clientWidth={width} style:--cols={cols} style:--rows={rows}>
	{#each steps as s, i}
		{@const p = place(i)}
		<button class="tile {s.kind}" class:done={s.done} class:locked={!s.open && !s.done} class:here={i === here} class:sel={s === sel}
			style:grid-row={p.row} style:grid-column={p.col} style:--c={s.color}
			aria-label="{s.title}{s.done ? ', done' : s.open ? '' : ', locked'}" onclick={() => (picked = i)}>
			{#if s.kind === 'start'}
				<b>{s.c + 1}</b>
			{:else if s.kind === 'quiz'}
				<Icon name={s.done ? 'check' : s.open ? 'flag' : 'lock'} size={22} />
			{:else if s.done}
				<Icon name="check" size={20} />
			{:else}
				<span class="n">{s.n}</span>
			{/if}
			<small>{s.kind === 'start' ? s.title : s.kind === 'quiz' ? 'Quiz' : s.title}</small>
		</button>
	{/each}
</div>

<style>
	.info { border-left: 6px solid var(--c); }
	.info .btn { align-self: flex-start; }
	.board {
		position: relative; display: grid; grid-template-columns: repeat(var(--cols), 1fr); gap: 6px; padding: 10px; border-radius: 28px;
		/* the ground the road runs over: a faint dot-matrix field */
		background-image: radial-gradient(var(--dot) 1.2px, transparent 1.6px); background-size: 12px 12px;
	}
	.tile {
		position: relative; aspect-ratio: 1; border: 0; border-radius: 16px; padding: 6px; cursor: pointer; overflow: hidden;
		display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
		font: inherit; color: #1c1622; background: color-mix(in srgb, var(--c) 62%, #fff);
		transition: transform 0.18s var(--spring), box-shadow 0.2s, filter 0.2s;
	}
	/* dot-matrix texture: a fine grid of dots fading from one corner */
	.tile::before {
		content: ''; position: absolute; inset: 0; pointer-events: none;
		background-image: radial-gradient(rgba(28, 22, 34, 0.32) 1px, transparent 1.4px); background-size: 6px 6px;
		mask-image: linear-gradient(135deg, #000, transparent 65%); -webkit-mask-image: linear-gradient(135deg, #000, transparent 65%);
	}
	.tile > :global(*) { position: relative; }
	.tile:active { transform: scale(0.93); }
	.tile small { font-size: 10px; line-height: 1.15; text-align: center; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-weight: 500; }
	.tile b { font: 500 26px/1 var(--mono); }
	.n { font: 500 15px/1 var(--mono); opacity: 0.75; }
	.start { background: var(--c); border-radius: 22px; }
	.quiz { background: color-mix(in srgb, var(--c) 40%, #1c1622); color: #fff; }
	.quiz::before { background-image: radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1.4px); }
	.done:not(.start) { background: color-mix(in srgb, var(--c) 88%, #fff); }
	/* locked tiles keep a wash of their chapter's colour, so the whole road is in colour from the start */
	.locked { background: color-mix(in srgb, var(--c) 26%, var(--bg)); color: color-mix(in srgb, var(--c) 45%, var(--ink)); }
	.locked.start { background: color-mix(in srgb, var(--c) 40%, var(--bg)); }
	.locked.quiz { background: color-mix(in srgb, var(--c) 30%, var(--bg)); }
	.locked::before { opacity: 0.45; }
	.sel { box-shadow: 0 0 0 3px var(--ink); }
	.here { animation: here 1.6s ease-in-out infinite; z-index: 1; }
	@keyframes here { 50% { box-shadow: 0 0 0 4px var(--ink), 0 0 0 10px color-mix(in srgb, var(--c) 45%, transparent); transform: scale(1.04); } }
	@media (hover: hover) { .tile:hover { transform: translateY(-3px); filter: brightness(1.06); } }
</style>
