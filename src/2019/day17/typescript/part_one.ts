import { bench, read, sum } from '@lib';
import { drawMapStatic, printMatrix } from '@lib/functions';
import { IntCodeComputer } from '@lib/intcode';
import { Direction, DirectionMarker, Vec2 } from '@lib/model';
import { GridGraph } from '@lib/model/graph';
import { day, year } from '.';
import { parse } from './parse';

export enum Tile {
	SCAFFOLD = '#',
	OPEN = '.'
}

export class Vacuum {
	public constructor(public pos: Vec2, public dir: Direction) {}
}

const W = 50;
const H = 50;

export const draw = (m: Map<string, Tile>, vacuum: Vacuum): void => {
	const mat = drawMapStatic(
		m,
		t => {
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

export const computeMap = (input: string): [Map<string, Tile>, Vacuum] => {
	const i = new IntCodeComputer(parse(input));
	const it = i.iter();
	const map = new Map<string, Tile>();
	const cursor = new Vec2(0, 0);
	let vacuum!: Vacuum;
	while (!i.isHalt()) {
		const res = it.next().value;
		const resc: DirectionMarker | Tile | '\n' = String.fromCharCode(res) as DirectionMarker | Tile | '\n';

		switch (resc) {
			case Tile.OPEN:
				map.set(cursor.toString(), Tile.OPEN);
				break;
			case Tile.SCAFFOLD:
				map.set(cursor.toString(), Tile.SCAFFOLD);
				break;
			case DirectionMarker.NORTH:
			case DirectionMarker.EAST:
			case DirectionMarker.SOUTH:
			case DirectionMarker.WEST:
				map.set(cursor.toString(), Tile.SCAFFOLD);
				vacuum = new Vacuum(cursor.clone(), Direction.from(resc as DirectionMarker).reverse());
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

export const runner = (input: string) =>
	GridGraph.fromMap(computeMap(input)[0])
		.getIntersections(n => n?.value === Tile.SCAFFOLD)
		.map(i => i.p.x * i.p.y)
		.reduce(sum, 0);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 4864 ~42ms
}
