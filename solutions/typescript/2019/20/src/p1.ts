import { task } from '@alexaegis/advent-of-code-lib';
import {
	Direction,
	PortalGridGraph,
	PortalGridNode,
	Vec2,
	type Weighter,
} from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parseLines } from './parse.js';

export enum Tile {
	WALL = '#',
	PATH = '.',
	EMPTY = ' ',
}

export const weighter: Weighter<string, Direction, PortalGridNode> = (
	_a: PortalGridNode,
	b: PortalGridNode,
): number => {
	switch (b.value as Tile) {
		case Tile.PATH: {
			return 0;
		}
		default: {
			return Number.POSITIVE_INFINITY;
		}
	}
};

export const readLabelOn = (v: Vec2, matrix: string[][]): string | undefined => {
	const d = Direction.cardinalDirections.find((dir) => {
		const c = v.add(dir);
		const t = matrix[c.x]?.[c.y];
		return t !== Tile.WALL && t !== Tile.PATH && t !== Tile.EMPTY;
	});

	if (d) {
		const ld = [v.add(d), v.add(d, { times: 2 })].sort(Vec2.compareColumnFirst);
		return ld.map((c) => matrix[c.x]?.[c.y] ?? '').join('');
	} else return undefined;
};

export const p1 = (input: string): number => {
	const matrix = parseLines(input);
	const graph = PortalGridGraph.fromTorus(matrix, {
		portalOf: (v: Vec2) => readLabelOn(v, matrix),
		filter: (v: Vec2) => {
			const t = matrix[v.x]?.[v.y];
			return t === Tile.WALL || t === Tile.PATH;
		},
		weighter,
	});

	console.log(graph);
	return 0;
};

await task(p1, packageJson.aoc); // 783895 ~22ms
