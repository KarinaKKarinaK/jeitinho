// Personal settings for this device: appearance, audio, quiz, reminders.
// Kept in the browser only, never synced. Your own API key is not in here: it is held encrypted by vault.js
// and only placed in memory (P.key) while the app is open.
import { seal, unseal } from './vault.js';
const KEY = 'jeitinho:prefs';

export const DEFAULTS = {
	theme: 'dark', // dark | light | auto
	voice: 'auto', // 'auto' (the default for the language), a cloud voice id, or 'device' for the phone's own voice
	voiceSet: 2, // bumped when the defaults change, so an old saved default does not stick
	rate: 0.9,
	autoplay: true, // read answers aloud after you check them
	sfx: true, // sounds and vibration on right and wrong
	quizLen: 11,
	quizAudio: true, // listening questions in the daily quiz
	quizDrills: true, // grammar drills in the daily quiz
	quizTones: true, // tone questions in the daily quiz (Mandarin)
	goalMin: 15, // minutes of study that fill a day ring
	notifyAt: '19:00',
	hidden: [], // languages you chose to hide from the language switcher
	name: '', // your display name
	avatar: '', // your picture, a small image kept on the device (and in your account when signed in)
	avatarAt: 0, // which version of the picture this is, to know when another device changed it
	model: '' // the model to use with your own key
};

// Six cloud voices (ElevenLabs free plan), the same six for every language. They are shown under a name
// that fits the language being learned; the voice behind the name is in the last column.
// None is a native speaker of these languages. "Device voice" is the phone's own voice for the language, which is.
const NAMES = {
	pt: ['Luíza', 'Camila', 'Beatriz', 'Rafael', 'Thiago', 'Mateus'],
	zh: ['Xiǎoyǔ 小雨', 'Měilín 美琳', 'Jìng 静', 'Wěi 伟', 'Hào 浩', 'Míng 明'],
	pl: ['Kasia', 'Ola', 'Zosia', 'Marek', 'Tomek', 'Kuba'],
	ja: ['Yui ゆい', 'Hana はな', 'Aoi あおい', 'Ren れん', 'Haruto はると', 'Sōta そうた'],
	es: ['Lucía', 'Carmen', 'Elena', 'Javier', 'Diego', 'Pablo']
};
const IDS = [['sarah', 'female, calm'], ['jessica', 'female, bright'], ['alice', 'female, clear'], ['brian', 'male, deep'], ['george', 'male, warm'], ['liam', 'male, energetic']];
export const voicesFor = (lang) => [...IDS.map(([id, about], i) => [id, (NAMES[lang] || NAMES.pt)[i], about]), ['device', 'Device voice', 'native accent, works offline']];
// The voice used until you pick one. For Portuguese, Alice (shown as Beatriz) came out clearest of the
// female voices when a pt-BR speech recogniser transcribed each of them reading the same sentence.
const FIRST = { pt: 'alice' };
export const voiceOf = (lang) => (P.voice === 'auto' ? FIRST[lang] || 'sarah' : P.voice);

function load() {
	try {
		const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
		const out = { ...DEFAULTS, ...saved };
		if (!Array.isArray(out.hidden)) out.hidden = [];
		return out;
	} catch {
		return { ...DEFAULTS };
	}
}

export const P = load();
if (P.voiceSet !== 2) Object.assign(P, { voice: 'auto', voiceSet: 2 }); // one time: move everyone to the new per-language default
P.key = ''; // filled by unlock() from the encrypted vault

// Called once at startup. Also moves a key saved by an older version out of plain storage.
let opening;
export const unlock = () => (opening ??= open()); // runs once, however many screens ask
async function open() {
	try {
		const old = JSON.parse(localStorage.getItem(KEY) || '{}').key;
		if (old) await seal(old);
		P.key = await unseal();
		if (old) savePrefs();
	} catch {
		/* no storage: no saved key */
	}
}

export async function setKey(key) {
	P.key = key;
	await seal(key);
}

export function applyTheme() {
	if (typeof document === 'undefined') return;
	const light = P.theme === 'light' || (P.theme === 'auto' && matchMedia('(prefers-color-scheme: light)').matches);
	document.documentElement.dataset.theme = light ? 'light' : 'dark';
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f6f1e7' : '#0a0b12');
}

// Settings that follow you to every device you sign in on. Left out on purpose: your API key (never leaves
// the device), your picture (synced separately) and anything tied to one browser.
const SHARED = ['theme', 'voice', 'voiceSet', 'rate', 'autoplay', 'sfx', 'quizLen', 'quizAudio', 'quizDrills', 'quizTones', 'goalMin', 'notifyAt', 'hidden', 'model'];
export const sharedPrefs = () => Object.fromEntries(SHARED.map((k) => [k, P[k]]));
let onSave = null;
export const onPrefs = (fn) => (onSave = fn); // the account layer listens here

// remote = true when the change came from the account, so it is not sent straight back
export function savePrefs(next, remote = false) {
	if (next) {
		const { key: _never, ...rest } = next;
		const before = JSON.stringify(sharedPrefs());
		// only settings this app knows, and only values of the expected kind (they may come from the account)
		for (const [k, v] of Object.entries(rest)) {
			const known = k in DEFAULTS || ['prefsAt', 'profileAt'].includes(k);
			const fits = !(k in DEFAULTS) ? typeof v === 'number' : Array.isArray(DEFAULTS[k]) ? Array.isArray(v) : typeof v === typeof DEFAULTS[k];
			if (known && fits) P[k] = v;
		}
		if (!remote && JSON.stringify(sharedPrefs()) !== before) {
			P.prefsAt = Date.now();
			onSave?.();
		}
	}
	try {
		const { key: _secret, ...plain } = P; // the API key is never written here
		localStorage.setItem(KEY, JSON.stringify(plain));
	} catch {
		/* storage blocked: settings last for this visit only */
	}
	applyTheme();
}
