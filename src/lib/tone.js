// Mandarin pinyin helpers: which tone a syllable carries, and typing tones as numbers (ni3 hao3).
const MARKS = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', ü: 'ǖǘǚǜ' };
const ALL = Object.values(MARKS);

// 1 to 4, or 0 for a neutral syllable
export const toneOf = (syl) => {
	for (const ch of syl) for (const m of ALL) if (m.includes(ch)) return m.indexOf(ch) + 1;
	return 0;
};

// "ni3 hao3" or "nv3" becomes "nǐ hǎo", "nǚ". The mark goes on a or e, on the o of ou, otherwise on the last vowel.
export const numbered = (s) =>
	String(s).replace(/([a-zü:]+?)([1-5])/gi, (_, raw, n) => {
		const syl = raw.toLowerCase().replace(/u:|v/g, 'ü');
		if (n === '5') return syl;
		const i = /[ae]/.test(syl) ? syl.search(/[ae]/) : syl.includes('ou') ? syl.indexOf('o') : Math.max(...[...'iouü'].map((v) => syl.lastIndexOf(v)));
		return i < 0 ? syl : syl.slice(0, i) + MARKS[syl[i]][n - 1] + syl.slice(i + 1);
	});

// Splits pinyin into syllables, whether it is written "péng you" or "péngyou".
// n and ng close a syllable unless a vowel follows (nánguài is nán + guài); an apostrophe always splits.
const V = 'aeiouü' + ALL.join('');
const SYL = new RegExp(`[bpmfdtnlgkhjqxrzcsyw]?h?[${V}]+(?:ng(?![${V}])|n(?![${V}])|r(?![${V}]))?`, 'gi');
export const syllables = (s) => String(s).match(SYL) || [];
