import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';
import { adjacents, bugDie, infest, Tile } from './part_one';

export const runner = (input: string) => {
	const levels = new Map<number, Tile[][]>();
	let map = parse(input) as Tile[][];
	levels.set(0, map);

	for (let gen = 0; gen <= 200; gen++) {
		for (const [level, dim] of levels.entries()) {
		}
		const nextGen: Tile[][] = [];
		for (let y = 0; y < map.length; y++) {
			const row = map[y];
			const nextRow = [];
			for (let x = 0; x < map.length; x++) {
				const tile = row[x];
				const adj = adjacents(x, y);

				if (tile === Tile.BUG && bugDie(adj, map)) {
					nextRow[x] = Tile.EMTPY;
				} else if (tile === Tile.EMTPY && infest(adj, map)) {
					nextRow[x] = Tile.BUG;
				} else {
					nextRow[x] = tile;
				}
			}
			nextGen[y] = nextRow;
		}
		map = nextGen;
	}

	return map.flat().filter(t => t === Tile.BUG).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 13500447 ~3ms
}
