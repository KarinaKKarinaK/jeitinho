import { pack } from './lang.js';

// The active language's course. See src/lib/langs/ for the packs.
export const UNITS = pack.units;
export const LESSON_LIST = UNITS.flatMap((u) => u.lessons);
export const LESSONS = Object.fromEntries(LESSON_LIST.map((l) => [l.id, l]));
export const SEED = pack.seed;
export const PLACEMENT = pack.placement;
