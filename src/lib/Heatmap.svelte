<script>
	// Minutes studied per day, laid out like a GitHub contribution graph: weeks run left to right with
	// month names above, weekdays run top to bottom, and the last column ends today.
	// Every square is the same size. It shows as many weeks as fit the width, up to about ten months.
	// Colour strength follows the minutes.
	import { S } from './store.svelte.js';
	import { today, DAY } from './fx.js';

	let width = $state(0);
	const CELL = 15, GAP = 4, LABELS = 30;
	const weeks = $derived(Math.max(10, Math.min(44, Math.floor((width - LABELS + GAP) / (CELL + GAP)))));
	const end = new Date();
	const cols = $derived(
		Array.from({ length: weeks }, (_, c) =>
			Array.from({ length: 7 }, (_, r) => {
				const d = new Date(end.getTime() - ((weeks - 1 - c) * 7 + end.getDay() - r) * DAY);
				return { key: today(d), d, future: d > end, label: d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }) };
			})
		)
	);
	// a month name sits above the first week that starts in that month
	const months = $derived(
		cols.map((week, c) => {
			const m = week[0].d.getMonth();
			return c === 0 || cols[c - 1][0].d.getMonth() !== m ? week[0].d.toLocaleDateString(undefined, { month: 'short' }) : '';
		})
	);
	const days = Array.from({ length: 7 }, (_, r) => new Date(2024, 0, 7 + r).toLocaleDateString(undefined, { weekday: 'short' }));
	// opacity as in a heat map: a faint tint for a minute or two, full colour from 45 minutes
	const heat = (m) => (m > 0 ? 0.22 + 0.78 * Math.min(1, m / 45) : 0);
	const total = $derived(Math.round(Object.values(S.mins || {}).reduce((a, b) => a + b, 0)));
	const active = $derived(Object.values(S.mins || {}).filter((m) => m > 0).length);
</script>

<div class="wrap" bind:clientWidth={width}>
	{#if width}
		<div class="graph" style:--n={weeks} role="img" aria-label="Minutes studied per day over the last {weeks} weeks">
			<span></span>
			{#each months as m}<span class="mo">{m}</span>{/each}
			{#each days as name, r}
				<span class="wd">{r % 2 ? name : ''}</span>
				{#each cols as week}
					{@const c = week[r]}
					<i class:sx={c.future} style:--o={heat(S.mins?.[c.key] || 0)} title="{c.label}: {Math.round(S.mins?.[c.key] || 0)} min"></i>
				{/each}
			{/each}
		</div>
	{/if}
</div>
<p class="dim small row" style="gap:6px">{total} {total === 1 ? 'minute' : 'minutes'} on {active} {active === 1 ? 'day' : 'days'} <span class="grow"></span> less <i class="k" style:--o={0}></i><i class="k" style:--o={0.3}></i><i class="k" style:--o={0.55}></i><i class="k" style:--o={0.8}></i><i class="k" style:--o={1}></i> more</p>

<style>
	.wrap { width: 100%; min-height: 150px; }
	/* one label column, then a column per week that stretches to fill the card */
	/* fixed columns: a month name may spill over its column but can never stretch it */
	.graph { display: grid; grid-template-columns: 26px repeat(var(--n), 15px); grid-auto-rows: 15px; gap: 4px; align-items: center; justify-content: space-between; }
	.graph > :first-child, .mo { grid-row: 1; height: 14px; }
	.mo, .wd { font: 400 10px var(--mono); color: var(--faint); white-space: nowrap; overflow: visible; min-width: 0; width: 15px; }
	.wd { width: 26px; }
	/* rounded squares; the accent colour is laid over the empty cell at an opacity set by the minutes */
	i { display: block; border-radius: 4px; background: linear-gradient(color-mix(in srgb, var(--rose) calc(var(--o, 0) * 100%), transparent) 0 0), var(--glass2); }
	.graph i { width: 15px; height: 15px; transition: transform 0.15s; }
	.graph i:hover { transform: scale(1.25); }
	.k { width: 12px; height: 12px; flex: none; border-radius: 3px; }
	.sx { visibility: hidden; }
</style>
