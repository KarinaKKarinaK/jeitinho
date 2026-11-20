// Brazilian Portuguese conjugator. Persons: 0 eu, 1 você/ele/ela, 2 nós, 3 vocês/eles.
// ponytail: no tu/vós and no simple future (Brazil says "vou + infinitive"). Add rows to IRR for more verbs.
export const PRON = ['eu', 'você', 'nós', 'vocês'];

export const TENSES = {
	pres: { name: 'Presente', cue: 'Hoje' },
	perf: { name: 'Pretérito perfeito', cue: 'Ontem' },
	imp: { name: 'Pretérito imperfeito', cue: 'Antigamente' },
	cond: { name: 'Condicional', cue: 'Nesse caso,' },
	sp: { name: 'Subjuntivo presente', cue: 'Espero que' },
	si: { name: 'Subjuntivo imperfeito', cue: 'Se' },
	sf: { name: 'Subjuntivo futuro', cue: 'Quando' }
};

const END = {
	ar: { pres: ['o', 'a', 'amos', 'am'], perf: ['ei', 'ou', 'amos', 'aram'], imp: ['ava', 'ava', 'ávamos', 'avam'], sp: ['e', 'e', 'emos', 'em'] },
	er: { pres: ['o', 'e', 'emos', 'em'], perf: ['i', 'eu', 'emos', 'eram'], imp: ['ia', 'ia', 'íamos', 'iam'], sp: ['a', 'a', 'amos', 'am'] },
	ir: { pres: ['o', 'e', 'imos', 'em'], perf: ['i', 'iu', 'imos', 'iram'], imp: ['ia', 'ia', 'íamos', 'iam'], sp: ['a', 'a', 'amos', 'am'] }
};

// Only what cannot be derived. sp: string = stem, array = full forms. cond: stem.
const IRR = {
	ser: { pres: ['sou', 'é', 'somos', 'são'], perf: ['fui', 'foi', 'fomos', 'foram'], imp: ['era', 'era', 'éramos', 'eram'], sp: 'sej' },
	ir: { pres: ['vou', 'vai', 'vamos', 'vão'], perf: ['fui', 'foi', 'fomos', 'foram'], sp: ['vá', 'vá', 'vamos', 'vão'] },
	estar: { pres: ['estou', 'está', 'estamos', 'estão'], perf: ['estive', 'esteve', 'estivemos', 'estiveram'], sp: ['esteja', 'esteja', 'estejamos', 'estejam'] },
	ter: { pres: ['tenho', 'tem', 'temos', 'têm'], perf: ['tive', 'teve', 'tivemos', 'tiveram'], imp: ['tinha', 'tinha', 'tínhamos', 'tinham'] },
	fazer: { pres: ['faço', 'faz', 'fazemos', 'fazem'], perf: ['fiz', 'fez', 'fizemos', 'fizeram'], cond: 'far' },
	poder: { pres: ['posso', 'pode', 'podemos', 'podem'], perf: ['pude', 'pôde', 'pudemos', 'puderam'] },
	dizer: { pres: ['digo', 'diz', 'dizemos', 'dizem'], perf: ['disse', 'disse', 'dissemos', 'disseram'], cond: 'dir' },
	querer: { pres: ['quero', 'quer', 'queremos', 'querem'], perf: ['quis', 'quis', 'quisemos', 'quiseram'], sp: 'queir' },
	saber: { pres: ['sei', 'sabe', 'sabemos', 'sabem'], perf: ['soube', 'soube', 'soubemos', 'souberam'], sp: 'saib' },
	vir: { pres: ['venho', 'vem', 'vimos', 'vêm'], perf: ['vim', 'veio', 'viemos', 'vieram'], imp: ['vinha', 'vinha', 'vínhamos', 'vinham'] },
	ver: { pres: ['vejo', 'vê', 'vemos', 'veem'], perf: ['vi', 'viu', 'vimos', 'viram'] },
	dar: { pres: ['dou', 'dá', 'damos', 'dão'], perf: ['dei', 'deu', 'demos', 'deram'], sp: ['dê', 'dê', 'demos', 'deem'] },
	pôr: { pres: ['ponho', 'põe', 'pomos', 'põem'], perf: ['pus', 'pôs', 'pusemos', 'puseram'], imp: ['punha', 'punha', 'púnhamos', 'punham'], cond: 'por' },
	trazer: { pres: ['trago', 'traz', 'trazemos', 'trazem'], perf: ['trouxe', 'trouxe', 'trouxemos', 'trouxeram'], cond: 'trar' },
	dormir: { pres: ['durmo', 'dorme', 'dormimos', 'dormem'] },
	pedir: { pres: ['peço', 'pede', 'pedimos', 'pedem'] },
	sentir: { pres: ['sinto', 'sente', 'sentimos', 'sentem'] },
	ouvir: { pres: ['ouço', 'ouve', 'ouvimos', 'ouvem'] },
	ler: { pres: ['leio', 'lê', 'lemos', 'leem'] },
	perder: { pres: ['perco', 'perde', 'perdemos', 'perdem'] },
	conseguir: { pres: ['consigo', 'consegue', 'conseguimos', 'conseguem'] }
};

export const VERBS = {
	ser: 'to be (permanent)', ir: 'to go', estar: 'to be (temporary)', ter: 'to have', fazer: 'to do, make',
	poder: 'can, to be able', dizer: 'to say', querer: 'to want', saber: 'to know', vir: 'to come',
	ver: 'to see', dar: 'to give', pôr: 'to put', trazer: 'to bring', dormir: 'to sleep', pedir: 'to ask for',
	sentir: 'to feel', ouvir: 'to hear', ler: 'to read', perder: 'to lose', conseguir: 'to manage, get',
	falar: 'to speak', morar: 'to live (reside)', gostar: 'to like', ficar: 'to stay, become', chegar: 'to arrive',
	começar: 'to start', achar: 'to think, find', comer: 'to eat', beber: 'to drink', conhecer: 'to know (people, places)',
	entender: 'to understand', abrir: 'to open', decidir: 'to decide', dirigir: 'to drive'
};

// keep the sound before e: fic- -> fiqu-, cheg- -> chegu-, começ- -> comec-
const soft = (s) => s.replace(/c$/, 'qu').replace(/g$/, 'gu').replace(/ç$/, 'c');

export function conj(verb, tense, p) {
	const irr = IRR[verb] || {};
	const type = verb === 'pôr' ? 'er' : verb.slice(-2);
	const stem = verb.slice(0, -2);
	const E = END[type];
	// conhecer -> conheço, dirigir -> dirijo
	const euStem = type === 'ar' ? stem : stem.replace(/c$/, 'ç').replace(/g$/, 'j');
	const pres = irr.pres || E.pres.map((e, k) => (k === 0 ? euStem : stem) + e);
	const perf = irr.perf || E.perf.map((e, k) => (k === 0 && type === 'ar' ? soft(stem) : stem) + e);

	if (tense === 'pres') return pres[p];
	if (tense === 'perf') return perf[p];
	if (tense === 'imp') return (irr.imp || E.imp.map((e) => stem + e))[p];
	if (tense === 'cond') return (irr.cond || verb) + ['ia', 'ia', 'íamos', 'iam'][p];
	if (tense === 'sp') {
		if (Array.isArray(irr.sp)) return irr.sp[p];
		// from the eu form: faço -> faça, tenho -> tenha
		return (irr.sp || (type === 'ar' ? soft(stem) : pres[0].slice(0, -1))) + E.sp[p];
	}
	if (tense === 'si') {
		// from "eles" perfeito: fizeram -> fize + sse
		const b = perf[3].slice(0, -3);
		if (p !== 2) return b + (p === 3 ? 'ssem' : 'sse');
		const acc = { a: 'á', e: irr.perf ? 'é' : 'ê', i: 'í', o: 'ô' }[b.slice(-1)];
		return b.slice(0, -1) + acc + 'ssemos';
	}
	if (tense === 'sf') return perf[3].slice(0, -2) + ['', '', 'mos', 'em'][p]; // fizeram -> fizer
	throw new Error('unknown tense ' + tense);
}

export const table = (verb, tense) =>
	`<b>${verb}</b> (${VERBS[verb] || ''}) · ${TENSES[tense].name}<br>` +
	PRON.map((pr, p) => `${pr} <b>${conj(verb, tense, p)}</b>`).join(' · ');
