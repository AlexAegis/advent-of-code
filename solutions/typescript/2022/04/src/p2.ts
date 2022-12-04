import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const closedRangeIntersectLength = (
	[r1l, r1h]: [number, number],
	[r2l, r2h]: [number, number]
): number => Math.max(Math.min(r1h, r2h) + 1 - Math.max(r1l, r2l), 0);

export const p2 = (input: string): number =>
	split(input)
		.map((line) =>
			line.split(',').map((r) => r.split('-').map((n) => parseInt(n, 10)) as [number, number])
		)
		.filter(([r1, r2]) => closedRangeIntersectLength(r1, r2) > 0).length;

await task(p2, packageJson.aoc); // 852 ~1.07ms
