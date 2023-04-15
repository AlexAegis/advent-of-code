import { task } from '@alexaegis/advent-of-code-lib';
import { drawMapStatic, renderMatrix } from '@alexaegis/advent-of-code-lib/functions';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import { GridGraph } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import { Tile, computeMap, type Vacuum } from './parse.js';

const W = 50;
const H = 50;

export const draw = (m: Map<string, Tile>, vacuum: Vacuum): void => {
	const mat = drawMapStatic(
		m,
		(t) => {
			switch (t) {
				case Tile.SCAFFOLD:
					return '##';
				case Tile.OPEN:
				default:
					return '  ';
			}
		},
		0,
		W,
		0,
		H,
		false,
		true
	);
	mat[vacuum.pos.y + 1]![vacuum.pos.x + 1] = vacuum.dir.reverse('v').marker + '!';
	console.log(renderMatrix(mat, true, false));
};

export const p1 = (input: string): number =>
	GridGraph.fromMap(computeMap(input)[0])
		.getIntersections((n) => n?.value === Tile.SCAFFOLD)
		.map((i) => Math.abs(i.coordinate.x * i.coordinate.y))
		.reduce(sum, 0);

await task(p1, packageJson.aoc); // 4864 ~42ms
