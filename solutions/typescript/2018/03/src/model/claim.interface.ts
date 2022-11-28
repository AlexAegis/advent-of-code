import type { Coord } from './coord.interface.js';

export interface Claim {
	id: number;
	starting: Coord;
	size: Coord;
}
