import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p2 = (input: string): number => {
	const { left, right } = parse(input);

	return left
		.map((l) => {
			const rigthAppearance = right.filter((r) => r === l).length;
			return l * rigthAppearance;
		})
		.sum();
};

await task(p2, packageJson.aoc); // 20373490 ~18.95ms
