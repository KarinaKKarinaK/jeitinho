<script>
	// Minutes studied per day, GitHub style: weeks left to right, Sunday at the top, the last column ends today.
	import { S } from './store.svelte.js';
	import { today, DAY } from './fx.js';

	let { weeks = 52 } = $props();
	const end = new Date();
	const cells = $derived(
		Array.from({ length: weeks * 7 }, (_, i) => {
			const d = new Date(end.getTime() - (weeks * 7 - 1 - i - (6 - end.getDay())) * DAY);
			return { key: today(d), future: d > end, label: d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) };
		})
	);
	const shade = (m) => (m >= 30 ? 4 : m >= 15 ? 3 : m >= 5 ? 2 : m > 0 ? 1 : 0);
	const total = $derived(Object.values(S.mins || {}).reduce((a, b) => a + b, 0));
	const active = $derived(Object.values(S.mins || {}).filter((m) => m > 0).length);
</script>

<div class="map" role="img" aria-label="Minutes studied per day over the last {weeks} weeks">
	{#each cells as c}
		<i class="s{c.future ? 'x' : shade(S.mins?.[c.key] || 0)}" title="{c.label}: {Math.round(S.mins?.[c.key] || 0)} min"></i>
	{/each}
</div>
<p class="dim small row" style="gap:6px">{Math.round(total)} minutes on {active} {active === 1 ? 'day' : 'days'} <span class="grow"></span> less <i class="s0 k"></i><i class="s1 k"></i><i class="s2 k"></i><i class="s3 k"></i><i class="s4 k"></i> more</p>

<style>
	/* fixed-size cells, newest week on the right; on a narrow screen the oldest weeks are clipped */
	.map { display: grid; grid-template-rows: repeat(7, 13px); grid-auto-flow: column; grid-auto-columns: 13px; gap: 3px; justify-content: end; overflow: hidden; }
	.map i, .k { display: block; border-radius: 4px; background: var(--glass2); }
	.k { height: 12px; }
	.k { width: 12px; flex: none; }
	.s1 { background: color-mix(in srgb, var(--rose) 35%, var(--glass2)) !important; }
	.s2 { background: color-mix(in srgb, var(--rose) 60%, var(--glass2)) !important; }
	.s3 { background: color-mix(in srgb, var(--rose) 80%, var(--glass2)) !important; }
	.s4 { background: var(--rose) !important; }
	.sx { visibility: hidden; }
</style>
