import { split, task } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import { countTrees } from './p1.js';

export const p2 = (input: string): number => {
	const lines = split(input);

	const slopes = [
		//
		new Vec2(1, 1),
		new Vec2(3, 1),
		new Vec2(5, 1),
		new Vec2(7, 1),
		new Vec2(1, 2),
	];

	return slopes.reduce((acc, slope) => acc * countTrees(lines, slope), 1);
};

await task(p2, packageJson.aoc); // 3154761400 ~0.6ms
