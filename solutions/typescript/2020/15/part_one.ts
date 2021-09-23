import { bench, read } from '@lib';
import { day, year } from '.';

export const calculate =
	(target: number) =>
	(input: string): number => {
		const numbers = input.split(',').map((a) => parseInt(a, 10));

		const map = new Map<number, { turn: number; prevTurn?: number }>();

		let lastNumber = 0;

		for (let i = 1; i <= target; i++) {
			if (i <= numbers.length) {
				lastNumber = numbers[i - 1];
				map.set(lastNumber, { turn: i, prevTurn: undefined });
				continue;
			}
			const c = map.get(lastNumber);

			let result: number;
			if (c) {
				if (!c.prevTurn) {
					result = 0;
				} else {
					result = c.turn - c.prevTurn;
				}
			} else {
				result = 0;
				map.set(lastNumber, { turn: i, prevTurn: undefined });
			}

			const r = map.get(result);
			if (r) {
				r.prevTurn = r.turn;
				r.turn = i;
			} else {
				map.set(result, { turn: i, prevTurn: undefined });
			}

			lastNumber = result;
		}
		return lastNumber;
	};

export const runner = calculate(2020);

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1015 ~0.08ms
}
