import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { isTriangle, type Triangle } from './is-triangle.function.js';

export const p1 = (input: string): number =>
	split(input)
		.map((line) => line.splitToInt() as Triangle)
		.count(isTriangle);

await task(p1, packageJson.aoc); // 869 ~0.9385ms
