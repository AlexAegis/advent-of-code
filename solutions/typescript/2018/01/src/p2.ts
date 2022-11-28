import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number => {
	const frequencyHistory = new Set();
	const cache: number[] = input.split(/\r?\n/).map((s) => parseInt(s, 10));
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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 55250 ~10ms
}
