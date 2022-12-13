import { DOUBLE_NEWLINE, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number =>
	input
		.split(DOUBLE_NEWLINE)
		.map((group) => group.splitToInt().sum())
		.max(3)
		.sum();

await task(p2, packageJson.aoc); // 199357 ~0.25ms
