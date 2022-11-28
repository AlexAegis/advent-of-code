import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number =>
	input
		.splitToInt()
		.slideWindow()
		.count(([a, b]) => a < b);

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 1451 ~0.22ms
}
