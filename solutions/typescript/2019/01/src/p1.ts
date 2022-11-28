import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number =>
	input
		.split(/\r?\n/)
		.filter((n) => !!n)
		.map((n) => Math.floor(parseInt(n, 10) / 3) - 2)
		.reduce((s, n) => s + n, 0);

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'input.2.txt');
	console.log(`Result: ${await bench(input, runner)}`); // 3399947 ~0.3ms
}
