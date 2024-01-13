/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	BoundingBox,
	Direction,
	GridGraphNode,
	Interval,
	PriorityQueue,
	Vec2,
	ascending,
	memoize,
	renderMatrix,
	task,
	type Vec2Like,
} from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const tiltOld = <T extends string = string, N extends GridGraphNode<T> = GridGraphNode<T>>(
	allNodes: N[],
	direction: Direction,
) => {
	for (;;) {
		const movable = allNodes.find(
			(n) => n.value === 'O' && n.neighbours.get(direction)?.to.value === '.',
		);
		if (movable === undefined) {
			break;
		}

		movable.setValue('.' as T);
		movable.neighbours.get(direction)?.to.setValue('O' as T);
	}
};

const cycleOld = <T extends string = string, N extends GridGraphNode<T> = GridGraphNode<T>>(
	allNodes: N[],
) => {
	for (const cardinalDirection of Direction.cardinalDirections) {
		tiltOld<T>(allNodes, cardinalDirection);
	}
};

const cycle = memoize((startingStoneMap: string[][], wallMap: string[][]): string[][] => {
	let stoneMap = startingStoneMap;
	for (const cardinalDirection of Direction.cardinalDirections) {
		stoneMap = tilt(cardinalDirection, stoneMap, wallMap);
	}
	return stoneMap;
});

const countBefore = <T>(row: T[], element: T, untilIndex: number): number => {
	return 0;
};

const tilt = memoize(
	(direction: Direction, stoneMap: string[][], wallMap: string[][]): string[][] => {
		console.log('Tilt direction', direction.toString());
		console.log('Walls:');
		console.log(renderMatrix(wallMap));
		console.log('Stones');
		console.log(renderMatrix(stoneMap));

		for (let x = 0; x < wallMap.length; x++) {
			const wallRow = wallMap[x]!;
			const stoneRow = stoneMap[x]!;
			for (let y = 0; y < wallMap.length; y++) {
				//	const stonesBeforeWall = stoneRow.filter(v =>)
			}

			// After wall
		}

		return stoneMap;
	},
);

export const findCycle = <T>(values: T[]): T[] | undefined => {
	let cycle: T[] | undefined;
	for (let cs = 1; cs < values.length / 2; cs++) {
		const possibleCycle = values.slice(values.length - cs);

		if (possibleCycle.every((v, i) => values[values.length - i - cs * 2] === v)) {
			cycle = possibleCycle;
		}
	}

	return cycle;
};

const convertWallMapToIntervals = (wallMap: string[][]): Interval[][] => {
	for (let x = 0; x < wallMap.length; x++) {
		const row = wallMap[x]!;
		for (let y = 0; y < row.length; y++) {
			if (row[y] === '#') {
			}
		}
	}
};

export interface ParsedInput2 {
	wallMap: string[][];
	stoneMap: string[][];
}

export const parse2 = (input: string): ParsedInput2 =>
	input.lines(false).reduce<ParsedInput2>(
		(acc, line, _x) => {
			const wallRow = [...line].map((char, _y) => (char === '#' ? '#' : '.'));
			acc.wallMap.push(wallRow);
			const stoneRow = [...line].map((char, _y) => (char === 'O' ? 'O' : '.'));
			acc.stoneMap.push(stoneRow);
			return acc;
		},
		{ wallMap: [], stoneMap: [] },
	);

/**
 * To represent something like:
 * .##
 * #.#
 * .#.
 *
 * A VectorMap would look like this:
 *
 * rows: {
 *   0: [1, 2]
 *   1: [0, 2]
 * 	 2: [1]
 * }
 *
 * The same data is also maintained columnwise for easy access
 *
 *
 */
export class MassVectorMap {
	size: BoundingBox;

	/**
	 * Stores at what row, at what indices items are of a same kind
	 */
	rows = new Map<number, PriorityQueue<number>>();
	columns = new Map<number, PriorityQueue<number>>();

	constructor(size: Vec2Like) {
		this.size = BoundingBox.fromVectors([Vec2.ORIGIN, size]);
	}

	setItem(x: number, y: number): void {
		const rowIndices = this.rows.getOrAdd(x, () => new PriorityQueue<number>([], ascending));
		const columnIndices = this.columns.getOrAdd(
			y,
			() => new PriorityQueue<number>([], ascending),
		);
		rowIndices.push(y);
		columnIndices.push(x);
	}

	hasItem(x: number, y: number): boolean {
		const rowIndices = this.rows.get(y);
		return rowIndices?.find(x) ?? false;
	}

	remove(x: number, y: number): boolean {
		const removedRowwise = this.rows.get(y)?.remove(x) ?? false;
		const removedColumnwise = this.columns.get(x)?.remove(y) ?? false;
		return removedRowwise || removedColumnwise;
	}

	asMatrix(item = '#', emptyItem = '.'): string[][] {
		const result: string[][] = [];
		this.size.vertical;
		for (let x = this.size.vertical.low; x < this.size.vertical.high; x++) {
			const row = this.rows.get(x);
			const renderedRow = [];
			if (row) {
				for (const itemPosition of row.toArray()) {
					while (renderedRow.length < itemPosition) {
						renderedRow.push(emptyItem);
					}
					renderedRow.push(item);
				}
			}

			while (renderedRow.length < this.size.horizontal.length - 1) {
				renderedRow.push(emptyItem);
			}
			result.push(renderedRow);
		}

		return result;
	}
}

export interface ParsedInput3 {
	wallMap: MassVectorMap;
	stoneMap: MassVectorMap;
}

export const parse3 = (input: string): ParsedInput3 => {
	const lines = input.lines(false);
	const size = new Vec2(lines.length, lines[0]?.length);
	return lines.reduce<ParsedInput3>(
		(acc, line, x) => {
			[...line].forEach((item, y) => {
				if (item === '#') {
					console.log('WALL AT', x, y);
					acc.wallMap.setItem(x, y);
				} else if (item === 'O') {
					acc.stoneMap.setItem(x, y);
				}
			});
			return acc;
		},
		{ wallMap: new MassVectorMap(size), stoneMap: new MassVectorMap(size) },
	);
};

export const p2 = (input: string): number => {
	const { stoneMap, wallMap } = parse3(input);
	//	console.log(wallMap.rows);
	console.log(renderMatrix(wallMap.asMatrix('#')));
	console.log('---');
	console.log(renderMatrix(stoneMap.asMatrix('O')));
	console.log('nextStoneMap');
	for (const [y, row] of stoneMap.rows) {
		for (const stone of row.toArray().reverse()) {
			// find the next thing, stone or wall to the right, put it there.

			let x = stone;
			// if (
			// 	stoneMap.hasItem(x, y) ||
			// 	wallMap.hasItem(x, y) ||
			// 	x >= stoneMap.size.horizontal.high
			// ) {
			// 	continue;
			// }
			while (
				(stone !== x || !stoneMap.hasItem(x, y)) &&
				!wallMap.hasItem(x, y) &&
				x < stoneMap.size.horizontal.high
			) {
				x++;
			}

			if (stone !== x) {
				stoneMap.remove(stone, y);
				stoneMap.setItem(x, y);
			}
		}
	}

	console.log(renderMatrix(stoneMap.asMatrix('O')));

	//const nextStoneMap = tilt(Direction.EAST, stoneMap, wallMap);
	//console.log('nextStoneMap');
	//console.log(renderMatrix(nextStoneMap));

	return 0;
};

await task(p2, packageJson.aoc); // 109661 ~0ms
