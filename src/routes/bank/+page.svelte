<script>
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import Icon from '../../lib/Icon.svelte';
	import Star from '../../lib/Star.svelte';
	import Conj from '../../lib/Conj.svelte';
	import Tones from '../../lib/Tones.svelte';
	import Built from '../../lib/Built.svelte';
	import { hsk } from '../../lib/zhdata.js';
	import { lang } from '../../lib/lang.js';
	import { S, addXP, addWords, newCollection, dropCollection, toggleIn, removeWord, forget } from '../../lib/store.svelte.js';
	import { grade, norm, longEnough, parseWordList, wordKey, synOf } from '../../lib/quiz.js';
	import { speak, today, ai } from '../../lib/fx.js';
	import { POS } from '../../lib/langs/meta.js';
	import { t, meta } from '../../lib/lang.js';
	import { cloud, photoUrl, dropPhoto } from '../../lib/cloud.svelte.js';

	let tab = $state(page.url.searchParams.get('tab') || 'words');
	let q = $state('');
	let open = $state(null);
	let flip = $state(false);
	let np = $state('');
	let ne = $state('');
	let now = $state(Date.now());

	let scope = $state('all'); // all | star | a collection id: narrows both the list and the review
	let pos = $state(''); // part of speech filter
	let nc = $state(''); // name for a new collection
	let naming = $state(false);
	let busy = $state(''); // id of the word an example is being written for
	let err = $state('');
	let npos = $state('');

	// Mandarin: the HSK 1 to 3 word lists. Each level works like a collection you can filter and review,
	// and the words you do not have yet can be added in one go.
	let hskList = $state([]);
	if (lang === 'zh') hsk().then((l) => (hskList = l));
	const hskLevel = $derived(new Map(hskList.map((w) => [wordKey(w.pt), w.level])));
	const hskOf = (w) => hskLevel.get(wordKey(w.pt));
	const hskN = $derived(scope.startsWith('hsk') ? +scope.slice(3) : 0);
	const hskAll = $derived(hskList.filter((w) => w.level === hskN));
	const hskMissing = $derived(hskAll.filter((w) => !S.words.some((x) => wordKey(x.pt) === wordKey(w.pt))));
	const inScope = (w) => scope === 'all' || (scope === 'star' ? w.star : scope.startsWith('hsk') ? hskOf(w) === +scope.slice(3) : w.cols?.includes(scope));
	const shown = $derived(S.words.filter((w) => inScope(w) && (!pos || w.pos === pos) && (!q || norm(w.pt + ' ' + w.en + ' ' + (w.note || '')).includes(norm(q)))));
	const tags = $derived(POS.filter((p) => S.words.some((w) => w.pos === p)));
	// due = overdue reviews first, then words never reviewed
	const due = $derived(S.words.filter((w) => inScope(w) && w.due <= now).sort((a, b) => b.reps - a.reps || a.due - b.due));
	const scopeName = $derived(scope === 'all' ? '' : scope === 'star' ? 'Starred' : scope.startsWith('hsk') ? 'HSK ' + scope.slice(3) : S.cols.find((c) => c.id === scope)?.name || '');

	function makeCollection() {
		if (!nc.trim()) return;
		scope = newCollection(nc);
		nc = '';
		naming = false;
	}
	// ask the model for a fresh example sentence with this word
	async function example(w) {
		busy = w.id;
		err = '';
		try {
			const r = await ai('example', { word: w.pt, en: w.en, old: w.ex }, S.pass);
			w.ex = r.ex;
			w.exEn = r.exEn;
			w.exSay = r.read || '';
		} catch (e) {
			err = e.message;
		}
		busy = '';
	}
	const card = $derived(due[0]);

	function rate(g) {
		grade(card, g);
		addXP(1);
		flip = false;
		now = Date.now();
	}
	function add() {
		const pt = np.trim();
		if (!addWords([{ pt, en: ne.trim(), pos: npos }], 'manual')) return;
		const w = S.words[0];
		if (scope !== 'all' && scope !== 'star') toggleIn(w, scope);
		if (scope === 'star') w.star = true;
		np = ne = '';
		// fill in the reading (pinyin with tones, kana) and the part of speech in the background
		ai('define', { word: pt, line: '' }, S.pass).then((r) => {
			if (!w.say && r.say) w.say = r.say;
			if (!w.pos && r.pos) w.pos = r.pos;
		}).catch(() => {});
	}
	// import a word list: a file (Anki text export, CSV) or rows pasted from a spreadsheet
	let pasted = $state('');
	let found = $state(null); // { name, list, fresh }
	let importing = $state(false);
	function preview(text, name) {
		const have = new Set(S.words.map((w) => wordKey(w.pt)));
		const list = parseWordList(text).map((w) => ({ ...w, pos: POS.includes(w.pos) ? w.pos : '' }));
		found = { name, list, fresh: list.filter((w) => !have.has(wordKey(w.pt))).length };
	}
	async function pickFile(e) {
		const f = e.target.files[0];
		e.target.value = '';
		if (!f) return;
		if (/\.(apkg|colpkg|xlsx?|numbers)$/i.test(f.name)) return void (err = /apkg|colpkg/i.test(f.name) ? 'That is an Anki package. In Anki choose File, Export, "Notes in Plain Text (.txt)" and import that file.' : 'Spreadsheet files cannot be read directly. Save it as CSV, or copy the rows and paste them below.');
		err = '';
		preview(await f.text(), f.name.replace(/\.[^.]+$/, ''));
	}
	function bringIn(asCollection) {
		const name = found.name || 'Imported';
		const keys = new Set(found.list.map((w) => wordKey(w.pt)));
		const n = addWords(found.list, name);
		if (asCollection) {
			const id = newCollection(name);
			for (const w of S.words) if (keys.has(wordKey(w.pt))) toggleIn(w, id);
			scope = id;
		}
		found = { ...found, done: n };
		pasted = '';
	}

	function anki() {
		// tab-separated file that Anki imports directly: front, back, example
		const tsv = S.words.map((w) => [w.pt, [w.en, w.say, w.pos, w.note].filter(Boolean).join(' · '), `${w.ex} ${w.exEn}`.trim()].map((c) => c.replace(/[\t\n]/g, ' ')).join('\t')).join('\n');
		const a = document.createElement('a');
		a.href = URL.createObjectURL(new Blob([tsv], { type: 'text/tab-separated-values' }));
		a.download = `jeitinho-anki-${today()}.txt`;
		a.click();
	}
</script>

<header class="head">
	<h1>{t.bank}</h1>
	<div class="tabs">
		{#each [['words', 'Words'], ['review', `Review ${due.length || ''}`], ['saved', 'Saved']] as [k, label]}
			<button class:on={tab === k} onclick={() => (tab = k)}>{label}</button>
		{/each}
	</div>
</header>

{#if tab === 'review'}
	{#if card}
		{#key card.id}
			<div class="stack" in:fly={{ y: 16, duration: 220 }}>
				<button class="card flash" onclick={() => { flip = true; speak(card.pt); }}>
					<p class="eyebrow">{card.reps ? 'Review' : 'New word'}{scopeName ? ` · ${scopeName}` : ''}{card.pos ? ` · ${card.pos}` : ''}</p>
					<h2>{card.en}</h2>
					{#if flip}
						<div class="back" in:fly={{ y: 10, duration: 200 }}>
							<div class="row"><h1 class="grow" lang={meta.locale}>{card.pt}</h1><Star word={card} size={24} /></div>
							{#if card.say}<p class="say"><Tones text={card.say} /></p>{/if}
							{#if synOf(card).length}<p class="small dim">Similar: {#each synOf(card) as x, i}{i ? ', ' : ''}<span class="syn" lang={meta.locale}>{x.pt}</span>{#if x.say} <Tones text={x.say} />{/if}{/each}</p>{/if}
							{#if card.ex}<p>{card.ex}</p><p class="dim small">{card.exEn}</p>{/if}
							{#if card.note}<p class="small" style="color:var(--amber)">{card.note}</p>{/if}
						</div>
					{:else}
						<p class="dim small">Say it out loud, then tap to check</p>
					{/if}
				</button>
				{#if flip}
					<div class="grades">
						{#each [['Again', 0, 'var(--bad)'], ['Hard', 1, 'var(--amber)'], ['Good', 2, 'var(--ok)'], ['Easy', 3, 'var(--lime)']] as [label, g, c]}
							<button class="btn" style:color={c} onclick={() => rate(g)}>{label}</button>
						{/each}
					</div>
				{/if}
				<p class="dim small" style="text-align:center">{due.length} left</p>
			</div>
		{/key}
	{:else}
		<div class="card stack" style="text-align:center"><h2>{t.allDone}</h2><p class="dim">Nothing due. Add words from a song or an article.</p><a class="btn primary" href="/add">Add material</a></div>
	{/if}
{:else if tab === 'saved'}
	<div class="stack">
		{#each S.materials as m, i (m.id)}
			<details class="card">
				<summary><span class="eyebrow">{m.type} · {m.date}</span><b>{m.title}</b></summary>
				<div class="stack" style="margin-top:14px">
					{#if m.img && cloud.user}{#await photoUrl(m.img) then src}{#if src}<img {src} alt="Your lesson notes" loading="lazy" style="width:100%;border-radius:18px" />{/if}{/await}{/if}
					{#if m.summary}<p class="dim">{m.summary}</p>{/if}
					{#each m.notes || [] as n}<p class="small">{n}</p>{/each}
					{#if m.lyrics}
						<div class="lyrics">{#each m.lyrics as l}<p>{l.pt}<span>{l.en}</span></p>{/each}</div>
					{/if}
					{#if m.text}<p class="small dim" style="white-space:pre-wrap">{m.text}</p>{/if}
					<div class="chips">
						{#if m.lyrics?.length}<a class="btn sm primary" href="/song?id={m.id}">Open song</a>{:else if S.custom['m-' + m.id]}<a class="btn sm primary" href="/lesson?id=m-{m.id}">Start lesson</a>{/if}
						{#if m.text && longEnough(m.text)}
							{#if S.texts.some((x) => x.id === 'u-' + m.id)}<a class="btn sm" href="/read?id=u-{m.id}">Open in Reading</a>
							{:else}<button class="btn sm" onclick={() => S.texts.unshift({ id: 'u-' + m.id, title: m.title, text: m.text.slice(0, 8000), date: m.date })}>Add to reading practice</button>{/if}
						{/if}
						{#if /^https?:\/\//i.test(m.url || '')}<a class="btn sm" href={m.url} target="_blank" rel="noopener noreferrer">Open link</a>{/if}
						<button class="btn sm" onclick={() => { if (m.img) dropPhoto(m.img); forget(m.id); S.materials.splice(i, 1); }}>Delete</button>
					</div>
				</div>
			</details>
		{:else}
			<div class="card stack" style="text-align:center"><h2>Nothing saved yet</h2><p class="dim">Links, songs and photos of your lesson notes land here.</p><a class="btn primary" href="/add">Add material</a></div>
		{/each}
	</div>
{:else}
	<div class="stack">
		<input type="text" bind:value={q} placeholder="Search {S.words.length} words" />
		<div class="chips filters">
			<button class="chip" class:on={scope === 'all'} onclick={() => (scope = 'all')}>All</button>
			<button class="chip" class:on={scope === 'star'} onclick={() => (scope = 'star')}><Icon name="star" size={14} fill={scope === 'star'} /> Starred</button>
			{#each S.cols as c (c.id)}
				<button class="chip" class:on={scope === c.id} onclick={() => (scope = c.id)}><Icon name="folder" size={14} /> {c.name}</button>
			{/each}
			{#each [...new Set(hskList.map((w) => w.level))] as n}
				<button class="chip" class:on={scope === 'hsk' + n} onclick={() => (scope = 'hsk' + n)}>HSK {n}</button>
			{/each}
			<button class="chip" onclick={() => (naming = !naming)}><Icon name="plus" size={14} /> Collection</button>
		</div>
		{#if naming}
			<form class="row" onsubmit={(e) => { e.preventDefault(); makeCollection(); }}>
				<input class="grow" type="text" bind:value={nc} placeholder="Collection name, for example Travel" maxlength="40" />
				<button class="btn sm primary" disabled={!nc.trim()}>Create</button>
			</form>
		{/if}
		{#if tags.length}
			<div class="chips filters">
				{#each tags as p}<button class="chip tag" class:on={pos === p} onclick={() => (pos = pos === p ? '' : p)}>{p}</button>{/each}
			</div>
		{/if}
		{#if scope !== 'all'}
			<div class="row small dim">
				<span class="grow">{shown.length} {shown.length === 1 ? 'word' : 'words'} in {scopeName}</span>
				{#if due.length}<button class="btn sm" onclick={() => (tab = 'review')}>Review {due.length}</button>{/if}
				{#if scope !== 'star' && !hskN}<button class="btn sm" onclick={() => { dropCollection(scope); scope = 'all'; }}>Delete collection</button>{/if}
			</div>
			{#if hskN}
				<div class="card stack" style="gap:10px">
					<div class="row"><b class="grow">HSK {hskN}</b><span class="small dim">{hskAll.length - hskMissing.length} of {hskAll.length} words in your bank</span></div>
					<div class="bar"><i style:width="{hskAll.length ? ((hskAll.length - hskMissing.length) / hskAll.length) * 100 : 0}%"></i></div>
					{#if hskMissing.length}
						<!-- the higher levels are long: add them a batch at a time so reviews do not pile up -->
						<div class="row" style="flex-wrap:wrap">
							{#if hskMissing.length > 60}<button class="btn sm primary" onclick={() => addWords($state.snapshot(hskMissing.slice(0, 50)).reverse(), 'HSK ' + hskN)}><Icon name="plus" size={16} /> Add the next 50</button>{/if}
							<button class="btn sm" class:primary={hskMissing.length <= 60} onclick={() => addWords($state.snapshot(hskMissing).reverse(), 'HSK ' + hskN)}><Icon name="plus" size={16} /> Add all {hskMissing.length} missing</button>
						</div>
					{:else}
						<p class="small" style="color:var(--ok)">You have every word of this level. Review them until they stick.</p>
					{/if}
				</div>
			{/if}
		{/if}

		{#each shown.slice(0, 120) as w (w.id)}
			<div class="card word">
				<div class="row">
					<button class="row grow open" onclick={() => (open = open === w.id ? null : w.id)}>
						<span class="grow"><b lang={meta.locale}>{w.pt}</b>{#if meta.chars && w.say}<em><Tones text={w.say} /></em>{/if}<small>{w.en}</small></span>
						{#if hskOf(w)}<span class="pos hsk">HSK {hskOf(w)}</span>{/if}
						{#if w.pos}<span class="pos">{w.pos}</span>{/if}
						<span class="lvl" title="Review interval in days">{w.ivl ? w.ivl + 'd' : 'new'}</span>
					</button>
					<Star word={w} />
				</div>
				{#if open === w.id}
					<div class="stack" style="gap:10px;margin-top:12px" in:fly={{ y: -6, duration: 160 }}>
						{#if w.say && !meta.chars}<p class="say">{w.say}</p>{/if}
						<Built word={w.pt} />
						{#if synOf(w).length}<p class="small dim">Similar: {#each synOf(w) as x, i}{i ? ', ' : ''}<button class="syn" lang={meta.locale} onclick={() => speak(x.pt)}>{x.pt}</button>{#if x.say} <Tones text={x.say} />{/if}{/each}</p>{/if}
						{#if w.ex}<div><p lang={meta.locale}>{w.ex}</p>{#if w.exSay}<p class="say">{w.exSay}</p>{/if}<p class="dim small">{w.exEn}</p></div>{/if}
						<div class="chips">
							<button class="btn sm" onclick={() => speak(w.ex || w.pt)}><Icon name="sound" size={16} /> {t.hear}</button>
							<button class="btn sm" disabled={busy === w.id} onclick={() => example(w)}>{#if busy === w.id}<span class="spin"></span>{:else}<Icon name="spark" size={16} />{/if} New example</button>
						</div>
						{#if w.pos === 'verb'}
							<details class="cj"><summary class="small">{meta.locale.startsWith('zh') ? 'How this verb is used' : 'Conjugation'}</summary><div style="margin-top:10px"><Conj word={w} /></div></details>
						{/if}
						<label class="small dim">Your note<textarea bind:value={w.note} rows="2" placeholder="A memory hook, where you heard it, a mistake to avoid..."></textarea></label>
						<label class="small dim">Part of speech
							<select bind:value={w.pos}><option value="">not set</option>{#each POS as p}<option value={p}>{p}</option>{/each}</select>
						</label>
						{#if S.cols.length}
							<div><p class="small dim" style="margin-bottom:6px">Collections</p>
								<div class="chips">{#each S.cols as c (c.id)}<button class="chip" class:on={w.cols?.includes(c.id)} onclick={() => toggleIn(w, c.id)}><Icon name={w.cols?.includes(c.id) ? 'check' : 'folder'} size={14} /> {c.name}</button>{/each}</div>
							</div>
						{:else}
							<p class="small dim">Make a collection with the button above to file this word in it.</p>
						{/if}
						<button class="btn sm" style="align-self:flex-start" onclick={() => removeWord(w)}><Icon name="trash" size={16} /> Remove</button>
					</div>
				{/if}
			</div>
		{:else}
			<p class="dim" style="text-align:center;padding:20px 0">{scope === 'star' ? 'No starred words yet. Tap the star next to any word in the app.' : 'No words match.'}</p>
		{/each}
		{#if shown.length > 120}<p class="dim small" style="text-align:center">Showing 120 of {shown.length}. Search or filter to narrow it down.</p>{/if}
		{#if err}<p class="err" role="alert">{err}</p>{/if}
		<div class="card stack">
			<p class="eyebrow">Add a word{scopeName ? ` to ${scopeName}` : ''}</p>
			<input type="text" bind:value={np} placeholder={meta.label} autocapitalize="off" lang={meta.locale} />
			<input type="text" bind:value={ne} placeholder="English meaning" />
			<select bind:value={npos} aria-label="Part of speech"><option value="">Part of speech (filled in for you if left empty)</option>{#each POS as p}<option value={p}>{p}</option>{/each}</select>
			<div class="chips">
				<button class="btn sm primary" disabled={!np.trim() || !ne.trim()} onclick={add}>Add</button>
				<button class="btn sm" onclick={anki}>Export for Anki</button>
			</div>
			{#if meta.chars}<p class="dim small">Type the characters. The reading is added for you.</p>{/if}
		</div>

		<div class="card stack">
			<p class="eyebrow">Import a word list</p>
			<p class="dim small">From Anki (File, Export, "Notes in Plain Text"), a CSV file, or rows copied from Excel or Google Sheets. Columns: word, meaning, then optionally example and its translation. A header row is understood.</p>
			<div class="chips">
				<label class="btn sm"><Icon name="page" size={16} /> Choose a file<input type="file" accept=".txt,.csv,.tsv,text/plain,text/csv" hidden onchange={pickFile} /></label>
				<button class="btn sm" onclick={() => (importing = !importing)}>Paste rows</button>
			</div>
			{#if importing}
				<textarea bind:value={pasted} rows="4" placeholder="Paste rows here, one word per line"></textarea>
				<button class="btn sm" style="align-self:flex-start" disabled={!pasted.trim()} onclick={() => preview(pasted, 'Pasted words')}>Read these rows</button>
			{/if}
			{#if found}
				{#if found.done !== undefined}
					<p style="color:var(--ok)">{found.done} {found.done === 1 ? 'word' : 'words'} added. They will show up in your reviews and daily quiz.</p>
				{:else if !found.list.length}
					<p class="err">No words found. Each line needs at least a word and its meaning, separated by a tab, comma or semicolon.</p>
				{:else}
					<p>Found <b>{found.list.length}</b> {found.list.length === 1 ? 'word' : 'words'}, <b>{found.fresh}</b> new to your bank.</p>
					<div class="small dim">{#each found.list.slice(0, 3) as w}<p>{w.pt} · {w.en}{w.ex ? ` · ${w.ex}` : ''}</p>{/each}{#if found.list.length > 3}<p>and {found.list.length - 3} more</p>{/if}</div>
					<div class="chips">
						<button class="btn sm primary" disabled={!found.fresh} onclick={() => bringIn(true)}>Import into a collection "{found.name}"</button>
						<button class="btn sm" disabled={!found.fresh} onclick={() => bringIn(false)}>Import without a collection</button>
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}

<style>
	.head { flex-wrap: wrap; gap: 12px; }
	.flash { width: 100%; min-height: 300px; text-align: left; color: var(--ink); font: inherit; cursor: pointer; display: flex; flex-direction: column; gap: 14px; }
	.back { display: grid; gap: 8px; margin-top: auto; padding-top: 18px; border-top: 1px solid var(--line); }
	.syn { background: none; border: 0; padding: 0; font: inherit; color: var(--ink); cursor: pointer; }
	.hsk { color: var(--rose); border-color: color-mix(in srgb, var(--rose) 40%, transparent); }
	.bar { height: 6px; border-radius: 9px; background: var(--glass2); overflow: hidden; }
	.bar i { display: block; height: 100%; border-radius: 9px; background: var(--rose); transition: width 0.4s; }
	.say { font: 400 13px var(--mono); color: var(--rose); letter-spacing: 0.02em; }
	.grades { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
	.grades .btn { padding: 0; font-size: 14px; }
	.word { padding: 14px 18px; border-radius: 22px; }
	.word .open { background: none; border: 0; padding: 0; color: inherit; font: inherit; text-align: left; cursor: pointer; min-width: 0; }
	.word em { display: block; font: 400 13px var(--mono); color: var(--rose); font-style: normal; }
	.cj summary { display: block; cursor: pointer; color: var(--rose); font-weight: 500; }
	.pos { font: 500 10px var(--mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--dim); padding: 4px 8px; border-radius: 999px; background: var(--glass2); white-space: nowrap; }
	.filters { flex-wrap: nowrap; overflow-x: auto; margin: 0 -18px; padding: 0 18px 2px; scrollbar-width: none; }
	.filters::-webkit-scrollbar { display: none; }
	.filters .chip { display: inline-flex; align-items: center; gap: 6px; flex: none; }
	.tag { height: 30px; font: 500 11px var(--mono); letter-spacing: 0.05em; text-transform: uppercase; }
	label { display: grid; gap: 6px; }
	textarea { min-height: 64px; font-size: 15px; }
	select { padding: 12px 14px; border-radius: 16px; font-size: 15px; }
	.word b { display: block; font-weight: 500; font-size: 17px; }
	.word small { color: var(--dim); }
	.lvl { font: 400 11px var(--mono); color: var(--faint); }
	summary { cursor: pointer; display: grid; gap: 8px; list-style: none; }
	summary::-webkit-details-marker { display: none; }
	summary b { font-weight: 500; font-size: 18px; }
	.lyrics p { margin-bottom: 10px; }
	.lyrics span { display: block; color: var(--dim); font-size: 14px; }
</style>
