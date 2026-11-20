<script>
	import Icon from '../../lib/Icon.svelte';
	import { S } from '../../lib/store.svelte.js';
	import { STAGES, current, milestones, ready } from '../../lib/roadmap.js';
	import { t } from '../../lib/lang.js';

	const now = $derived(current(S));
	const list = $derived(now ? milestones(S, now) : []);
	const open = $derived(now && ready(S, now));
	const count = $derived(STAGES.filter((s) => S.badges[s.id]).length);
</script>

<header class="head">
	<a class="icon-btn" href="/" aria-label="Back"><Icon name="back" /></a>
	<span class="dim small">{count} of {STAGES.length} badges</span>
</header>

<div class="stack rise">
	<div>
		<p class="eyebrow">{t.roadmap}</p>
		<h1>Zero to C2</h1>
		<p class="dim small" style="margin-top:8px">Hit the milestones, pass the checkpoint test, earn the badge. These are jeitinho's own checkpoints modeled on CEFR, not an official certificate.</p>
	</div>

	<ol>
		{#each STAGES as s}
			{@const got = S.badges[s.id]}
			{@const here = s === now}
			<li class:got class:here class:locked={!got && !here}>
				<div class="badge {s.band}" aria-hidden="true">{#if got}<Icon name="check" size={20} />{:else}{s.id}{/if}</div>
				<div class="body">
					<p class="lvl">{s.id}{#if got} · earned {got}{/if}</p>
					<h3>{s.title}</h3>
					<p class="dim small">{s.can}</p>

					{#if here}
						<div class="card stack" style="margin-top:12px;gap:14px">
							{#each list as m}
								<a class="ms" class:ok={m.ok} href={m.href}>
									<span class="tick">{#if m.ok}<Icon name="check" size={14} />{/if}</span>
									<span class="grow">
										<span>{m.label}</span>
										<span class="bar"><i style:width="{(m.have / m.need) * 100}%"></i></span>
									</span>
									<small>{m.have}/{m.need}</small>
								</a>
							{/each}
							{#if open}
								<a class="btn primary wide" href="/checkpoint">Take the {s.id} test</a>
							{:else}
								<button class="btn wide" disabled>Test unlocks after the milestones</button>
							{/if}
							<p class="dim small">{s.n} questions or more, {Math.round(s.pass * 100)}% to pass. Drills on {s.tenses.length} {s.tenses.length === 1 ? 'topic' : 'topics'} plus words from your own bank{s.band === 'A' ? '' : ', then full sentences to hear, say and write'}.</p>
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ol>
	{#if !now}<div class="card"><h2>Quase nativo</h2><p class="dim">Every badge earned. Uai, que trem bão!</p></div>{/if}
</div>

<style>
	ol { list-style: none; margin: 0; padding: 0; display: grid; }
	li { display: grid; grid-template-columns: 56px 1fr; gap: 16px; padding-bottom: 26px; position: relative; }
	li::before { content: ''; position: absolute; left: 27px; top: 56px; bottom: 0; width: 2px; background: var(--line); }
	li:last-child::before { display: none; }
	li.got::before { background: linear-gradient(var(--lime), var(--rose)); }
	.badge { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; font: 500 13px var(--mono); border: 1px solid var(--line); background: var(--glass); color: var(--dim); position: relative; z-index: 1; }
	.here .badge { color: var(--ink); border-color: #fff; box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.07), 0 0 32px -4px rgba(227, 163, 198, 0.7); }
	.got .badge { border: 0; color: #17121c; }
	.got .badge.A { background: linear-gradient(150deg, #f6c6de, var(--rose)); }
	.got .badge.B { background: linear-gradient(150deg, var(--rose), var(--amber)); }
	.got .badge.C { background: linear-gradient(150deg, var(--lime), #9be7c0); }
	.locked { opacity: 0.45; }
	.body { padding-top: 4px; min-width: 0; }
	.lvl { font: 500 11px var(--mono); letter-spacing: 0.1em; color: var(--amber); margin-bottom: 4px; }
	.ms { display: flex; align-items: center; gap: 12px; font-size: 15px; }
	.ms .grow { display: grid; gap: 8px; }
	.ms small { color: var(--dim); font: 400 12px var(--mono); }
	.tick { width: 24px; height: 24px; flex: none; border-radius: 50%; border: 1px solid var(--line); display: grid; place-items: center; }
	.ms.ok .tick { background: var(--ok); border-color: var(--ok); color: #17121c; }
	.bar { height: 5px; border-radius: 5px; background: var(--glass2); overflow: hidden; display: block; }
	.bar i { display: block; height: 100%; border-radius: 5px; background: linear-gradient(90deg, var(--mauve), var(--rose)); }
	.ms.ok .bar i { background: var(--ok); }
</style>
