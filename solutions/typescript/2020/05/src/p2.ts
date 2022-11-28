import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { calculateSeatId } from './p1.js';

export const runner = (input: string): number => {
	const seats = [];
	for (const seatId of split(input).map(calculateSeatId)) {
		seats[seatId] = seatId;
	}
	while (seats[0] === undefined) {
		seats.shift();
	}
	return seats.findIndex((seat) => seat === undefined) + seats[0];
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 682 ~4ms
}
