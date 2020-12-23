import { bench, read } from '@lib';
import { Direction, Vec2 } from '@lib/model';
import { Weighter } from '@lib/model/graph/heuristic.type';
import { PortalGridGraph } from '@lib/model/graph/portal-grid-graph.class';
import { PortalGridNode } from '@lib/model/graph/portal-grid-node.class';
import { day, year } from '.';
import { parseLines } from './parse';

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

export const runner = (input: string): number => {
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

// istanbul ignore next
if (require.main === module) {
	// (async () => console.log(`Result: ${await runner('')}`))();
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
