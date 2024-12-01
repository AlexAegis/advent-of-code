import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse, type Bag } from './parse.js';

export const p2 = (input: string): number =>
	input
		.lines(false)
		.map(parse)
		.map<Bag>((game) => ({
			red: game.bags.map((bag) => bag.red).max(),
			green: game.bags.map((bag) => bag.green).max(),
			blue: game.bags.map((bag) => bag.blue).max(),
		}))
		.map((bag) => bag.red * bag.green * bag.blue)
		.sum();

await task(p2, packageJson.aoc); // 71274 ~0.25ms
