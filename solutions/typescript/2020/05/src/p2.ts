import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { calculateSeatId } from './p1.js';

export const p2 = (input: string): number => {
	const seats = [];
	for (const seatId of split(input).map(calculateSeatId)) {
		seats[seatId] = seatId;
	}
	while (seats[0] === undefined) {
		seats.shift();
	}
	return seats.findIndex((seat) => seat === undefined) + seats[0];
};

await task(p2, packageJson.aoc); // 682 ~4ms
