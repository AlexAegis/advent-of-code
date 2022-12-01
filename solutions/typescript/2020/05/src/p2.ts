import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
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

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 682 ~4ms
}
