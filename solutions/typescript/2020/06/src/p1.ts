import { bench, read } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number =>
	input
		.split(/\r?\n\r?\n/)
		.map((group) => new Set(group.replace(/\r?\n/g, '')).size)
		.reduce(sum);

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 6542 ~1ms
}
