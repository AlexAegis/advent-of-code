import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number =>
	split(input)
		.map((line) => {
			const values = line.splitToInt();
			return values.max() - values.min();
		})
		.sum();

await task(p1, packageJson.aoc); // 47136 ~0.0356ms
