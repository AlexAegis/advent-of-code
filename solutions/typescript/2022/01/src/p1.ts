import { DOUBLE_NEWLINE, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number =>
	input
		.split(DOUBLE_NEWLINE)
		.map((group) => group.splitToInt().sum())
		.max();

await task(p1, packageJson.aoc); // 67450 ~0.22ms
