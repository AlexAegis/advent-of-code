import { Coord } from './coord.interface';

export interface Claim {
	id: number;
	starting: Coord;
	size: Coord;
}
