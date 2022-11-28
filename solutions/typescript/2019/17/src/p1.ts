import { bench, read } from '@alexaegis/advent-of-code-lib';
import { drawMapStatic, printMatrix } from '@alexaegis/advent-of-code-lib/functions';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import {
	Direction,
	DirectionArrowSymbol,
	GridGraph,
	Vec2,
	Vec2String,
} from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export enum Tile {
	SCAFFOLD = '#',
	OPEN = '.',
}

export class Vacuum {
	public constructor(public pos: Vec2, public dir: Direction) {}
}

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
	mat[vacuum.pos.y + 1][vacuum.pos.x + 1] = vacuum.dir.reverse('v').marker + '!';
	console.log(printMatrix(mat, true, false));
};

export const computeMap = (input: string): [Map<Vec2String, Tile>, Vacuum] => {
	const i = new IntCodeComputer(parse(input));
	const it = i.iter();
	const map = new Map<Vec2String, Tile>();
	const cursor = new Vec2(0, 0);
	let vacuum!: Vacuum;
	while (!i.isHalt()) {
		const res = it.next().value;
		const resc: DirectionArrowSymbol | Tile | '\n' = String.fromCharCode(res) as
			| DirectionArrowSymbol
			| Tile
			| '\n';

		switch (resc) {
			case Tile.OPEN:
				map.set(cursor.toString(), Tile.OPEN);
				break;
			case Tile.SCAFFOLD:
				map.set(cursor.toString(), Tile.SCAFFOLD);
				break;
			case DirectionArrowSymbol.NORTH:
			case DirectionArrowSymbol.EAST:
			case DirectionArrowSymbol.SOUTH:
			case DirectionArrowSymbol.WEST:
				map.set(cursor.toString(), Tile.SCAFFOLD);
				vacuum = new Vacuum(
					cursor.clone(),
					Direction.fromMarker(resc as DirectionArrowSymbol).reverse()
				);
				break;
			case '\n':
				cursor.x = -1;
				cursor.y++;
				break;
		}
		cursor.x++;
	}
	return [map, vacuum];
};

export const runner = (input: string): number =>
	GridGraph.fromMap(computeMap(input)[0])
		.getIntersections((n) => n?.value === Tile.SCAFFOLD)
		.map((i) => i.coordinate.x * i.coordinate.y)
		.reduce(sum, 0);

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 4864 ~42ms
}
