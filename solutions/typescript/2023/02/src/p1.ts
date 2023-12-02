import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const p1 = (input: string): number =>
	input
		.lines(false)
		.map(parse)
		.filter(
			(game) =>
				game.bags.every((bag) => bag.red <= 12) &&
				game.bags.every((bag) => bag.green <= 13) &&
				game.bags.every((bag) => bag.blue <= 14),
		)
		.map((game) => game.id)
		.sum();

await task(p1, packageJson.aoc); // 2149 ~0.22ms
