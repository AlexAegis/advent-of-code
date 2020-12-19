import { bench, read, split } from '@lib';
import { day, year } from '.';
import { calculateSeatId } from './part_one';

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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 682 ~4ms
}
