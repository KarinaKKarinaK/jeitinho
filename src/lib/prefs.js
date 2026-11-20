// Personal settings for this device: appearance, audio, quiz, reminders.
// Kept in the browser only, never synced. Your own API key is not in here: it is held encrypted by vault.js
// and only placed in memory (P.key) while the app is open.
import { seal, unseal } from './vault.js';
const KEY = 'jeitinho:prefs';

export const DEFAULTS = {
	theme: 'dark', // dark | light | auto
	voice: 'sarah', // a cloud voice id, or 'device' for the phone's own voice
	rate: 0.9,
	autoplay: true, // read answers aloud after you check them
	sfx: true, // sounds and vibration on right and wrong
	quizLen: 11,
	quizAudio: true, // listening questions in the daily quiz
	quizDrills: true, // grammar drills in the daily quiz
	goalMin: 15, // minutes of study that fill a day ring
	notifyAt: '19:00',
	name: '', // your display name
	avatar: '', // your picture, a small image kept on the device (and in your account when signed in)
	avatarAt: 0, // which version of the picture this is, to know when another device changed it
	model: '' // the model to use with your own key
};

// Voices on the ElevenLabs free plan. None is a native speaker of the languages taught here;
// "device" uses the phone's own voice for the language, which is.
export const VOICES = [
	['sarah', 'Sarah', 'female, calm'],
	['jessica', 'Jessica', 'female, bright'],
	['alice', 'Alice', 'female, clear'],
	['brian', 'Brian', 'male, deep'],
	['george', 'George', 'male, warm'],
	['liam', 'Liam', 'male, energetic'],
	['device', 'Device voice', 'native accent, works offline']
];

function load() {
	try {
		return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
	} catch {
		return { ...DEFAULTS };
	}
}

export const P = load();
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
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f3f7f7' : '#0c0a0f');
}

export function savePrefs(next) {
	if (next) {
		const { key: _never, ...rest } = next;
		Object.assign(P, rest);
	}
	try {
		const { key: _secret, ...plain } = P; // the API key is never written here
		localStorage.setItem(KEY, JSON.stringify(plain));
	} catch {
		/* storage blocked: settings last for this visit only */
	}
	applyTheme();
}
