import { bench, read, split } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number =>
	split(input)
		.map((line) => {
			const e = line.splitToInt();
			const min = e.min();
			const max = e.max();
			return max - min;
		})
		.sum();

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 47136 ~0.0356ms
}
