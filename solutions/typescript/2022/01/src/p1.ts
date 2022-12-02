import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	input
		.splitToIntAndGroupByWhitespace()
		.map((group) => group.sum())
		.max();

await task(p1, packageJson.aoc); // 67450 ~0.22ms
