import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const closedRangeIntersectLength = (
	[r1l, r1h]: [number, number],
	[r2l, r2h]: [number, number]
): number => Math.max(Math.min(r1h, r2h) + 1 - Math.max(r1l, r2l), 0);

export const p2 = (input: string): number =>
	split(input)
		.map((line) =>
			line.split(',').map((r) => r.split('-').map((n) => parseInt(n, 10)) as [number, number])
		)
		.filter((pair) => pair[0] && pair[1] && closedRangeIntersectLength(pair[0], pair[1]) > 0)
		.length;

await task(p2, packageJson.aoc); // 852 ~1.07ms
