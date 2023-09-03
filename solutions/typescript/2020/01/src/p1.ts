/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	const numbers = split(input).toInt();
	for (let i = 0; i < numbers.length; i++) {
		const ni = numbers[i]!;
		for (let j = i + 1; j < numbers.length; j++) {
			const nj = numbers[j]!;
			if (ni + nj === 2020) {
				return ni * nj;
			}
		}
	}
	return 0;
};

await task(p1, packageJson.aoc); // 787776 ~0.37ms
