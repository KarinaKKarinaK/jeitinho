<script>
	import { onMount } from 'svelte';
	import Icon from '../../lib/Icon.svelte';
	import { S, reset, clean } from '../../lib/store.svelte.js';
	import { P, voicesFor, voiceOf, savePrefs, setKey, unlock } from '../../lib/prefs.js';
	import { cloud } from '../../lib/cloud.svelte.js';
	import { speak, today } from '../../lib/fx.js';
	import { meta, pack, lang, AVAILABLE } from '../../lib/lang.js';

	const VOICES = voicesFor(lang);
	import { retakeAt } from '../../lib/roadmap.js';

	// a live copy of the settings; every change is saved straight away
	let p = $state({ ...P, key: undefined });
	// the API key is handled apart: typed once, then only its last four characters are ever shown
	let draft = $state('');
	let tail = $state('');
	const showTail = () => (tail = P.key ? P.key.slice(-4) : '');
	async function saveKey() {
		err = note = '';
		const k = draft.trim();
		if (!/^sk-or-[\w-]{20,200}$/.test(k)) return void (err = 'That does not look like an OpenRouter key. It starts with sk-or-.');
		await setKey(k);
		draft = '';
		showTail();
		note = 'Key saved, encrypted on this device.';
	}
	async function dropKey() {
		await setKey('');
		showTail();
		note = 'Key removed from this device.';
	}
	$effect(() => savePrefs($state.snapshot(p)));

	let pushOn = $state(false);
	let busy = $state(false);
	let note = $state('');
	let err = $state('');
	let armed = $state(false);
	// Links that open the reminder straight in a calendar, at the chosen hour, with no file to download.
	const cal = $derived.by(() => {
		const [h, m] = p.notifyAt.split(':').map(Number);
		const start = new Date();
		start.setHours(h, m, 0, 0);
		const end = new Date(start.getTime() + 10 * 60000);
		const stamp = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`;
		const title = 'jeitinho: daily quiz';
		const link = `${location.origin}/quiz`;
		return {
			google: 'https://calendar.google.com/calendar/render?' + new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${stamp(start)}/${stamp(end)}`, recur: 'RRULE:FREQ=DAILY', details: `Your daily quiz: ${link}`, ctz: Intl.DateTimeFormat().resolvedOptions().timeZone }),
			// webcal opens the Calendar app's own "subscribe" sheet instead of downloading a file
			apple: `webcal://${location.host}/api/reminder?t=${p.notifyAt}`,
			outlook: 'https://outlook.live.com/calendar/0/deeplink/compose?' + new URLSearchParams({ path: '/calendar/action/compose', rru: 'addevent', subject: title, startdt: start.toISOString(), enddt: end.toISOString(), body: `Your daily quiz: ${link}` })
		};
	});
	const GOALS = [5, 10, 15, 30, 45];
	let customGoal = $state(!GOALS.includes(P.goalMin));
	const canPush = typeof Notification !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window;
	const wait = retakeAt(S);
	// one short sample sentence per language; every voice's copy is fetched when this page opens,
	// so tapping a voice plays from the browser's cache instead of waiting for the voice service
	const sample = pack.seed.filter((w) => w.ex && w.ex.length <= 40).sort((a, b) => a.ex.length - b.ex.length)[0]?.ex || pack.seed[0].pt;

	// settings changed on another device arrive through the account: show them
	onMount(() => {
		const fresh = () => (p = { ...P, key: undefined });
		addEventListener('jeitinho:prefs', fresh);
		return () => removeEventListener('jeitinho:prefs', fresh);
	});

	onMount(async () => {
		if (cloud.tts || !cloud.ready) for (const [id] of VOICES) if (id !== 'device') fetch(`/api/tts?l=${lang}&v=${id}&t=${encodeURIComponent(sample.trim())}`).catch(() => {});
		await unlock();
		showTail();
		if (canPush) pushOn = !!(await (await navigator.serviceWorker.getRegistration())?.pushManager.getSubscription());
	});

	// the reminder hour is stored in UTC so the server needs no time zones
	const utcHour = (hhmm) => {
		const d = new Date();
		d.setHours(+hhmm.slice(0, 2), 0, 0, 0);
		return d.getUTCHours();
	};
	const keyBytes = (b64) => Uint8Array.from(atob(b64.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
	const call = async (method, body) => {
		const r = await fetch('/api/push', { method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
		if (!r.ok) throw new Error((await r.json().catch(() => ({}))).message || 'Could not save the reminder.');
	};

	async function push(on) {
		busy = true;
		err = note = '';
		try {
			const reg = await navigator.serviceWorker.ready;
			if (on) {
				if ((await Notification.requestPermission()) !== 'granted') throw new Error('Notifications are blocked for this site. Allow them in your browser or phone settings, then try again.');
				const sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(cloud.push) }));
				await call('POST', { endpoint: sub.endpoint, hour: utcHour(p.notifyAt) });
				note = `You will get a reminder every day around ${p.notifyAt.slice(0, 2)}:00.`;
			} else {
				const sub = await reg.pushManager.getSubscription();
				if (sub) {
					await call('DELETE', { endpoint: sub.endpoint });
					await sub.unsubscribe();
				}
				note = 'Reminders are off.';
			}
			pushOn = on;
		} catch (e) {
			err = e.message;
		}
		busy = false;
	}

	function exportData() {
		const a = document.createElement('a');
		const { pass, uid, ...mine } = $state.snapshot(S); // the passcode and the account link do not belong in a file you may share
		a.href = URL.createObjectURL(new Blob([JSON.stringify(mine)], { type: 'application/json' }));
		a.download = `jeitinho-${meta.short.toLowerCase()}-${today()}.json`;
		a.click();
	}
	async function importData(e) {
		err = note = '';
		try {
			const d = JSON.parse(await e.target.files[0].text());
			if (!Array.isArray(d.words)) throw 0;
			Object.assign(S, clean(d), { pass: S.pass, uid: S.uid }); // only known fields of the right kind; never the passcode or the account link
			note = 'Backup loaded.';
		} catch {
			err = 'That file is not a jeitinho backup.';
		}
	}
</script>

<header class="head"><h1>Settings</h1></header>

<div class="stack rise">
	<div>
		<p class="dim small" style="margin-top:8px">{cloud.user ? 'Saved to your account as you change them, so they apply on every device you sign in on. Your own AI key and reminders stay on this device.' : 'Saved on this device as you change them. Sign in to carry them to your other devices.'}</p>
	</div>

	<section class="card stack">
		<h3>Appearance</h3>
		<div class="tabs" role="group" aria-label="Theme">
			{#each [['dark', 'Dark'], ['light', 'Light'], ['auto', 'Match device']] as [k, label]}
				<button class:on={p.theme === k} onclick={() => (p.theme = k)}>{label}</button>
			{/each}
		</div>
	</section>

	<section class="card stack" id="languages">
		<h3>Languages</h3>
		<p class="dim small">Untick the ones you are not learning to hide them from the language switcher. Their progress is kept.</p>
		{#each AVAILABLE as l}
			<label class="sw">
				<input type="checkbox" checked={!p.hidden.includes(l.code)} disabled={l.code === lang} onchange={() => (p.hidden = p.hidden.includes(l.code) ? p.hidden.filter((c) => c !== l.code) : [...p.hidden, l.code])} />
				<span>{l.label} <span class="dim">· {l.name}{l.code === lang ? ' · the one you are in' : ''}</span></span>
			</label>
		{/each}
	</section>

	<section class="card stack">
		<h3>Voice</h3>
		<div class="chips">
			{#each VOICES as [id, name, about]}
				<button class="chip" class:on={(p.voice === 'auto' ? voiceOf(lang) : p.voice) === id} title={about} onclick={() => { p.voice = id; savePrefs({ voice: id }); speak(sample); }}>{name}</button>
			{/each}
		</div>
		<p class="dim small">{VOICES.find((v) => v[0] === (p.voice === 'auto' ? voiceOf(lang) : p.voice))?.[2]}. Tap a voice to hear it. {cloud.tts ? 'The six named voices are the same cloud voices in every language, shown under local names; they speak with a light foreign accent. Device voice is your phone\'s own voice for this language, usually the most native.' : 'Cloud voices are not set up on this server, so the device voice is used.'}</p>
		<label class="small dim">Speed: {p.rate}<input type="range" min="0.5" max="1.2" step="0.1" bind:value={p.rate} /></label>
		<label class="sw"><input type="checkbox" bind:checked={p.autoplay} /><span>Read the answer aloud after each question</span></label>
		<label class="sw"><input type="checkbox" bind:checked={p.sfx} /><span>Sounds and vibration for right and wrong</span></label>
	</section>

	<section class="card stack">
		<h3>Daily quiz</h3>
		<div class="row"><span class="grow dim">Questions</span>
			<div class="tabs">{#each [7, 11, 15] as n}<button class:on={p.quizLen === n} onclick={() => (p.quizLen = n)}>{n}</button>{/each}</div>
		</div>
		<label class="sw"><input type="checkbox" bind:checked={p.quizAudio} /><span>Listening questions (turn off when you cannot play sound)</span></label>
		<label class="sw"><input type="checkbox" bind:checked={p.quizDrills} /><span>Grammar drills mixed in with your words</span></label>
		{#if pack.drill.pool().some((c) => c.tone)}<label class="sw"><input type="checkbox" bind:checked={p.quizTones} /><span>Tone questions (turn off to skip tone practice)</span></label>{/if}
		<p class="dim small">Quiz changes apply from the next quiz that is built.</p>
	</section>

	<section class="card stack">
		<h3>Daily goal</h3>
		<div class="row"><span class="grow dim">Minutes a day</span>
			<div class="tabs">
				{#each GOALS as n}<button class:on={p.goalMin === n && !customGoal} onclick={() => { customGoal = false; p.goalMin = n; }}>{n}</button>{/each}
				<button class:on={customGoal} onclick={() => (customGoal = true)}>Custom</button>
			</div>
		</div>
		{#if customGoal}
			<label class="row small dim"><span class="grow">Your own goal, in minutes (1 to 240)</span>
				<input class="num" type="number" min="1" max="240" step="1" inputmode="numeric" value={p.goalMin} aria-label="Minutes a day"
					oninput={(e) => { const n = Math.round(+e.target.value); if (n >= 1 && n <= 240) p.goalMin = n; }} />
			</label>
		{/if}
		<p class="dim small">The day rings on the home screen fill as you study toward {p.goalMin} minutes. Go past it and a second lap starts.</p>
	</section>

	<section class="card stack">
		<h3>Daily reminder</h3>
		{#if cloud.push && canPush}
			<div class="row"><span class="grow dim">Remind me at</span>
				<select bind:value={p.notifyAt} onchange={() => pushOn && push(true)} aria-label="Reminder hour">
					{#each Array.from({ length: 24 }, (_, h) => String(h).padStart(2, '0') + ':00') as h}<option value={h}>{h}</option>{/each}
				</select>
			</div>
			<button class="btn" class:primary={!pushOn} disabled={busy} onclick={() => push(!pushOn)}>{#if busy}<span class="spin"></span>{:else}<Icon name="bell" size={18} /> {pushOn ? 'Turn reminders off' : 'Turn on notifications'}{/if}</button>
			<p class="dim small">One notification a day, on the hour. On iPhone, add the app to your home screen first and turn this on from there.</p>
		{:else}
			<p class="dim small">{cloud.push ? 'This browser does not support notifications. On iPhone, add the app to your home screen and open it from there.' : 'Notifications are not set up on this server.'}</p>
		{/if}
		<p class="dim small">Or put a repeating reminder in your calendar:</p>
		<div class="chips">
			<a class="btn sm" href={cal.google} target="_blank" rel="noopener noreferrer">Google Calendar</a>
			<a class="btn sm" href={cal.apple}>Apple Calendar</a>
			<a class="btn sm" href={cal.outlook} target="_blank" rel="noopener noreferrer">Outlook</a>
		</div>
		<p class="dim small">Google opens a daily event ready to save. Apple subscribes to a small calendar with the daily reminder. Outlook opens the event; choose "Repeat: daily" there before saving.</p>
	</section>

	<section class="card stack">
		<h3>Your own AI model</h3>
		<p class="dim small">Optional. The app uses free models, which can be slow or busy. Paste your own OpenRouter key and any model name to use a stronger one. You pay OpenRouter for what you use.</p>
		{#if tail}
			<div class="row"><span class="grow">Key saved: <code>sk-or-••••{tail}</code></span><button class="btn sm" onclick={dropKey}>Remove</button></div>
		{:else}
			<div class="row">
				<input class="grow" type="password" bind:value={draft} placeholder="sk-or-..." autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your OpenRouter key" />
				<button class="btn sm" disabled={!draft.trim()} onclick={saveKey}>Save</button>
			</div>
		{/if}
		<input type="text" bind:value={p.model} placeholder="model, for example anthropic/claude-sonnet-5-5" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Model name" />
		{#if tail && !p.model}<p class="err">Add a model name, or the key is not used.</p>{/if}
		<p class="dim small">The key is encrypted on this device with a key the browser will not let anyone export. It is never shown again, never synced to your account, and never stored on the server.</p>
	</section>

	<section class="card stack">
		<h3>{meta.name}: your data</h3>
		<div class="chips">
			{#if wait}
				<span class="chip" aria-disabled="true">Placement test again on {new Date(wait).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
			{:else}
				<a class="btn sm" href="/welcome">Retake the placement test</a>
			{/if}
			<button class="btn sm" onclick={exportData}>Export backup</button>
			<label class="btn sm">Import backup<input type="file" accept="application/json" hidden onchange={importData} /></label>
		</div>
		<button class="link" class:danger={armed} onclick={() => (armed ? (reset(), (armed = false), (note = `${meta.name} progress on this device was reset.`)) : (armed = true))}>
			{armed ? `Tap again to erase all ${meta.name} progress on this device. This cannot be undone.` : `Reset ${meta.name} progress`}
		</button>
		<label class="small dim">Passcode (only if the server owner set one)<input type="password" bind:value={S.pass} autocomplete="off" /></label>
	</section>

	{#if err}<p class="err" role="alert">{err}</p>{/if}
	{#if note}<p style="color:var(--ok)" role="status">{note}</p>{/if}

	<p class="dim small"><a href="/account" class="u">Account and sync</a> · <a href="/privacy" class="u">Privacy</a></p>
</div>

<style>
	h3 { color: var(--ink); }
	label { display: grid; gap: 8px; }
	.sw { display: flex; align-items: center; gap: 12px; cursor: pointer; color: var(--dim); }
	.sw input { width: 22px; height: 22px; flex: none; accent-color: var(--rose); }
	input[type='range'] { accent-color: var(--rose); width: 100%; }
	.num { width: 96px; padding: 10px 14px; border-radius: 14px; border: 1px solid var(--line); background: var(--field); color: var(--ink); font: 400 16px var(--font); text-align: center; }
	select { width: auto; padding: 10px 16px; border-radius: 14px; }
	.tabs button { height: 34px; padding: 0 14px; font-size: 14px; }
	.link { background: none; border: 0; padding: 0; color: var(--dim); font: 400 14px var(--font); text-align: left; cursor: pointer; }
	.danger { color: var(--bad); }
	.u { text-decoration: underline; text-underline-offset: 3px; }
</style>
