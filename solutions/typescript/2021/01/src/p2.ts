import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number =>
	input
		.splitToInt()
		.slideWindow(3)
		.map((window) => window.sum())
		.slideWindow()
		.count(([a, b]) => a < b);

await task(p2, packageJson.aoc); // 1395 ~0.39ms
