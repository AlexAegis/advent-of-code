import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number =>
	input
		.split('')
		.filter((c) => c === '(' || c === ')')
		.reduce((a, n) => a + (n === '(' ? 1 : -1), 0);

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 74 ~0.5ms
}
