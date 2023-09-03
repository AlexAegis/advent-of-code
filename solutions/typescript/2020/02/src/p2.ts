import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parseLine } from './p1.js';

export const p2 = (input: string): number =>
	split(input)
		.map(parseLine)
		.filter(
			({ low, high, letter, password }) =>
				(password[low - 1] === letter) !== (password[high - 1] === letter),
		).length;

await task(p2, packageJson.aoc); // 593 ~2ms
