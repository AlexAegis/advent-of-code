import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';
import { parse } from './parse';

export enum Color {
	WHITE = '#',
	BLACK = '.',
}

export enum ColorCode {
	WHITE = 1,
	BLACK = 0,
}

export const colorCodeToColor = (cc?: ColorCode): Color => {
	switch (cc) {
		case ColorCode.BLACK:
			return Color.BLACK;
		case ColorCode.WHITE:
			return Color.WHITE;
		default:
			return Color.BLACK;
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
/*
export const drawMap = <T>(map: Map<string, T>, renderTile: (t: T) => string, defaultTile = '.'): string[][] => {
	const res: string[][] = [];
	let yS = 0;
	for (const [s, t] of map.entries()) {
		const pos = new Coord(s);
		if (res.length === 0) {
			res.push([]);
			yS = pos.y;
		} else if (pos.y < yS) {
			for (let i = 0; i < yS - pos.y; i++) {
				const newRow: string[] = [];
				for (let j = 0; j < res[0].length; j++) {
					newRow.push(defaultTile);
				}
				res.unshift(newRow);
			}
			yS = pos.y;
		}
	}
	return res;
};*/

export const drawMap = <T>(
	map: Map<string, T>,
	renderTile: (t?: T) => string,
	startY: number,
	endY: number,
	startX: number,
	endX: number
): string[][] => {
	const res: string[][] = [];
	for (let i = startY; i <= endY; i++) {
		const row = [];
		for (let j = startX; j <= endX; j++) {
			row.push(renderTile(map.get(new Vec2(j, i).toString())));
		}
		res.push(row);
	}
	return res;
};

export const printMatrix = (matrix: string[][]): string => {
	return matrix
		.map((row) => row.join(''))
		.reverse()
		.join('\n');
};

export const outputMap = <T>(
	map: Map<string, T>,
	renderTile: (t?: T) => string,
	startY: number,
	endY: number,
	startX: number,
	endX: number
): void => {
	console.log(printMatrix(drawMap(map, renderTile, startY, endY, startX, endX)));
};

export const runner = (input: string): string => {
	const intcode = new IntCodeComputer(parse(input));
	const iter = intcode.iter();

	const map = new Map<string, ColorCode>();
	const pos = new Vec2(0, 0);
	let dir = Direction.NORTH;

	let nextColor: IteratorResult<number>;
	let nextDir: IteratorResult<number>;
	let currentColor: ColorCode = ColorCode.WHITE;
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
	return printMatrix(drawMap(map, colorCodeToColor, -6, 2, -2, 50));
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // AGALRGJE ~10ms
}
