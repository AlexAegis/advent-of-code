import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number =>
	input
		.splitToInt({ keepEmptyLines: false })
		.slideWindow()
		.count(([a, b]) => a < b);

await task(p1, packageJson.aoc); // 1451 ~0.22ms
