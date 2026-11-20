// Counts the time you are actually using the app, in seconds, and turns every full 60 into a minute.
// "Using" means: the app is on screen, the window has focus, and you touched, typed, scrolled or
// clicked within the last 45 seconds. Leaving the tab open in the background counts for nothing.
// Seconds that have not yet made a full minute are kept, so short visits add up across reloads.
export const IDLE_AFTER = 45000;
export const STEP = 5; // seconds between checks

// Pure step: given what is carried over and whether this check counts, returns the new carry and
// how many whole minutes to credit, and to which day.
export function step(carry, { day, active, seconds = STEP }) {
	let secs = carry?.day === day ? carry.secs : 0; // a new day starts from zero; yesterday's remainder is dropped
	if (active) secs += seconds;
	const minutes = Math.floor(secs / 60);
	return { carry: { day, secs: secs - minutes * 60 }, minutes };
}

// Wires the counter to the page. credit(day, minutes) is called whenever a minute is earned.
export function track({ key, today, credit }) {
	let last = Date.now();
	const touch = () => (last = Date.now());
	const events = ['pointerdown', 'pointermove', 'keydown', 'scroll', 'touchstart', 'wheel'];
	for (const ev of events) addEventListener(ev, touch, { passive: true, capture: true });
	const read = () => {
		try {
			return JSON.parse(localStorage.getItem(key));
		} catch {
			return null;
		}
	};
	const timer = setInterval(() => {
		const active = !document.hidden && document.hasFocus() && Date.now() - last < IDLE_AFTER;
		const { carry, minutes } = step(read(), { day: today(), active });
		try {
			localStorage.setItem(key, JSON.stringify(carry));
		} catch {
			/* storage blocked: minutes still count while the page stays open */
		}
		if (minutes) credit(carry.day, minutes);
	}, STEP * 1000);
	return () => {
		clearInterval(timer);
		for (const ev of events) removeEventListener(ev, touch, { capture: true });
	};
}
