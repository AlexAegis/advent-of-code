import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { isTriangle, Triangle } from './is-triangle.function.js';

export const runner = (input: string): number => {
	const splitOptions = { toIntOptions: { safe: true } };
	return split(input)
		.map((line) => line.splitToInt(splitOptions) as Triangle)
		.count(isTriangle);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 869 ~0.9385ms
}
