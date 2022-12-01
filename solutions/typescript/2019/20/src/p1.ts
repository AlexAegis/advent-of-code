import {
	Direction,
	PortalGridGraph,
	PortalGridNode,
	Vec2,
	Weighter,
} from '@alexaegis/advent-of-code-lib/model';
import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parseLines } from './parse.js';

export enum Tile {
	WALL = '#',
	PATH = '.',
	EMPTY = ' ',
}

export const weighter: Weighter<PortalGridNode<string>> = (
	_a: PortalGridNode<string>,
	b: PortalGridNode<string>
): number => {
	switch (b.value) {
		case Tile.PATH:
			return 0;
		case Tile.WALL:
		case Tile.EMPTY:
		default:
			return Infinity;
	}
};

export const readLabelOn = (v: Vec2, matrix: string[][]): string | undefined => {
	const d = Direction.cardinalDirections.find((dir) => {
		const c = v.add(dir);
		const t = matrix[c.x][c.y];
		return t !== Tile.WALL && t !== Tile.PATH && t !== Tile.EMPTY;
	});

	if (d) {
		const ld = [v.add(d), v.add(d, { times: 2 })].sort(Vec2.compareColumnFirst);
		return ld.map((c) => matrix[c.x][c.y]).join('');
	} else return undefined;
};

export const p1 = (input: string): number => {
	const matrix = parseLines(input);
	const graph = PortalGridGraph.fromTorus(matrix, {
		portalOf: (v: Vec2) => readLabelOn(v, matrix),
		filter: (v: Vec2) => {
			const t = matrix[v.x][v.y];
			return t === Tile.WALL || t === Tile.PATH;
		},
		weighter,
	});

	console.log(graph);
	return 0;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 783895 ~22ms
}
