import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parseLine } from './p1.js';

export const runner = (input: string): number =>
	split(input)
		.map(parseLine)
		.filter(
			({ low, high, letter, password }) =>
				(password[low - 1] === letter) !== (password[high - 1] === letter)
		).length;

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 593 ~2ms
}
