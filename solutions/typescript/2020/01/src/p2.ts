import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const numbers = split(input).map((line) => parseInt(line, 10));
	for (let i = 0; i < numbers.length; i++) {
		const ni = numbers[i];
		for (let j = i + 1; j < numbers.length; j++) {
			const nj = numbers[j];
			for (let k = j + 1; k < numbers.length; k++) {
				const nk = numbers[k];
				if (ni + nj + nk === 2020) {
					return ni * nj * nk;
				}
			}
		}
	}
	return 0;
};

await task(p2, packageJson.aoc); // 262738554 ~3.4ms
