import { task } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import { Direction, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export enum Color {
	WHITE = '#',
	BLACK = '.',
}

export enum ColorCode {
	WHITE = 1,
	BLACK = 0,
}

export const colorCodeToColor = (cc: ColorCode): Color => {
	switch (cc) {
		case ColorCode.BLACK:
			return Color.BLACK;
		case ColorCode.WHITE:
			return Color.WHITE;
	}
};

export const turnToDir = (cc: Turn): Direction => {
	switch (cc) {
		case Turn.LEFT:
			return Direction.WEST;
		case Turn.RIGHT:
			return Direction.EAST;
	}
};

export enum Turn {
	LEFT = 0,
	RIGHT = 1,
}

export const p1 = (input: string): number => {
	const intcode = new IntCodeComputer(parse(input));
	const iter = intcode.iter();

	const map = new Map<string, ColorCode>();
	const pos = new Vec2(0, 0);
	let dir = Direction.NORTH;

	let nextColor: IteratorResult<number>;
	let nextDir: IteratorResult<number>;
	let currentColor = ColorCode.BLACK;
	let currentDir: Turn;

	intcode.pushInput(currentColor);
	nextColor = iter.next();
	nextDir = iter.next();

	while (!nextColor.done && !nextDir.done && !intcode.isHalt()) {
		currentColor = nextColor.value as ColorCode;
		currentDir = nextDir.value as Turn;

		if (currentDir === Turn.RIGHT) {
			dir = dir.right();
		} else if (currentDir === Turn.LEFT) {
			dir = dir.left();
		}

		map.set(pos.toString(), currentColor);
		pos.addMut(dir);
		intcode.pushInput(map.get(pos.toString()) ?? ColorCode.BLACK);

		nextColor = iter.next();
		nextDir = iter.next();
	}
	return map.size;
};

await task(p1, packageJson.aoc); // 2252 ~44ms
