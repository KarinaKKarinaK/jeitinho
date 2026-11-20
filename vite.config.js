import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Only this project's own Supabase host is allowed by the content security policy when it is known at
// build time (it is on Vercel); otherwise any Supabase project, so local builds still work.
const supa = (() => {
	try {
		return new URL(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL).host;
	} catch {
		return '*.supabase.co';
	}
})();

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter(),

			// Content Security Policy: scripts only from this site, network only to this site and Supabase.
			csp: {
				directives: {
					'default-src': ['self'],
					'script-src': ['self'],
					'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
					'font-src': ['self', 'https://fonts.gstatic.com'],
					'img-src': ['self', 'data:', 'blob:', `https://${supa}`],
					'media-src': ['self', 'blob:'],
					'connect-src': ['self', 'data:', `https://${supa}`, `wss://${supa}`],
					'worker-src': ['self'],
					'object-src': ['none'],
					'base-uri': ['self'],
					'form-action': ['self']
				}
			}
		})
	]
});
