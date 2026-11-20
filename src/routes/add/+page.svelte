<script>
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Icon from '../../lib/Icon.svelte';
	import Star from '../../lib/Star.svelte';
	import { S, addWords } from '../../lib/store.svelte.js';
	import { ai, speak, today } from '../../lib/fx.js';
	import { t, meta } from '../../lib/lang.js';
	import { current, earned } from '../../lib/roadmap.js';
	import { cloud, savePhoto } from '../../lib/cloud.svelte.js';

	let text = $state('');
	let busy = $state('');
	let err = $state('');
	let res = $state(null);
	let off = $state({}); // words the user unticked
	let added = $state(null);

	const isUrl = $derived(/^https?:\/\/\S+$/i.test(text.trim()));

	// phone photos are huge: shrink before upload. Signed in, the photo is kept in your account; signed out, only the transcription.
	async function shrink(file) {
		const img = await createImageBitmap(file);
		const k = Math.min(1, 1400 / Math.max(img.width, img.height));
		const c = Object.assign(document.createElement('canvas'), { width: img.width * k, height: img.height * k });
		c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
		return c.toDataURL('image/jpeg', 0.8);
	}

	async function run(body, label) {
		busy = label;
		err = '';
		res = added = null;
		off = {};
		try {
			// the level steers which words are worth suggesting
			const level = (earned(S) || current(S))?.id.slice(0, 2) || 'A1';
			const r = await ai('import', { ...body, level }, S.pass);
			const id = Date.now().toString(36);
			const img = body.kind === 'photo' ? await savePhoto(id, body.image).catch(() => '') : '';
			S.materials.unshift({ id, img, date: today(), type: r.type, title: r.title, url: r.url || '', summary: r.summary, notes: r.notes, text: r.text || '', lyrics: r.lyrics, words: r.lyrics ? r.words : undefined });
			if (r.steps?.length) S.custom['m-' + id] = { title: r.title, steps: r.steps };
			// a song opens its own page: lyrics to tap through, words to keep, then the quiz
			if (r.lyrics?.length) return void (await goto(`/song?id=${id}`));
			res = { ...r, id, img };
			text = '';
		} catch (e) {
			err = e.message;
		}
		busy = '';
	}

	const go = () => run(isUrl ? { kind: 'link', url: text.trim() } : { kind: 'text', text }, isUrl ? 'Reading the link...' : 'Reading...');
	async function photo(e) {
		const f = e.target.files[0];
		e.target.value = '';
		if (f) run({ kind: 'photo', image: await shrink(f) }, 'Transcribing your notes...');
	}
	function save() {
		added = addWords(res.words.filter((_, i) => !off[i]), res.title);
	}
</script>

<header class="head"><h1>{t.add}</h1></header>

<div class="stack rise">
	<div class="card stack">
		<p class="eyebrow">{t.linkText}</p>
		<textarea bind:value={text} placeholder="Paste a Spotify song link, an article, a YouTube video, or any text in {meta.name}"></textarea>
		<div class="row">
			<button class="btn primary grow" disabled={!!busy || text.trim().length < 8} onclick={go}>
				{#if busy}<span class="spin"></span> {busy}{:else}<Icon name={isUrl ? 'link' : 'bolt'} size={18} /> {isUrl ? 'Import link' : 'Find the good words'}{/if}
			</button>
			<label class="icon-btn" aria-label="Photo of lesson notes" title="Photo of lesson notes">
				<Icon name="camera" /><input type="file" accept="image/*" hidden onchange={photo} disabled={!!busy} />
			</label>
		</div>
		{#if err}<p class="err" role="alert">{err}</p>{/if}
	</div>

	{#if res}
		<div class="card stack" in:fly={{ y: 20, duration: 260 }}>
			<p class="eyebrow">{res.type} · saved</p>
			<h2>{res.title}</h2>
			{#if res.warn}<p class="small" style="color:var(--amber)">{res.warn}</p>{/if}
			{#if res.summary}<p class="dim">{res.summary}</p>{/if}
			{#if res.steps?.length}<a class="btn primary" href="/lesson?id=m-{res.id}"><Icon name="music" size={18} /> Start the song lesson</a>{/if}

			{#if res.words.length}
				<div class="stack" style="gap:8px">
					{#each res.words as w, i}
						<label class="w" class:off={off[i]}>
							<input type="checkbox" checked={!off[i]} onchange={() => (off[i] = !off[i])} />
							<span class="grow"><b>{w.pt}</b> <small>{w.en}</small>{#if w.say}<em>{w.say}</em>{/if}</span>
							<Star word={w} src={res.title} />
							<button class="icon-btn sm" onclick={(e) => { e.preventDefault(); speak(w.pt); }} aria-label="Hear {w.pt}"><Icon name="sound" size={16} /></button>
						</label>
					{/each}
				</div>
				{#if added === null}
					<button class="btn wide" onclick={save}>Add {res.words.length - Object.values(off).filter(Boolean).length} words to my bank</button>
				{:else}
					<p style="color:var(--ok)">{added} new words added. They will show up in your daily quiz.</p>
				{/if}
			{/if}

			{#each res.notes || [] as n}<p class="small note">{n}</p>{/each}
			{#if res.lyrics}
				<details><summary class="dim">Lyrics with translation</summary>
					<div class="lyrics">{#each res.lyrics as l}<p>{l.pt}<span>{l.en}</span></p>{/each}</div>
				</details>
			{/if}
			{#if res.type === 'photo'}<p class="small dim">{res.img ? 'Photo saved to your account.' : cloud.user ? 'The photo could not be saved, only the transcription.' : 'Sign in to keep the photo itself. Signed out, only the transcription is saved.'}</p>{/if}
			{#if res.text && res.type === 'photo'}<details><summary class="dim">Transcription</summary><p class="small dim" style="white-space:pre-wrap;margin-top:10px">{res.text}</p></details>{/if}
		</div>
	{/if}

	<div class="card stack" style="gap:10px">
		<p class="eyebrow">What works</p>
		<p class="small dim"><b>Spotify track link</b>: finds the lyrics and translates them line by line. Tap words to keep them, then take a quiz on the song.</p>
		<p class="small dim"><b>Article link or pasted text</b>: pulls out the words worth learning.</p>
		<p class="small dim"><b>Camera button</b>: photo of your lesson notes, transcribed into your bank.</p>
		<p class="small dim">Everything is kept under {t.bank}, Saved.</p>
	</div>
</div>

<style>
	.w { display: flex; align-items: center; gap: 12px; padding: 10px 10px 10px 14px; border-radius: 20px; border: 1px solid var(--line); background: var(--glass); cursor: pointer; transition: opacity 0.2s; }
	.w.off { opacity: 0.4; }
	.w input { width: 20px; height: 20px; accent-color: var(--rose); flex: none; }
	.w b { font-weight: 500; }
	.w small { color: var(--dim); }
	.w em { display: block; font: 400 12px var(--mono); color: var(--rose); font-style: normal; }
	.note { padding-left: 12px; border-left: 2px solid var(--mauve); }
	.small b { color: var(--ink); font-weight: 500; }
	summary { cursor: pointer; }
	.lyrics { margin-top: 12px; }
	.lyrics p { margin-bottom: 10px; }
	.lyrics span { display: block; color: var(--dim); font-size: 14px; }
</style>
