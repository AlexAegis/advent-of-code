import { IntCodeComputer } from '@alexaegis/advent-of-code-intcode';
import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { TileType } from './p2.js';
import { parse } from './parse.js';

export const p1 = (input: string): number => {
	const i = new IntCodeComputer(parse(input)).iter();
	let a = 0;
	while (!i.next().done && !i.next().done) {
		if (i.next().value === TileType.BLOCK) a++;
	}
	return a;
};

await task(p1, packageJson.aoc); // 255 ~16ms
