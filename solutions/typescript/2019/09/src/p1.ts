import { bench, read } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const runner = (input: string): string =>
	new IntCodeComputer(parse(input)).withInput(1).execute().join(',');

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 3507134798 ~1.62ms
}
