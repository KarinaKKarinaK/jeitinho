# jeitinho

Mobile-first web app for learning Brazilian Portuguese (with Belo Horizonte dialect). SvelteKit 3 + Svelte 5 runes, plain JavaScript, deployed on Vercel.

- Install: `npm install`. Dev: `npm run dev`. Build: `npm run build`. Test: `npm test` (Node test runner).
- Pages are client-only (`ssr = false`, prerendered). All user state is one object in localStorage (`src/lib/store.svelte.js`), mirrored to Supabase when signed in (`src/lib/cloud.svelte.js`, table in `supabase/schema.sql`).
- Languages are packs in `src/lib/langs/<code>.js` (course, starter words, placement test, drills, roadmap stages, interface text). `src/lib/lang.js` loads the active one; `src/lib/langs/kit.js` has the shared helpers; `src/lib/packs.test.js` is the contract every pack must pass. The bigger starter vocabulary sits in `src/lib/langs/words/<code>.js` as rows of [word, meaning, reading, example, translation, part of speech]. To add a language: write the pack, register it in `lang.js`, add it to `langs/meta.js` and to the `AI` map in `src/routes/api/ai/+server.js`.
- Units are chapters: `src/lib/content.js` orders them by the roadmap, and each opens when the previous chapter's quiz is passed (`chapter*` functions in `src/lib/roadmap.js`). `/grammar` builds its reference from the lessons' info steps; verb tables come from a pack's `conjugate()` if it has one, otherwise from the `conjugate` AI op.
- Each language keeps its own state (localStorage key and database row per language). `src/lib/quiz.js` answer check + SRS + daily quiz, `src/lib/roadmap.js` stages and checkpoint tests, `src/lib/Exercise.svelte` question runner, `src/lib/conj.js` Portuguese conjugator.
- Server code: `src/routes/api/ai` (ops: import, chat, lesson, grade), `api/tts` (ElevenLabs voice), `api/stt` (Deepgram speech to text), `api/config` (public settings and which keys exist), `api/reminder` (calendar file), `api/push` (daily web push, called hourly by a database job), `src/lib/server/safefetch.js`. Offline cache: `src/service-worker.js`.
- Rules:
  - Only free OpenRouter models. Keep the `isFree` filter in the AI route.
  - LLM output is untrusted: pass lesson steps through `cleanSteps`, never render it with `{@html}`.
  - User-supplied URLs go through `safeFetch` (blocks private addresses).
  - No em dashes or emojis in UI copy. Only runtime dependency is `@supabase/supabase-js`, loaded lazily. Do not add more.
  - Device settings (theme, voice, quiz options, own API key) live in `src/lib/prefs.js`, in the browser only. A user's own key must never be stored or logged on the server.
  - Every endpoint that spends a shared free quota goes through `limited()` in `src/lib/server/limit.js`.
  - `.github/workflows`: tests and build on every push, and an uptime check every 30 minutes.
  - New state fields go in `blank()` in the store so old saves and synced rows still load. State from outside (storage, account, backup) passes through `clean()`; sync merges via `src/lib/sync.js` and never overwrites a copy it has not seen.
  - Mandarin extras: `src/lib/tone.js` (tones, syllables), `src/lib/zhdata.js` loads `static/hsk.json` (HSK words by level) and `static/hanzi.json` (character meanings). Both were written with AI help, not checked against the official lists.
  - Share image: `static/og.png` (1200x630).
  - Never expose the Supabase service role key; the browser only gets the anon key.
  - Use relative imports, not `$lib`.
  - Paid services are off limits: every key is a free plan with no card, and each feature must fall back or switch off when its key is missing.
- Env (all optional, see `.env.example`): `OPENROUTER_API_KEY`, `ELEVENLABS_API_KEY`, `DEEPGRAM_API_KEY`, `SUPABASE_URL` + `SUPABASE_ANON_KEY`, `APP_PASSCODE`. Real keys go in `.env`, which is git-ignored.
