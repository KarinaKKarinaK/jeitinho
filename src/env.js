import { defineEnvVars } from '@sveltejs/kit/env';

// Every variable the server reads must be declared here, or SvelteKit hands back undefined.
// All are optional: a feature without its key falls back or switches off.
const optional = { schema: (v) => v || '' };

export const variables = defineEnvVars({
	OPENROUTER_API_KEY: optional,
	OPENROUTER_MODELS: optional,
	ELEVENLABS_API_KEY: optional,
	ELEVENLABS_VOICE_ID: optional,
	ELEVENLABS_MODEL: optional,
	DEEPGRAM_API_KEY: optional,
	APP_PASSCODE: optional,
	SUPABASE_URL: optional,
	SUPABASE_ANON_KEY: optional,
	SUPABASE_PUBLISHABLE_KEY: optional,
	NEXT_PUBLIC_SUPABASE_URL: optional,
	NEXT_PUBLIC_SUPABASE_ANON_KEY: optional,
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: optional
});
