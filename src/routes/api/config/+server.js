import { json } from '@sveltejs/kit';
import * as env from '$app/env/private';

export const prerender = false;

// Hands the browser the public Supabase settings. The anon key is meant to be public:
// row level security is what protects the data. Never return the service role key here.
export const GET = () =>
	json(
		{
			url: env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || '',
			key: env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '',
			// which optional services have a key on the server (the keys themselves never leave it)
			ai: !!env.OPENROUTER_API_KEY,
			tts: !!env.ELEVENLABS_API_KEY,
			stt: !!env.DEEPGRAM_API_KEY
		},
		{ headers: { 'cache-control': 'public, max-age=300' } }
	);
