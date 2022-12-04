import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const areClosedRangesFullyOverlapping = (
	[r1l, r1h]: [number, number],
	[r2l, r2h]: [number, number]
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
			line.split(',').map((r) => r.split('-').map((n) => parseInt(n, 10)) as [number, number])
		)
		.filter(([r1, r2]) => areClosedRangesFullyOverlapping(r1, r2)).length;

await task(p1, packageJson.aoc); // 433 ~1.10ms
