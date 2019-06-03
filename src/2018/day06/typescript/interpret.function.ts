import { Coord } from './model/coord.class';

export const interpret = async (input: string): Promise<{ points: Array<Coord>; boundary: number }> => {
	const points: Array<Coord> = [];
	let boundary: number;
	for (const line of input.split(/\r?\n/)) {
		if (line) {
			const lineSplit = line.split(', ');

			if (boundary === undefined) {
				boundary = Number(lineSplit[0]);
			} else {
				points.push(new Coord(Number(lineSplit[1]), Number(lineSplit[0])));
			}
		}
	}
	return { points, boundary };
};
