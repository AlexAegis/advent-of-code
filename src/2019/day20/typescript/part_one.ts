import { bench, read } from '@lib';
import { Direction, Vec2 } from '@lib/model';
import { GridGraph, GridNode } from '@lib/model/graph';
import { Heuristic } from '@lib/model/graph/heuristic.type';
import { PortalGridGraph } from '@lib/model/graph/portal-grid-graph.class';
import { day, year } from '.';
import { parseLines } from './parse';
import { PortalGridNode } from '@lib/model/graph/portal-grid-node.class';

export enum Tile {
	WALL = '#',
	PATH = '.',
	EMPTY = ' '
}

export const h: Heuristic<string, PortalGridNode<string>> = (
	_a: PortalGridNode<string>,
	b: PortalGridNode<string>
): number => {
	switch (b.value) {
		case Tile.EMPTY:
			return Infinity;
		case Tile.WALL:
			return Infinity;
		case Tile.PATH:
			return 0;
		default:
			return Infinity;
	}
};

export const readLabelOn = (v: Vec2, matrix: string[][]): string | undefined => {
	const d = Direction.directions.find(dir => {
		const c = v.add(dir);
		const t = matrix[c.x][c.y];
		return t !== Tile.WALL && t !== Tile.PATH && t !== Tile.EMPTY;
	});

	if (d) {
		const ld = [v.add(d), v.add(d, 2)].sort(Vec2.compare);
		return ld.map(c => matrix[c.x][c.y]).join('');
	} else return undefined;
};

export const runner = async (input: string) => {
	const matrix = parseLines(input);
	const graph = PortalGridGraph.fromTorus(
		matrix,
		(v: Vec2) => readLabelOn(v, matrix),
		(v: Vec2) => {
			const t = matrix[v.x][v.y];
			return t === Tile.WALL || t === Tile.PATH;
		},
		h
	);

	console.log(graph);
	return 0;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await runner('')}`))();
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
