import { ascending, task, zip } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p1 = (input: string): number => {
	const { left, right } = parse(input);

	left.sort(ascending);
	right.sort(ascending);

	return zip(left, right)
		.map(([l, r]) => Math.abs(l - r))
		.sum();
};

await task(p1, packageJson.aoc); // 1722302 ~16.04ms
