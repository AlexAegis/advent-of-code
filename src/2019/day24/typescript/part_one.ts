import { bench, read } from '@lib';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';
import { parse } from './parse';

export enum Tile {
	BUG = '#',
	EMTPY = '.'
}

export const bugDie = (adj: Vec2[], map: Tile[][]): boolean => {
	return adj.map(a => map[a.y][a.x]).filter(t => t === Tile.BUG).length !== 1;
};

export const infest = (adj: Vec2[], map: Tile[][]): boolean => {
	const adjBugs = adj.map(a => map[a.y][a.x]).filter(t => t === Tile.BUG).length;
	return adjBugs === 1 || adjBugs === 2;
};

export const adjacents = (x: number, y: number): Vec2[] => {
	const asCoord = new Vec2(x, y);
	return Direction.directions.map(d => d.add(asCoord)).filter(c => c.x >= 0 && c.x < 5 && c.y >= 0 && c.y < 5);
};

export const bio = (map: Tile[][]): number =>
	map.flat().reduce((a, t, i) => (t === Tile.BUG ? a + Math.pow(2, i) : a), 0);

export const runner = (input: string) => {
	let map = parse(input) as Tile[][];

	const history = new Set<number>();
	let lastBio = bio(map);
	history.add(lastBio);
	g: for (let gen = 0; gen <= 100000; gen++) {
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
		lastBio = bio(map);
		if (history.has(lastBio)) {
			break g;
		} else {
			history.add(lastBio);
		}
	}

	return lastBio;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 13500447 ~3ms
}
