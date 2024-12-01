import { task } from '@alexaegis/advent-of-code-lib';
import { max, min } from '@alexaegis/advent-of-code-lib/math';
import { Direction, Vec3 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { Tile } from './p1.js';
import { parse } from './parse.js';

const ZT5 = [...Array.from({ length: 5 }).keys()];
const EMTPY_GEN = Array.from({ length: 5 }).map(() =>
	Array.from({ length: 5 }).map(() => Tile.EMTPY),
);

export const recursiveAdjacents = (x: number, y: number, d: number): Vec3[] => {
	const v = new Vec3(x, y, d);
	return Direction.cardinalDirections
		.map((dir) => v.add({ ...dir, z: 0 }))
		.flatMap((dir) => {
			if (dir.x < 0) {
				return [new Vec3(1, 2, d - 1)]; // The left from the middle one, one level below
			} else if (dir.x > 4) {
				return [new Vec3(3, 2, d - 1)]; // The right from the middle one, one level below
			} else if (dir.y < 0) {
				return [new Vec3(2, 1, d - 1)]; // The top from the middle one, one level below
			} else if (dir.y > 4) {
				return [new Vec3(2, 3, d - 1)]; // The bottom from the middle one, one level below
			} else if (dir.x === 2 && dir.y === 2) {
				// Points to the inner dimension, one level above
				if (v.x === 3) {
					return ZT5.map((i) => new Vec3(4, i, d + 1)); // Whole right side one level above
				} else if (v.x === 1) {
					return ZT5.map((i) => new Vec3(0, i, d + 1)); // Whole left side one level above
				} else if (v.y === 3) {
					return ZT5.map((i) => new Vec3(i, 4, d + 1)); // Whole bottom side one level above
				} else if (v.y === 1) {
					return ZT5.map((i) => new Vec3(i, 0, d + 1)); // Whole top side one level above
				}
			}
			return [dir];
		});
};

export const isDie = (adj: Vec3[], map: Map<number, Tile[][]>): boolean => {
	return (
		adj.map((a) => map.get(a.z)?.[a.y]?.[a.x] ?? Tile.EMTPY).filter((t) => t === Tile.BUG)
			.length !== 1
	);
};

export const isBirth = (adj: Vec3[], map: Map<number, Tile[][]>): boolean => {
	const adjBugs = adj
		.map((a) => map.get(a.z)?.[a.y]?.[a.x] ?? Tile.EMTPY)
		.count((t) => t === Tile.BUG);
	return adjBugs === 1 || adjBugs === 2;
};

const expand = (level: Map<number, Tile[][]>): void => {
	level.set([...level.keys()].reduce(min) - 1, EMTPY_GEN);
	level.set([...level.keys()].reduce(max) + 1, EMTPY_GEN);
};

const shrink = (level: Map<number, Tile[][]>): void => {
	const lowKey = [...level.keys()].reduce(min);
	const low = level.get(lowKey);
	const highKey = [...level.keys()].reduce(max);
	const high = level.get(highKey);
	if (low && low.flat().count((t) => t === Tile.BUG) === 0) {
		level.delete(lowKey);
	}
	if (high && high.flat().count((t) => t === Tile.BUG) === 0) {
		level.delete(highKey);
	}
};

export const p2 =
	(genTarget = 200) =>
	(input: string): number => {
		let levels = new Map<number, Tile[][]>();
		levels.set(0, parse(input) as Tile[][]);

		for (let gen = 0; gen < genTarget; gen++) {
			const nextLevels = new Map<number, Tile[][]>();
			expand(levels);
			for (const [dimension, map] of levels.entries()) {
				const nextGen: Tile[][] = [];
				for (let y = 0; y < map.length; y++) {
					const row = map[y];
					const nextRow: Tile[] = [];
					if (row) {
						for (let x = 0; x < map.length; x++) {
							if (x === 2 && y === 2) {
								nextRow[x] = Tile.EMTPY;
							} else {
								const tile = row[x];
								if (tile) {
									const adj = recursiveAdjacents(x, y, dimension);

									if (tile === Tile.BUG && isDie(adj, levels)) {
										nextRow[x] = Tile.EMTPY;
									} else if (tile === Tile.EMTPY && isBirth(adj, levels)) {
										nextRow[x] = Tile.BUG;
									} else {
										nextRow[x] = tile;
									}
								}
							}
						}
					}
					nextGen[y] = nextRow;
				}
				nextLevels.set(dimension, nextGen);
			}
			levels = nextLevels;
			shrink(levels);
		}
		return [...levels.values()].flat(2).count((t) => t === Tile.BUG);
	};

await task(p2(), packageJson.aoc); // 2120 ~741ms
