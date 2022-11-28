import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number =>
	input
		.lines()
		.map((line) => {
			const [, codes] = line.split(/ \| /).map((codes) => codes.split(/ /g));
			return codes.count(
				(value) =>
					value.length === 2 ||
					value.length === 3 ||
					value.length === 4 ||
					value.length === 7
			);
		})
		.sum();

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 473 ~0.22ms
}
