import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const fuel = (mass: number): number => {
	const f = Math.max(Math.floor(mass / 3) - 2, 0);
	return f + (f > 0 ? fuel(f) : 0);
};

export const runner = (input: string): number =>
	input
		.split(/\r?\n/)
		.filter((n) => !!n)
		.map((n) => fuel(parseInt(n, 10)))
		.reduce((s, n) => s + n, 0);

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'input.2.txt');
	console.log(`Result: ${await bench(input, runner)}`); // 5097039 ~0.36ms
}
