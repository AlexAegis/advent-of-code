import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parseLine } from './p1.js';

export const p2 = (input: string): number =>
	split(input)
		.map(parseLine)
		.filter(
			({ low, high, letter, password }) =>
				(password[low - 1] === letter) !== (password[high - 1] === letter)
		).length;

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 593 ~2ms
}
