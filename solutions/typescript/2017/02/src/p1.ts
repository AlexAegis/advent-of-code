import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	split(input)
		.map((line) => {
			const e = line.splitToInt();
			const min = e.min();
			const max = e.max();
			return max - min;
		})
		.sum();

await task(p1, packageJson.aoc); // 47136 ~0.0356ms
