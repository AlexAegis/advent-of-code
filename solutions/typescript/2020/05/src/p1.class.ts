import { split, task } from '@alexaegis/advent-of-code-lib';
import { max } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };
import { lowerHalf, PlanePartition, upperHalf } from './p1.js';

export class UncertainSeatPosition {
	public row: [number, number] = [0, 127];
	public column: [number, number] = [0, 7];

	private static lowerHalf = ([l, u]: [number, number]): [number, number] => lowerHalf(l, u);
	private static upperHalf = ([l, u]: [number, number]): [number, number] => upperHalf(l, u);

	private static partitionerMap: Record<PlanePartition, (p: UncertainSeatPosition) => void> = {
		F: (p) => (p.row = UncertainSeatPosition.lowerHalf(p.row)),
		B: (p) => (p.row = UncertainSeatPosition.upperHalf(p.row)),
		L: (p) => (p.column = UncertainSeatPosition.lowerHalf(p.column)),
		R: (p) => (p.column = UncertainSeatPosition.upperHalf(p.column)),
	};

	public locate(on: string): UncertainSeatPosition {
		for (const letter of on) {
			UncertainSeatPosition.partitionerMap[letter as PlanePartition](this);
		}
		return this;
	}

	public seatId(): number {
		return this.row[0] * 8 + this.column[0];
	}
}

export const calculateSeatId = (line: string): number =>
	new UncertainSeatPosition().locate(line).seatId();

export const p1 = (input: string): number => split(input).map(calculateSeatId).reduce(max);

await task(p1, packageJson.aoc); // 848 ~4ms
