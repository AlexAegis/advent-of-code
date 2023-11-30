import { task } from '@alexaegis/advent-of-code-lib';
import { drawMapStatic, renderMatrix } from '@alexaegis/advent-of-code-lib/functions';
import type { GridGraphNode, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import { GridGraph } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import { Tile, doorMatcher, parseLines, parseMatrix, type Key } from './parse.js';

/**
 * Heuristic function for pathfinding
 *
 * @param inventory
 */
export const weighter =
	(inventory: Set<string>) =>
	(n: GridGraphNode, _a: GridGraphNode): number => {
		const v = n.value as Tile;
		switch (v) {
			case Tile.WALL: {
				return Number.POSITIVE_INFINITY;
			}
			case Tile.EMPTY: {
				return 0;
			}
			case Tile.ENTRANCE: {
				return 0;
			}
			default: {
				return doorMatcher.test(v) && inventory.has(v) ? 0 : Number.POSITIVE_INFINITY;
			}
		}
	};

export const under = (tile: Tile): (Tile | Key)[] => {
	return tile === Tile.WALL || tile === Tile.EMPTY ? [tile] : [tile, Tile.EMPTY];
};

export const draw = (m: Map<string, GridGraphNode>, size: Vec2): void => {
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
