import { bench, read } from '@lib';
import { drawMapStatic, printMatrix } from '@lib/functions';
import { IntCodeComputer } from '@lib/intcode';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';
import { parse } from './parse';

export enum Move {
	NORTH = 1,
	SOUTH = 2,
	WEST = 3,
	EAST = 4
}

export const getDirection = (move: Move): Direction => {
	switch (move) {
		case Move.NORTH:
			return Direction.NORTH;
		case Move.SOUTH:
			return Direction.SOUTH;
		case Move.EAST:
			return Direction.EAST;
		case Move.WEST:
			return Direction.WEST;
		default:
			return Direction.NONE;
	}
};

export enum Status {
	WALL = 0,
	MOVED = 1,
	FINISHED = 2
}

export enum Tile {
	WALL = '#',
	EMPTY = '.',
	OXY = 'O',
	DROID = 'D'
}

const W = 10;
const H = 10;

const draw = (m: Map<string, string>): void => {
	console.log(printMatrix(drawMapStatic(m, t => t ?? '_', -W, W, -H, H)));
};

export const runner = async (input: string) => {
	const i = new IntCodeComputer(parse(input));
	const it = i.iter();
	let s!: Status;
	const p = new Vec2(0, 0);
	const map = new Map<string, Tile>();
	while (s !== Status.FINISHED) {
		const nextMove = Move.WEST;
		const dir = getDirection(nextMove);

		i.pushInput(nextMove);
		s = it.next().value;
		if (s === Status.WALL) {
			map.set(p.toString(), Tile.WALL);
		} else {
			map.set(p.toString(), Tile.EMPTY);
			p.addMut(dir);
			map.set(p.toString(), s === Status.MOVED ? Tile.DROID : Tile.OXY);
		}

		draw(map);
	}

	return 0;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await runner('')}`))();
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
