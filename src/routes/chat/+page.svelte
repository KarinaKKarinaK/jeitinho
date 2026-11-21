<script>
	import { tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import Icon from '../../lib/Icon.svelte';
	import { S, addXP, addFix } from '../../lib/store.svelte.js';
	import { ai, speak, record, hear } from '../../lib/fx.js';
	import { cloud } from '../../lib/cloud.svelte.js';
	import { pack, t, meta } from '../../lib/lang.js';

	const scenes = pack.chat.scenes;
	let scene = $state(scenes[0]);
	let msg = $state('');
	let busy = $state(false);
	let err = $state('');
	let showEn = $state({});
	let end = $state();
	let stop = $state(null);
	let unsure = []; // words the recogniser was not sure it heard, from the last voice message
	const CLEAR = 0.6; // below this confidence a spoken word is shown as unclear; raise it to flag more

	// voice mode: tap the mic, speak, tap again. What was heard is sent as your message.
	async function talk() {
		err = '';
		try {
			if (!stop) return void (stop = await record());
			const done = stop;
			stop = null;
			busy = true;
			const h = await hear(await done(), S.pass);
			msg = h.text;
			unsure = [...new Set((h.words || []).filter((w) => w.c < CLEAR).map((w) => w.w))].slice(0, 8);
			busy = false;
			if (msg.trim()) await send();
			else err = 'Heard nothing. Try again a bit closer to the phone.';
		} catch (e) {
			stop = null;
			busy = false;
			err = e.name === 'NotAllowedError' ? 'Allow the microphone to use voice mode.' : e.message;
		}
	}

	async function send() {
		const content = msg.trim();
		if (!content || busy) return;
		msg = '';
		err = '';
		busy = true;
		S.chat.push({ role: 'user', content, ...(unsure.length && { unsure }) });
		unsure = [];
		await tick();
		end?.scrollIntoView({ behavior: 'smooth' });
		try {
			const r = await ai('chat', { scene, messages: S.chat.slice(-12).map(({ role, content }) => ({ role, content })) }, S.pass);
			Object.assign(S.chat[S.chat.length - 1], { fix: r.fix, kind: r.fix ? r.kind : '', tip: r.tip });
			if (r.fix) addFix({ bad: content, fix: r.fix, kind: r.kind, tip: r.tip });
			S.chat.push({ role: 'assistant', content: r.reply, en: r.en, say: r.say });
			if (S.chat.length > 60) S.chat.splice(0, S.chat.length - 60);
			addXP(2);
			speak(r.reply);
		} catch (e) {
			err = e.message;
		}
		busy = false;
		await tick();
		end?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<header class="head">
	<div><h1>{t.chat}</h1><p class="dim small">{pack.chat.who}</p></div>
	<span class="grow"></span>
	{#if S.fixes.length}<a class="chip" href="/mistakes">Mistakes {S.fixes.length}</a>{/if}
	{#if S.chat.length}<button class="icon-btn sm" aria-label="Clear chat" onclick={() => (S.chat = [])}><Icon name="trash" size={16} /></button>{/if}
</header>

<div class="chips scenes">
	{#each scenes as s}<button class="chip" class:on={scene === s} onclick={() => (scene = s)}>{s}</button>{/each}
</div>

<div class="log">
	{#each S.chat as m, i}
		<div class="m {m.role}" in:fly={{ y: 10, duration: 200 }}>
			{#if m.role === 'assistant'}
				<div class="bubble">
					<p>{m.content}</p>
					{#if m.say}<p class="small" style="color:var(--rose)">{m.say}</p>{/if}
					{#if showEn[i]}<p class="dim small">{m.en}</p>{/if}
					<div class="row tools">
						<button onclick={() => speak(m.content)} aria-label="Hear it"><Icon name="sound" size={16} /></button>
						{#if m.en}<button onclick={() => (showEn[i] = !showEn[i])}>EN</button>{/if}
					</div>
				</div>
			{:else}
				<div class="bubble">{m.content}</div>
				{#if m.fix}<p class="fix">{#if m.kind}<span class="kind">{m.kind}</span>{:else}<Icon name="check" size={14} />{/if} {m.fix}</p>{/if}
				{#if m.tip}<p class="tip">{m.tip}</p>{/if}
				{#if m.unsure?.length}<p class="tip">Not clearly heard, tap to listen: {#each m.unsure as w}<button class="heard" onclick={() => speak(w)}>{w}</button>{/each}</p>{/if}
			{/if}
		</div>
	{:else}
		<p class="dim" style="text-align:center;margin-top:40px">{pack.chat.hint}</p>
	{/each}
	{#if busy}<div class="m assistant"><div class="bubble"><span class="spin"></span></div></div>{/if}
	{#if err}<p class="err" role="alert">{err}</p>{/if}
	<div bind:this={end}></div>
</div>

<form class="send" onsubmit={(e) => { e.preventDefault(); send(); }}>
	<input type="text" bind:value={msg} lang={meta.locale} placeholder={pack.chat.placeholder} autocomplete="off" maxlength="600" enterkeyhint="send" />
	{#if cloud.stt}<button type="button" class="icon-btn" class:rec={!!stop} disabled={busy} onclick={talk} aria-label={stop ? 'Stop and send' : 'Speak your message'}><Icon name={stop ? 'check' : 'mic'} size={20} /></button>{/if}
	<button class="icon-btn solid" disabled={busy || !msg.trim()} aria-label="Send"><Icon name="send" size={20} /></button>
</form>

<style>
	.scenes { flex-wrap: nowrap; overflow-x: auto; margin: 0 -18px 18px; padding: 0 18px; scrollbar-width: none; }
	.scenes::-webkit-scrollbar { display: none; }
	.log { display: flex; flex-direction: column; gap: 12px; padding-bottom: 80px; }
	.m { display: grid; gap: 4px; max-width: 86%; }
	.m.user { align-self: flex-end; justify-items: end; }
	.bubble { padding: 12px 16px; border-radius: 22px 22px 22px 6px; background: var(--glass2); border: 1px solid var(--line); display: grid; gap: 6px; }
	.user .bubble { border-radius: 22px 22px 6px 22px; background: var(--grad); border: 0; color: var(--hero-ink); }
	.tools button { background: none; border: 0; color: var(--dim); font: 500 11px var(--mono); cursor: pointer; padding: 4px 6px 0 0; display: flex; }
	.fix { font-size: 14px; color: var(--ok); display: flex; gap: 6px; align-items: baseline; text-align: right; }
	.kind { font: 500 10px var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--amber); border: 1px solid var(--line); border-radius: 999px; padding: 3px 8px; white-space: nowrap; }
	.heard { background: none; border: 0; border-bottom: 1px dashed var(--amber); color: var(--ink); font: inherit; cursor: pointer; padding: 0; margin-left: 8px; }
	.tip { font-size: 13px; color: var(--dim); text-align: right; }
	.send { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(env(safe-area-inset-bottom) + 84px); width: min(484px, calc(100% - 36px)); display: flex; gap: 8px; z-index: 5; }
	.rec { background: var(--bad); color: #17121c; animation: pulse 0.9s ease-in-out infinite; }
	@keyframes pulse { 50% { box-shadow: 0 0 0 10px rgba(255, 143, 143, 0); } from, to { box-shadow: 0 0 0 0 rgba(255, 143, 143, 0.6); } }
	@media (min-width: 900px) { .send { left: calc(50% + 114px); bottom: 28px; width: min(700px, calc(100% - 336px)); } }
	.send input { border-radius: 999px; background: var(--nav); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
</style>
