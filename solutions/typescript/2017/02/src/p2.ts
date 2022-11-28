import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import { divisible } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number =>
	split(input)
		.map((line) => {
			const [big, small] = line.splitToInt().desc().bubbleFindPair(divisible);
			return big / small;
		})
		.sum();

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 250 ~0.0505ms
}
