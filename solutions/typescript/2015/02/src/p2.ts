import { split, task } from '@alexaegis/advent-of-code-lib';
import { ascending, dup, mult, sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json';

export const p2 = (input: string): number =>
	split(input)
		.map((line) => line.split('x').map((c) => parseInt(c, 10)))
		.map((s) => s.reduce(mult, 1) + s.sort(ascending).slice(0, 2).map(dup).reduce(sum, 0))
		.reduce(sum, 0);

await task(p2, packageJson.aoc); // 3842356 ~2.4ms
