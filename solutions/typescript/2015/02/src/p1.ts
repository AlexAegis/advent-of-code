import { split, task } from '@alexaegis/advent-of-code-lib';
import { min, sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json';

export const p1 = (input: string): number =>
	split(input)
		.map(
			(line) =>
				line.split('x').map((c) => Number.parseInt(c, 10)) as [number, number, number],
		)
		.map(([l, w, h]) => [l * w, w * h, h * l])
		.map((sides) => sides.reduce(min) + sides.reduce(sum) * 2)
		.reduce(sum, 0);

await task(p1, packageJson.aoc); // 3803038 ~2ms
