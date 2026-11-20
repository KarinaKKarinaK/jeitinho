<script>
	// A star on any word. If the word is already in your bank it toggles the star;
	// if it is not, starring it also saves it, so nothing you star is lost.
	import Icon from './Icon.svelte';
	import { S, starWord } from './store.svelte.js';
	import { wordKey } from './quiz.js';

	let { word, src = 'starred', size = 20 } = $props();
	const on = $derived(!!word?.pt && S.words.some((w) => w.star && wordKey(w.pt) === wordKey(word.pt)));
</script>

{#if word?.pt}
	<button class="star" class:on aria-pressed={on} aria-label={on ? `Remove the star from ${word.pt}` : `Star ${word.pt}`} onclick={(e) => { e.stopPropagation(); e.preventDefault(); starWord(word, src); }}>
		<Icon name="star" {size} fill={on} />
	</button>
{/if}

<style>
	.star { flex: none; width: 38px; height: 38px; display: inline-grid; place-items: center; background: none; border: 0; border-radius: 50%; color: var(--faint); cursor: pointer; transition: transform 0.2s var(--spring), color 0.2s; }
	.star:active { transform: scale(0.8); }
	.star.on { color: var(--amber); animation: pop 0.35s var(--spring); }
	@keyframes pop { from { transform: scale(0.5) rotate(-30deg); } }
</style>
