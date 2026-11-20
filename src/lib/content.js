import { pack, TEXTS as READING } from './lang.js';

// The active language's course. See src/lib/langs/ for the packs.
// Units are the chapters. They are put in the order the roadmap teaches them (by the earliest stage
// that needs one of their lessons), because each chapter unlocks the next.
const stageOf = Object.fromEntries(pack.stages.flatMap(([, , , lessons], i) => lessons.map((id) => [id, i])));
const first = (u) => Math.min(...u.lessons.map((l) => stageOf[l.id] ?? 99));
export const UNITS = pack.units.map((u, i) => [u, i]).sort((a, b) => first(a[0]) - first(b[0]) || a[1] - b[1]).map(([u]) => u);
export const LESSON_LIST = UNITS.flatMap((u) => u.lessons);
export const LESSONS = Object.fromEntries(LESSON_LIST.map((l) => [l.id, l]));
export const SEED = pack.seed;
export const PLACEMENT = pack.placement;
export const TEXTS = READING; // graded reading texts
// which chapter a lesson belongs to
export const CHAPTER_OF = Object.fromEntries(UNITS.flatMap((u, i) => u.lessons.map((l) => [l.id, i])));
