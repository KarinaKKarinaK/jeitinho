# jeitinho

Mobile-first web app for learning Brazilian Portuguese (with Belo Horizonte dialect). SvelteKit 3 + Svelte 5 runes, plain JavaScript, deployed on Vercel.

- Install: `npm install`. Dev: `npm run dev`. Build: `npm run build`. Test: `npm test` (Node test runner, `src/lib/logic.test.js`).
- Pages are client-only (`ssr = false`, prerendered). All user state is one object in localStorage, see `src/lib/store.svelte.js`.
- `src/lib/conj.js` conjugator, `src/lib/quiz.js` answer check + SRS + daily quiz, `src/lib/content.js` course and seed words, `src/lib/Exercise.svelte` question runner.
- Only server code: `src/routes/api/ai/+server.js` (ops: import, chat, lesson) and `src/lib/server/safefetch.js`.
- Rules:
  - Only free OpenRouter models. Keep the `isFree` filter in the AI route.
  - LLM output is untrusted: pass lesson steps through `cleanSteps`, never render it with `{@html}`.
  - User-supplied URLs go through `safeFetch` (blocks private addresses).
  - No em dashes or emojis in UI copy. Keep dependencies at zero beyond SvelteKit.
  - Use relative imports, not `$lib`.
- Env: `OPENROUTER_API_KEY`, optional `OPENROUTER_MODELS`, optional `APP_PASSCODE` (see `.env.example`).
