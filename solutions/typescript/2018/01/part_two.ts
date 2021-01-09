import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const frequencyHistory = new Set();
	const cache: number[] = input.split(/\r?\n/).map((s) => Number(s));
	let sumTotal = 0;
	let firstToBeTwice: number | undefined;

	const calculate = (line: number) => {
		sumTotal += line;
		if (!firstToBeTwice) {
			const prevLength = frequencyHistory.size;
			frequencyHistory.add(sumTotal);
			if (frequencyHistory.size === prevLength) {
				firstToBeTwice = sumTotal;
			}
		}
	};

	while (firstToBeTwice === undefined) {
		cache.forEach(calculate);
	}

	return firstToBeTwice;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 55250 ~10ms
}
