import { pack } from './lang.js';

// The active language's course. See src/lib/langs/ for the packs.
// Units are the chapters. They are put in the order the roadmap teaches them (by the earliest stage
// that needs one of their lessons), because each chapter unlocks the next.
const stageOf = Object.fromEntries(pack.stages.flatMap(([, , , lessons], i) => lessons.map((id) => [id, i])));
const at = (l) => stageOf[l.id] ?? 99;
// A unit whose lessons are spread far along the roadmap (say one at B1 and one at C1) is cut into parts,
// each placed where its lessons belong. Otherwise an early lesson would sit behind a chapter quiz that
// needs a much later one, and the roadmap could ask for a lesson the chapters have not opened yet.
// Each lesson can have extra material around its own steps (pack.more): the big picture first, then common
// mistakes, a real-life text and a recap at the end.
const full = (l) => {
	const m = pack.more?.[l.id];
	return m ? { ...l, steps: [...(m.start || []), ...l.steps, ...(m.end || [])] } : l;
};
const parts = pack.units.map((u) => ({ ...u, lessons: u.lessons.map(full) })).flatMap((u, i) => {
	const groups = [];
	for (const l of [...u.lessons].sort((a, b) => at(a) - at(b))) {
		const g = groups.at(-1);
		if (g && at(l) - at(g[0]) <= 2) g.push(l);
		else groups.push([l]);
	}
	return groups.map((lessons, n) => ({ ...u, lessons, title: n ? `${u.title} ${'I'.repeat(n + 1)}` : u.title, i }));
});
export const UNITS = parts.sort((a, b) => at(a.lessons[0]) - at(b.lessons[0]) || a.i - b.i);
export const LESSON_LIST = UNITS.flatMap((u) => u.lessons);
export const LESSONS = Object.fromEntries(LESSON_LIST.map((l) => [l.id, l]));
export const SEED = pack.seed;
export const PLACEMENT = pack.placement;
// which chapter a lesson belongs to
export const CHAPTER_OF = Object.fromEntries(UNITS.flatMap((u, i) => u.lessons.map((l) => [l.id, i])));
