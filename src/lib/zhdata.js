// Mandarin reference data, fetched only when studying Mandarin and only once.
//   hanzi(): { 朋: ['péng', 'friend, companion'] }   one entry per character
//   hsk():   [{ pt, say, en, pos, level }]            the HSK word lists
// ponytail: word lists written with AI help from memory, not checked against the official lists.
const get = (path) => fetch(path).then((r) => (r.ok ? r.json() : null)).catch(() => null);
let h, k;
export const hanzi = () => (h ??= get('/hanzi.json').then((d) => d || {}));
export const hsk = () => (k ??= get('/hsk.json').then((d) => (d || []).map(([pt, say, en, pos, level]) => ({ pt, say, en, pos, level }))));
