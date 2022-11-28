import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number =>
	split(input)
		.map((line) => {
			const e = line.splitToInt();
			const min = e.min();
			const max = e.max();
			return max - min;
		})
		.sum();

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 47136 ~0.0356ms
}
