# jeitinho

Mobile-first web app for learning Brazilian Portuguese (with Belo Horizonte dialect). SvelteKit 3 + Svelte 5 runes, plain JavaScript, deployed on Vercel.

- Install: `npm install`. Dev: `npm run dev`. Build: `npm run build`. Test: `npm test` (Node test runner, `src/lib/logic.test.js`).
- Pages are client-only (`ssr = false`, prerendered). All user state is one object in localStorage (`src/lib/store.svelte.js`), mirrored to Supabase when signed in (`src/lib/cloud.svelte.js`, table in `supabase/schema.sql`).
- `src/lib/conj.js` conjugator, `src/lib/quiz.js` answer check + SRS + daily quiz, `src/lib/content.js` course and seed words, `src/lib/roadmap.js` stages and checkpoint tests, `src/lib/Exercise.svelte` question runner.
- Server code: `src/routes/api/ai` (ops: import, chat, lesson, grade), `api/tts` (ElevenLabs voice), `api/stt` (Deepgram speech to text), `api/config` (public settings and which keys exist), `api/reminder` (calendar file), `src/lib/server/safefetch.js`. Offline cache: `src/service-worker.js`.
- Rules:
  - Only free OpenRouter models. Keep the `isFree` filter in the AI route.
  - LLM output is untrusted: pass lesson steps through `cleanSteps`, never render it with `{@html}`.
  - User-supplied URLs go through `safeFetch` (blocks private addresses).
  - No em dashes or emojis in UI copy. Only runtime dependency is `@supabase/supabase-js`, loaded lazily. Do not add more.
  - New state fields go in `blank()` in the store so old saves and synced rows still load.
  - Never expose the Supabase service role key; the browser only gets the anon key.
  - Use relative imports, not `$lib`.
  - Paid services are off limits: every key is a free plan with no card, and each feature must fall back or switch off when its key is missing.
- Env (all optional, see `.env.example`): `OPENROUTER_API_KEY`, `ELEVENLABS_API_KEY`, `DEEPGRAM_API_KEY`, `SUPABASE_URL` + `SUPABASE_ANON_KEY`, `APP_PASSCODE`. Real keys go in `.env`, which is git-ignored.
