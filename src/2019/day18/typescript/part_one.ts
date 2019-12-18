import { bench, read } from '@lib';
import { drawMapStatic, printMatrix } from '@lib/functions';
import { Vec2 } from '@lib/model';
import { ToString } from '@lib/model/to-string.interface';
import { day, year } from '.';
import { GridGraph } from './model/graph.class';
import { GridNode } from './model/node.class';
import { Door, doorMatcher, Key, parseLines, parseMatrix, Tile } from './parse';

export const h = (inventory: Set<string>) => (n: GridNode<string>): number => {
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

export const draw = (m: Map<string, GridNode<string>>, size: Vec2, level: number = 0): void => {
	const mat = drawMapStatic(m, t => t?.toString(level) ?? ' ', 0, size.y, 0, size.x, false);
	console.log(printMatrix(mat, true, false));
};

export const runner = async (input: string) => {
	const matrix = parseLines(input);
	const { map, doors, keys, size } = parseMatrix(matrix);
	const inventory = new Set<Key>();

	const graph = GridGraph.fromMatrix(matrix, h(inventory), under);

	console.log('map: ', map, 'doors: ', doors, 'keys: ', keys, 'size: ', size);
	draw(graph.nodeMap, size, 0);
	return 0;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 0 ~0ms
}
