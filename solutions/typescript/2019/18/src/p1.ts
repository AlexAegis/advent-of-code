import { task } from '@alexaegis/advent-of-code-lib';
import { drawMapStatic, renderMatrix } from '@alexaegis/advent-of-code-lib/functions';
import type { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import { GridGraph, GridNode } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { Door, doorMatcher, Key, parseLines, parseMatrix, Tile } from './parse.js';

/**
 * Heuristic function for pathfinding
 *
 * @param inventory
 */
export const weighter =
	(inventory: Set<string>) =>
	(n: GridNode<string>, _a: GridNode<string>): number => {
		const v = n.value;
		if (v === Tile.WALL) {
			return Infinity;
		} else if (v === Tile.EMPTY) {
			return 0;
		} else if (v === Tile.ENTRANCE) {
			return 0;
		} else if (v && v.match(doorMatcher) && inventory.has(v)) {
			return 0;
		} else {
			return Infinity;
		}
	};

export const under = (tile: Tile | Key | Door): (Tile | Key | Door)[] => {
	if (tile === Tile.WALL || tile === Tile.EMPTY) {
		//  || tile === Tile.ENTRANCE
		return [tile];
	} else {
		return [tile, Tile.EMPTY];
	}
};

export const draw = (m: Map<string, GridNode<string>>, size: Vec2): void => {
	const mat = drawMapStatic(m, (t) => t?.toString() ?? ' ', 0, size.y, 0, size.x, false);
	console.log(renderMatrix(mat, true, false));
};

export const p1 = (input: string): number => {
	const matrix = parseLines(input);
	const { size } = parseMatrix(matrix);
	const inventory = new Set<Key>();
	const graph = GridGraph.fromMatrix(matrix, {
		weighter: weighter(inventory),
	});
	GridGraph.toString();
	// console.log('map: ', map, 'doors: ', doors, 'keys: ', keys, 'size: ', size, 'g', graph);
	draw(graph.nodes, size);
	return 0;
};

await task(p1, packageJson.aoc, 'example.1.txt'); // 0 ~0ms
