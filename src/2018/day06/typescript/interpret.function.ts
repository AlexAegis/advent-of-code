import { Coord } from './model/coord.class';
import { split } from '@root';

export const interpret = (input: string): Array<Coord> => {
	const points: Array<Coord> = [];
	for (const line of split(input)) {
		if (line) {
			const lineSplit = line.split(', ');
			points.push(new Coord(Number(lineSplit[1]), Number(lineSplit[0])));
		}
	}
	return points;
};
