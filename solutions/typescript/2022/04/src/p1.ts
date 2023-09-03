import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const areClosedRangesFullyOverlapping = (
	[r1l, r1h]: [number, number],
	[r2l, r2h]: [number, number],
): boolean => {
	if (r1l < r2l) {
		// r1 has to be larger
		return r1h >= r2h;
	} else if (r1l > r2l) {
		// r1 has to be smaller
		return r1h <= r2h;
	} else {
		return true;
	}
};

export const p1 = (input: string): number =>
	split(input)
		.map((line) =>
			line
				.split(',')
				.map((r) => r.split('-').map((n) => Number.parseInt(n, 10)) as [number, number]),
		)
		.filter((pair) => pair[0] && pair[1] && areClosedRangesFullyOverlapping(pair[0], pair[1]))
		.length;

await task(p1, packageJson.aoc); // 433 ~1.10ms
