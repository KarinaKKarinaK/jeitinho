// Turns lesson text into HTML with two aids:
//   listen(html): every example phrase can be tapped to hear it
//   pinyin(html): Mandarin only, the reading above each character, coloured by tone
// Text that is not already trusted HTML must go through esc() first.
import { lang, meta, pack } from './lang.js';
import { hsk, hanzi } from './zhdata.js';
import { syllables, toneOf } from './tone.js';

export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const plain = (html) => html.replace(/<[^<>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim();
const HAN = /\p{Script=Han}/u;
const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]/u;

// Example phrases can be tapped to hear them.
// Latin-script languages: each phrase written in bold.
// Chinese and Japanese: each stretch of the language, bold or not, so "我吃<b>了</b>" is one sentence to listen to.
const RUN = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー，、！？…]+/gu;
export function listen(html) {
	if (!meta.chars) return html.replace(/<b>([\s\S]*?)<\/b>/g, (m, inner) => (plain(inner).length >= 3 && /\p{L}{2}/u.test(plain(inner)) ? `<b class="tap" data-say="${esc(plain(inner))}">${inner}</b>` : m));
	// cut into tags, stretches of the language, and everything else
	const pieces = [];
	html.split(/(<[^<>]*>)/).forEach((t, i) => {
		if (i % 2) return pieces.push({ tag: t, bold: /^<\/?b>$/i.test(t) });
		let last = 0;
		for (const m of t.matchAll(RUN)) {
			if (m.index > last) pieces.push({ text: t.slice(last, m.index) });
			pieces.push({ cjk: m[0] });
			last = m.index + m[0].length;
		}
		if (last < t.length) pieces.push({ text: t.slice(last) });
	});
	let out = '';
	let run = [];
	const flush = () => {
		// bold tags that open or close outside the stretch stay outside it
		let head = '', tail = '';
		const depth = () => run.reduce((d, p) => d + (p.tag ? (p.tag[1] === '/' ? -1 : 1) : 0), 0);
		while (run.length && run[0].tag && (run[0].tag[1] === '/' || depth() > 0)) head += run.shift().tag;
		while (run.length && run.at(-1).tag && (run.at(-1).tag[1] !== '/' || depth() < 0)) tail = run.pop().tag + tail;
		const say = run.map((p) => p.cjk || '').join('');
		const body = run.map((p) => p.cjk || p.tag).join('');
		out += head + (say && depth() === 0 ? `<span class="tap" data-say="${esc(say)}">${body}</span>` : body) + tail;
		run = [];
	};
	for (const p of pieces) {
		if (p.cjk || p.bold) run.push(p);
		else {
			flush();
			out += p.tag || p.text;
		}
	}
	flush();
	return out;
}

// ---------- pinyin above the characters
let words = null; // word -> syllables
let chars = null; // character -> syllable
let loading;
export const loadPinyin = () =>
	(loading ??= lang !== 'zh'
		? Promise.resolve(false)
		: Promise.all([hsk(), hanzi()]).then(([list, dict]) => {
				words = new Map();
				for (const w of [...list, ...pack.seed]) {
					const cs = [...w.pt], ss = syllables((w.say || '').split(' · ')[0]);
					if (cs.length > 1 && cs.length === ss.length && !words.has(w.pt)) words.set(w.pt, ss);
				}
				chars = dict;
				return true;
			}));

// Readings for a run of characters: the longest known word first, then character by character.
// ponytail: dictionary lookup, so a character with two readings can be wrong outside a known word
// (了 liǎo, 得 děi). A proper segmenter with a full dictionary would fix the rest.
function read(run) {
	const cs = [...run];
	const out = [];
	for (let i = 0; i < cs.length; ) {
		let hit = null;
		for (let n = Math.min(4, cs.length - i); n > 1 && !hit; n--) {
			const ss = words.get(cs.slice(i, i + n).join(''));
			if (ss) hit = ss;
		}
		if (hit) {
			hit.forEach((s, k) => out.push([cs[i + k], s]));
			i += hit.length;
		} else {
			out.push([cs[i], chars[cs[i]]?.[0] || '']);
			i++;
		}
	}
	return out;
}
const rubyRun = (run) => read(run).map(([c, s]) => (s ? `<ruby>${c}<rt class="t${toneOf(s)}">${s.toLowerCase()}</rt></ruby>` : c)).join('');

// Adds readings to every Chinese character in an HTML string, leaving the tags alone. Call loadPinyin() first.
// Where the text already spells the pinyin out right after the characters ("买 mǎi"), nothing is added.
const flat = (x) => x.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '');
export function pinyin(html) {
	if (!words || !HAN.test(html)) return html;
	const parts = html.split(/(<[^<>]*>)/);
	return parts
		.map((part, i) =>
			i % 2
				? part
				: part.replace(/\p{Script=Han}+/gu, (run, at) => {
						let after = part.slice(at + run.length);
						if (!after.trim() && /^<\/(b|span)>$/i.test(parts[i + 1] || '')) after = parts[i + 2] || ''; // the pinyin may follow a closing bold tag
						const said = flat(read(run).map((x) => x[1]).join(''));
						return said && flat(after.slice(0, said.length * 2 + 6)).startsWith(said) ? run : rubyRun(run);
					})
		)
		.join('');
}
