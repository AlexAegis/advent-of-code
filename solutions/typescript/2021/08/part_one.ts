import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number =>
	input
		.lines()
		.map((line) => {
			const [, codes] = line.split(/ \| /).map((codes) => codes.split(/ /g));
			return codes.count(
				(value) =>
					value.length === 2 ||
					value.length === 3 ||
					value.length === 4 ||
					value.length === 7
			);
		})
		.sum();

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 473 ~0.22ms
}
