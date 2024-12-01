import { task } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	input
		.split(/\r?\n\r?\n/)
		.map((group) => new Set(group.replaceAll(/\r?\n/g, '')).size)
		.reduce(sum);

await task(p1, packageJson.aoc); // 6542 ~1ms
