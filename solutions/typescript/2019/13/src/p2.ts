import { task } from '@alexaegis/advent-of-code-lib';
import { drawMapStatic, renderMatrix, sleep } from '@alexaegis/advent-of-code-lib/functions';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import { clamp } from '@alexaegis/advent-of-code-lib/math';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export enum TileType {
	EMPTY = 0,
	WALL = 1,
	BLOCK = 2,
	PAD = 3,
	BALL = 4,
}

export enum Joy {
	NEUT = 0,
	LEFT = -1,
	RIGHT = 1,
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

const W = 22;
const H = 37;

const draw = (m: Map<string, number>, score: number): void => {
	console.log(score + '\n' + renderMatrix(drawMapStatic(m, tileToString, 0, W, 0, H)));
};

export const p2 =
	(render = false, speed = 10) =>
	async (input: string): Promise<number> => {
		const comp = new IntCodeComputer(parse(input));
		comp.tape.set(0, 2);
		const i = comp.iter();
		const m = new Map<string, number>();
		const sd = new Vec2(-1, 0);
		let s = 0;
		let p: Vec2 | undefined;
		comp.pushInput(Joy.NEUT);
		while (!comp.isHalt()) {
			const [x, y, t] = [i.next().value, i.next().value, i.next().value];
			const c = new Vec2(x, y);
			if (c.equals(sd)) {
				s = t;
			} else {
				if (t === TileType.BALL && p) {
					const j: Joy = clamp(c.x - p.x);
					p.x += j;
					comp.pushInput(j);
				} else if (t === TileType.PAD) {
					p = c;
				}

				if (render) {
					m.set(c.toString(), t);
					if (m.size > W * H) {
						draw(m, s);
						await sleep(speed);
					}
				}
			}
		}
		return s;
	};

await task(p2(), packageJson.aoc); // 12338 ~220ms
