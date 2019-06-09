import { split } from '@root';
import { Coord } from './model/coord.class';

export const interpret = (input: string): Coord[] => {
	const points: Coord[] = [];
	for (const line of split(input)) {
		if (line) {
			const lineSplit = line.split(', ');
			points.push(new Coord(Number(lineSplit[1]), Number(lineSplit[0])));
		}
	}
	return points;
};
