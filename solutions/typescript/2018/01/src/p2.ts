import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p2 = (input: string): number => {
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

await task(p2, packageJson.aoc); // 55250 ~10ms
