import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import { min, sum } from '@alexaegis/advent-of-code-lib/math';

import packageJson from '../package.json' assert { type: 'json' };

export const runner = async (input: string): Promise<number> =>
	split(input)
		.map((line) => line.split('x').map((c) => parseInt(c, 10)))
		.map(([l, w, h]) => [l * w, w * h, h * l])
		.map((sides) => sides.reduce(min) + sides.reduce(sum) * 2)
		.reduce(sum, 0);

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 3803038 ~2ms
}
