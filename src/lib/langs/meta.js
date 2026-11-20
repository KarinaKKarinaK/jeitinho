// The languages the app can teach. Shared by the browser and the server, so keep it tiny.
// chars: written without spaces (answers are compared character by character).
export const LANGS = {
	pt: { name: 'Brazilian Portuguese', label: 'Português', locale: 'pt-BR', stt: 'pt-BR' },
	zh: { name: 'Mandarin Chinese', label: '中文', locale: 'zh-CN', stt: 'zh-CN', chars: true },
	pl: { name: 'Polish', label: 'Polski', locale: 'pl-PL', stt: 'pl' },
	ja: { name: 'Japanese', label: '日本語', locale: 'ja-JP', stt: 'ja', chars: true },
	es: { name: 'Spanish', label: 'Español', locale: 'es-ES', stt: 'es' }
};
