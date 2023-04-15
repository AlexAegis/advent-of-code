import { split, task } from '@alexaegis/advent-of-code-lib';
import { max } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json';

export enum PlanePartition {
	front = 'F',
	back = 'B',
	left = 'L',
	right = 'R',
}

export const lowerHalf = (l: number, u: number): [number, number] => [l, u - (u - l + 1) / 2];
export const upperHalf = (l: number, u: number): [number, number] => [l + (u - l + 1) / 2, u];

export const calculateSeatId = (line: string): number => {
	let rowLow = 0;
	let rowHigh = 127;
	let columnLow = 0;
	let columnHigh = 7;

	for (const letter of line) {
		switch (letter) {
			case PlanePartition.front:
				[rowLow, rowHigh] = lowerHalf(rowLow, rowHigh);
				break;
			case PlanePartition.back:
				[rowLow, rowHigh] = upperHalf(rowLow, rowHigh);
				break;
			case PlanePartition.left:
				[columnLow, columnHigh] = lowerHalf(columnLow, columnHigh);
				break;
			case PlanePartition.right:
				[columnLow, columnHigh] = upperHalf(columnLow, columnHigh);
				break;
		}
	}

	return rowLow * 8 + columnLow;
};

export const p1 = (input: string): number => split(input).map(calculateSeatId).reduce(max);

await task(p1, packageJson.aoc); // 848 ~4ms
