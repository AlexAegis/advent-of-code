import { split } from '@lib';
import { Tile } from './tile.class';

export const parse = (input: string): Tile[] => {
	const lines = split(input);
	const tiles: Tile[] = [];

	for (const line of lines) {
		if (line.endsWith(':')) {
			const [, nc] = line.split(' ');
			const [n] = nc.split(':');
			tiles.push(new Tile(parseInt(n, 10)));
		} else if (line !== '') {
			tiles[tiles.length - 1].addLine(line);
		}
	}
	return tiles;
};
