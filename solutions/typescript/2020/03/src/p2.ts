import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { countTrees } from './p1.js';

export const runner = (input: string): number => {
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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 3154761400 ~0.6ms
}
