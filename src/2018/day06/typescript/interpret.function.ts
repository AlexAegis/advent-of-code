import { Coord } from './model/coord.class';
import { Args } from '.';

export const interpret = async (input: string): Promise<Array<Coord>> => {
	const points: Array<Coord> = [];
	for (const line of input.split(/\r?\n/)) {
		if (line) {
			const lineSplit = line.split(', ');

			points.push(new Coord(Number(lineSplit[1]), Number(lineSplit[0])));
		}
	}
	return points;
};
