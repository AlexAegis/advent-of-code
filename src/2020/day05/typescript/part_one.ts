import { bench, max, read, split } from '@lib';
import { day, year } from '.';

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

export const runner = (input: string): number => split(input).map(calculateSeatId).reduce(max);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 848 ~4ms
}
