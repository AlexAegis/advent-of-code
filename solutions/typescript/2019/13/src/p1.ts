import { bench, read } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { TileType } from './p2.js';
import { parse } from './parse.js';

export const runner = (input: string): number => {
	const i = new IntCodeComputer(parse(input)).iter();
	let a = 0;
	while (!i.next().done && !i.next().done) {
		if (i.next().value === TileType.BLOCK) a++;
	}
	return a;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 255 ~16ms
}
