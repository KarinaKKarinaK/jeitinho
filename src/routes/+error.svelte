<script>
	import { page } from '$app/state';
</script>

<div class="stack" style="min-height:60dvh;justify-content:center">
	<p class="eyebrow">{page.status}</p>
	<h1>{page.status === 404 ? 'This page does not exist' : 'Something went wrong'}</h1>
	<p class="dim">{page.status === 404 ? 'The link may be old or mistyped.' : 'Try again in a moment. Your progress is safe on this device.'}</p>
	<a class="btn primary" href="/" style="align-self:flex-start">Back to the app</a>
</div>
