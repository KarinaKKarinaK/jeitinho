<h1 align="center">jeitinho</h1>

<p align="center">
Learn Brazilian Portuguese the mineiro way.<br>
A small, fast, gamified app that lives on your phone's home screen and runs on free AI models.
</p>

<p align="center">
<img src="docs/home.png" width="230" alt="Home screen with the daily quiz">
<img src="docs/lesson.png" width="230" alt="A lesson question answered correctly">
<img src="docs/bank.png" width="230" alt="Flashcard review in the word bank">
</p>

*Jeitinho* is the Brazilian knack for finding a way. This app is my way to get from zero to fluent without paying for five subscriptions.

## What it does

- **Daily quiz of 11 hard questions.** Built fresh every day from your word bank and verb tenses. A time decay keeps questions you just saw out of the next quizzes, so it never feels like the same quiz twice.
- **Lessons that explain, then make you produce.** Pronunciation spelled out in English (`leite` = LAY-chee), eu vs você in every past tense, the three subjunctives, and where Spanish habits betray you.
- **Mineirês.** Two lessons on how people talk in Belo Horizonte: uai, trem, cê, tiquim, arreda, and why "Oncotô?" is a full sentence.
- **Verb drill.** Pick tenses, get ten quick questions with a time cue (Ontem, Se, Quando). The eu vs você mode asks both forms back to back.
- **Word bank with spaced repetition.** Works like Anki, and can export a file Anki imports.
- **Songs.** Paste a Spotify track link. It finds the lyrics, translates them line by line and builds a lesson from the song.
- **Links and text.** Paste an article or a YouTube link and it pulls out the words worth learning.
- **Photos of your lesson notes.** The camera button transcribes them and adds the vocabulary to your bank.
- **Bate-papo.** Chat with Bia, a mineira from BH, who answers in spoken Brazilian Portuguese and corrects your message each turn.
- **Lessons on demand.** Type any topic, pick a level from A1 to C2, get a lesson.
- **Roadmap with badges.** Fourteen checkpoints from A1.1 to C2.2. Each has milestones to hit and a test to pass before you earn the badge and move on.
- **Accounts.** Sign in with Google, GitHub or email and your progress follows you across devices. Signed out, it still works and stays on the device.

<p align="center">
<img src="docs/learn.png" width="230" alt="Lesson list">
<img src="docs/drill.png" width="230" alt="Verb drill question">
<img src="docs/roadmap.png" width="230" alt="Roadmap with milestones and a checkpoint test">
</p>

## Why it is built this way

The design follows what learning research keeps finding (Dunlosky et al., 2013, is a good summary):

| Finding | In the app |
| --- | --- |
| Recalling beats rereading | Most questions make you type the Portuguese. Multiple choice is the minority. |
| Spacing beats cramming | Every word has its own review interval, and quiz questions decay before they can come back. |
| Mixing topics beats blocks | The daily quiz mixes vocabulary, listening and seven tenses. |
| Feedback should be instant | Each answer shows the right form, the full conjugation and an example, with audio. |
| You learn from content you care about | Your songs, your articles and your own class notes become the material. |
| Errors need a second try | Missed lesson questions come back before the lesson ends. |

## Run it

```bash
npm install
cp .env.example .env   # add your OpenRouter key
npm run dev
npm test               # conjugator, quiz spacing, answer checking, URL safety
```

Lessons, the quiz, the drill and the word bank work with no key at all. The key only powers importing, chat and custom lessons.

## Deploy your own

1. Get a free key at [openrouter.ai/keys](https://openrouter.ai/keys). Set its credit limit to $0.
2. Import this repo in Vercel and add `OPENROUTER_API_KEY` as an environment variable.
3. Optional: add `APP_PASSCODE` so strangers who find your URL cannot use up your free quota. Type the same passcode under Settings in the app.
4. On iPhone: open the site in Safari, tap Share, then **Add to Home Screen**.

### Accounts and the database (optional)

Without this the app still works and keeps progress on the device.

1. In Vercel, open the project, go to Storage, and add **Supabase** (free plan). That sets `SUPABASE_URL` and `SUPABASE_ANON_KEY` for you. Redeploy.
2. In the Supabase SQL editor, run [`supabase/schema.sql`](supabase/schema.sql). It creates one table with row level security, so each user can only read and write their own row.
3. In Supabase, under Authentication, URL Configuration, set the Site URL to your deployed URL and add `https://your-url/account` to the redirect URLs.
4. Email sign-in works now. For Google and GitHub, create an OAuth app with each, use the callback URL Supabase shows you, and paste the client ID and secret under Authentication, Providers.

Sync is simple on purpose: the whole state is one JSON row, and the newest copy wins.

### It cannot cost money

The server only ever calls models whose ID ends in `:free` (or the `openrouter/free` router). Anything else in `OPENROUTER_MODELS` is dropped in code, see `src/routes/api/ai/+server.js`. A $0 credit limit on the key is the second lock.

## How it is made

- **SvelteKit**, prerendered. The whole app is about 60 kB of gzipped JavaScript, so it opens fast on a phone.
- **Local first.** Progress lives in your browser's local storage and the app works signed out. With Supabase connected, the same state is mirrored to one Postgres row per user. Settings has export and import for backups.
- **Voice** is the pt-BR voice built into your phone, so audio is free and instant.
- **Lyrics** come from [LRCLIB](https://lrclib.net).

```
src/lib/conj.js       verb conjugator (7 tenses, regular rules plus an irregular table)
src/lib/quiz.js       answer checking, spaced repetition, daily quiz selection
src/lib/content.js    the hand-written course and starter word bank
src/lib/roadmap.js    stages, milestones and checkpoint tests
src/lib/cloud.svelte.js   sign-in and sync (Supabase)
src/lib/Exercise.svelte   the question runner used by lessons, quiz, drill and tests
src/routes/api/ai     the only server code: import, chat, lesson
```

## Honest limits

- The hand-written course is a strong start, not the full road to C2. The daily quiz, your own material, the chat and custom lessons carry you past it.
- Free models are rate limited and sometimes slow. Try again if one times out.
- YouTube often hides captions from servers. When that happens the app says so and you can paste the transcript.
- It does not listen to your pronunciation yet.
- The roadmap badges are this app's own checkpoints modeled on CEFR. They are not an official certificate, and the tests cover verbs and vocabulary, not speaking or writing.
- Sync is newest-copy-wins. If you use two devices offline at the same time, the older changes lose.

## Contributing

Lessons live in plain JavaScript in `src/lib/content.js`. If you are a native speaker and something sounds off, especially the mineirês, please open an issue or a PR.
