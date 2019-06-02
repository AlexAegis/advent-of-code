import { bench } from '@root/bench.function';
import { reader } from '@root/reader.function';
import { year, day } from '.';

export const runner = (input: string): number => {
	let frequencyHistory = new Set();
	let cache: Array<number> = input.split(/\r?\n/).map(s => Number(s));
	let sumTotal: number = 0;
	let firstToBeTwice: number = undefined;

	const calculate = (line: number) => {
		sumTotal += line;
		if (!firstToBeTwice) {
			let prevLength = frequencyHistory.size;
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

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 55250 ~10ms
}
