// Personal settings for this device: appearance, audio, quiz, reminders, your own AI key.
// Kept in the browser only (never synced), so an API key you paste here stays on this device.
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
	goal: 60, // XP that fills a day ring
	notifyAt: '19:00',
	key: '', // your own OpenRouter key (optional)
	model: '' // the model to use with it
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

export function applyTheme() {
	if (typeof document === 'undefined') return;
	const light = P.theme === 'light' || (P.theme === 'auto' && matchMedia('(prefers-color-scheme: light)').matches);
	document.documentElement.dataset.theme = light ? 'light' : 'dark';
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f7f2f5' : '#0c0a0f');
}

export function savePrefs(next) {
	if (next) Object.assign(P, next);
	try {
		localStorage.setItem(KEY, JSON.stringify(P));
	} catch {
		/* storage blocked: settings last for this visit only */
	}
	applyTheme();
}
