// Part of speech tags a word can carry.
export const POS = ['noun', 'verb', 'adjective', 'adverb', 'phrase', 'connector', 'preposition', 'interjection', 'particle', 'pronoun', 'number'];

// The languages the app can teach. Shared by the browser and the server, so keep it tiny.
// short: the badge shown in the app (a familiar two letters, not always the language code).
// chars: written without spaces (answers are compared character by character).
export const LANGS = {
	pt: { short: 'PT', name: 'Brazilian Portuguese', label: 'Português', locale: 'pt-BR', stt: 'pt-BR' },
	zh: { short: 'CN', name: 'Mandarin Chinese', label: '中文', locale: 'zh-CN', stt: 'zh-CN', chars: true },
	pl: { short: 'PL', name: 'Polish', label: 'Polski', locale: 'pl-PL', stt: 'pl' },
	ja: { short: 'JP', name: 'Japanese', label: '日本語', locale: 'ja-JP', stt: 'ja', chars: true },
	es: { short: 'ES', name: 'Spanish', label: 'Español', locale: 'es-ES', stt: 'es' }
};
Object.setPrototypeOf(LANGS, null); // so a lookup like LANGS['constructor'] finds nothing
