// Mandarin reference data, fetched only when studying Mandarin and only once.
//   hanzi(): { 朋: ['péng', 'friend, companion'] }   one entry per character
//   hsk():   [{ pt, say, en, pos, level }]            the HSK 1 to 3 word lists
// ponytail: HSK 1 to 3 only (600 words). Add levels 4 to 6 as more rows in static/hsk.json when wanted.
const get = (path) => fetch(path).then((r) => (r.ok ? r.json() : null)).catch(() => null);
let h, k;
export const hanzi = () => (h ??= get('/hanzi.json').then((d) => d || {}));
export const hsk = () => (k ??= get('/hsk.json').then((d) => (d || []).map(([pt, say, en, pos, level]) => ({ pt, say, en, pos, level }))));
