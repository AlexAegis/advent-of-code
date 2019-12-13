import { bench, read } from '@lib';
import { drawMapStatic, printMatrix, sleep } from '@lib/functions';
import { IntCodeComputer } from '@lib/intcode';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { parse } from './parse';

export enum TileType {
	EMPTY = 0,
	WALL = 1,
	BLOCK = 2,
	PAD = 3,
	BALL = 4
}

export enum Joy {
	NEUT = 0,
	LEFT = -1,
	RIGHT = 1
}

export const tileToString = (t: TileType | undefined): string => {
	switch (t) {
		case TileType.BALL:
			return 'O';
		case TileType.WALL:
			return '#';
		case TileType.BLOCK:
			return 'X';
		case TileType.PAD:
			return '_';
		case TileType.EMPTY:
		default:
			return ' ';
	}
};

const draw = (m: Map<string, number>): void => {
	console.log(printMatrix(drawMapStatic(m, tileToString, 0, 22, 0, 37)));
};

export const runner = (doDraw: boolean = false, speed = 10) => async (input: string) => {
	const comp = new IntCodeComputer(parse(input));
	comp.tape.set(0, 2);
	const i = comp.iter();
	const m = new Map<string, number>();
	const sd = new Vec2(-1, 0);
	let s = 0;
	let b: Vec2 | undefined;
	let p: Vec2 | undefined;
	let j: Joy = Joy.NEUT;
	comp.pushInput(j);
	while (!comp.isHalt()) {
		const [x, y, t] = [i.next().value, i.next().value, i.next().value];
		const c = new Vec2(x, y);
		if (c.equals(sd)) {
			s = t;
		} else {
			m.set(c.toString(), t);
			if (t === TileType.BALL) {
				b = c;
				if (p) {
					if (p.x > b.x) {
						j = Joy.LEFT;
					} else if (p.x < b.x) {
						j = Joy.RIGHT;
					} else {
						j = Joy.NEUT;
					}
					if (j) {
						p.x += j;
					}
					comp.pushInput(j);
				}
				if (doDraw) {
					draw(m);
					await sleep(speed);
				}
			} else if (t === TileType.PAD) {
				p = c;
			}
		}
	}
	return s;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner(true))}`))(); // 12338 ~223ms
}
