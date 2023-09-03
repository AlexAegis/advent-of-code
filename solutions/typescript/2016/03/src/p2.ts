import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { isTriangle, type Triangle } from './is-triangle.function.js';

export const p2 = (input: string): number => {
	const result = split(input).reduce<{
		side: number;
		triangles: Triangle[];
		bufferSidesA: Triangle;
		bufferSidesB: Triangle;
	}>(
		(acc, line) => {
			const sides = line.splitToInt() as Triangle;
			if (acc.side === 0) {
				acc.bufferSidesA = sides;
				acc.side = 1;
			} else if (acc.side === 1) {
				acc.bufferSidesB = sides;
				acc.side = 2;
			} else {
				for (let i = 0; i < 3; i++) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					acc.triangles.push([acc.bufferSidesA[i]!, acc.bufferSidesB[i]!, sides[i]!]);
				}
				acc.side = 0;
			}
			return acc;
		},
		{
			side: 0,
			triangles: [],
			bufferSidesA: [0, 0, 0],
			bufferSidesB: [0, 0, 0],
		},
	);

	return result.triangles.count(isTriangle);
};

await task(p2, packageJson.aoc); // 1544 ~1.0257ms
