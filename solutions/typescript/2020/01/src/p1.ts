import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
	const numbers = split(input).map((line) => parseInt(line, 10));
	for (let i = 0; i < numbers.length; i++) {
		const ni = numbers[i];
		for (let j = i + 1; j < numbers.length; j++) {
			const nj = numbers[j];
			if (ni + nj === 2020) {
				return ni * nj;
			}
		}
	}
	return 0;
};

await task(p1, packageJson.aoc); // 787776 ~0.37ms
