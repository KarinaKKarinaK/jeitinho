<script>
	import Icon from '../../lib/Icon.svelte';
</script>

<header class="head">
	<a class="icon-btn" href="/" aria-label="Back"><Icon name="back" /></a>
</header>

<article class="stack rise">
	<div>
		<p class="eyebrow">Privacy</p>
		<h1>What this app<br />knows about you</h1>
		<p class="dim small" style="margin-top:10px">Short version: no ads, no tracking, no selling data. Last updated 20 November 2026.</p>
	</div>

	<section class="card stack">
		<h3>Without an account</h3>
		<p class="dim">Your progress, word bank, saved material, settings and the minutes you study each day stay in this browser, on this device. Nothing about you is stored on a server.</p>
	</section>

	<section class="card stack">
		<h3>With an account</h3>
		<p class="dim">We store your email address (or your Google or GitHub sign-in), your progress in each language, and any photos of notes you choose to save. This is kept in a Supabase database. Only you can read your rows and photos.</p>
	</section>

	<section class="card stack">
		<h3>When you use the AI features</h3>
		<p class="dim">What you send is passed to an outside service so it can answer, and to nobody else:</p>
		<ul class="dim">
			<li><b>OpenRouter</b>: text you import, chat messages, writing you ask to have graded, and photos of notes you transcribe. Free AI models may keep what they receive to improve their service, so do not send anything private.</li>
			<li><b>Deepgram</b>: your voice recordings, only when you press record.</li>
			<li><b>ElevenLabs</b>: the phrases the app reads aloud.</li>
			<li><b>LRCLIB, Spotify and YouTube</b>: the song or video you paste a link to.</li>
			<li><b>Your own AI key</b>: if you add one in Settings it is kept encrypted on your device and never shown again. It is sent with your own requests so they can be answered, and is never stored on the server or synced to your account.</li>
		</ul>
		<p class="dim">Your name and email are never sent to these services.</p>
	</section>

	<section class="card stack">
		<h3>Daily reminders</h3>
		<p class="dim">If you turn on notifications, we store the address your browser gives us for sending them and the hour you chose. It is not linked to your account or email, the notification carries no personal content, and turning reminders off deletes it.</p>
	</section>

	<section class="card stack">
		<h3>What we do not do</h3>
		<p class="dim">No advertising, no analytics, no tracking cookies, no sale or sharing of your data. The only things stored in your browser are your progress and your sign-in session.</p>
	</section>

	<section class="card stack">
		<h3>Deleting your data</h3>
		<p class="dim">On this device: clear this site's data in your browser. In your account: open <a href="/account">Account</a> and choose "Delete my cloud data". To remove the account itself, open an issue on the project page and it will be deleted.</p>
	</section>

	<p class="dim small">jeitinho is a free, open source project, hosted on Vercel. The code is public, so you can check all of the above: <a href="https://github.com/KarinaKKarinaK/jeitinho" target="_blank" rel="noopener noreferrer">source on GitHub</a>.</p>
</article>

<style>
	ul { margin: 0; padding-left: 18px; display: grid; gap: 8px; }
	li b, .dim a { color: var(--ink); font-weight: 500; }
	a { text-decoration: underline; text-underline-offset: 3px; }
	.card h3 { color: var(--ink); }
</style>
