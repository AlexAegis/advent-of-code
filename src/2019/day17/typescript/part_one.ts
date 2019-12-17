import { bench, read, sum } from '@lib';
import { drawMapStatic, printMatrix } from '@lib/functions';
import { IntCodeComputer } from '@lib/intcode';
import { Direction, DirectionMarker, Vec2 } from '@lib/model';
import { resolve } from 'dns';
import { day, year } from '.';
import { parse } from './parse';

export enum Tile {
	SCAFFOLD = '#',
	OPEN = '.',
	INTERSECTION = 'O'
}

export class Vacuum {
	public constructor(public pos: Vec2, public dir: Direction) {}

	public toString(): string {
		return `${(this.pos.toString(), this.dir.reverse('v').marker)}`;
	}
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
				case Tile.INTERSECTION:
					return 'OO';
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
	console.log('hmm', mat);
	mat[vacuum.pos.y + 1][vacuum.pos.x + 1] = vacuum.dir.reverse('v').marker + '!';
	console.log(printMatrix(mat, true, false));
};

const getIntersections = (map: Map<string, string>): Vec2[] => {
	return [...map.entries()]
		.filter(([_k, v]) => v === Tile.SCAFFOLD)
		.map(([k]) => new Vec2(k))
		.filter(s => Direction.directions.every(d => map.get(s.add(d).toString()) === Tile.SCAFFOLD));
};

export const makeMap = (input: string): [Map<string, Tile>, Vacuum] => {
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
			case '^':
			case '>':
			case 'v':
			case '<':
				map.set(cursor.toString(), Tile.SCAFFOLD);
				vacuum = new Vacuum(cursor.clone(), new Direction(resc as DirectionMarker));
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
export const runner = async (input: string) => {
	const [map, vacuum] = makeMap(input);
	const intersections = getIntersections(map);
	intersections.forEach(intersection => map.set(intersection.toString(), Tile.INTERSECTION));
	// draw(map, vacuum);
	return intersections.map(intersection => intersection.x * intersection.y).reduce(sum, 0);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 4864 ~35ms
}
