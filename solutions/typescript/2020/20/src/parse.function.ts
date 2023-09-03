import { split } from '@alexaegis/advent-of-code-lib';
import { Tile } from './tile.class.js';

export const parse = (input: string): Tile[] => {
	const lines = split(input);
	const tiles: Tile[] = [];

	for (const line of lines) {
		if (line.endsWith(':')) {
			const [, nc] = line.splitIntoStringPair(' ');
			const [n] = nc.splitIntoStringPair(':');
			tiles.push(new Tile(Number.parseInt(n, 10)));
		} else if (line !== '') {
			tiles.at(-1)?.addLine(line);
		}
	}
	return tiles;
};
