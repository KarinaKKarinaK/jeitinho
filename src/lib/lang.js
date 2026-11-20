import { LANGS } from './langs/meta.js';
import { UI } from './langs/kit.js';

// Each language is a pack, loaded on demand. Progress is kept separately per language.
const packs = {
	pt: () => import('./langs/pt.js'),
	zh: () => import('./langs/zh.js')
};
export const AVAILABLE = Object.keys(packs).map((code) => ({ code, ...LANGS[code] }));

let code = 'pt';
try {
	code = localStorage.getItem('jeitinho:lang') || 'pt';
} catch {
	/* no storage (tests, private mode): Portuguese */
}
if (!packs[code]) code = 'pt';

export const lang = code;
export const meta = LANGS[code];
export const pack = (await packs[code]()).default;
export const t = { ...UI, ...pack.ui };

// Switching reloads the app so every screen picks up the other language and its own progress.
export function switchLang(c, to = '/') {
	try {
		localStorage.setItem('jeitinho:lang', c);
	} catch {
		/* ignore */
	}
	location.href = to;
}
