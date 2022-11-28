import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { isTriangle, Triangle } from './is-triangle.function.js';

export const runner = (input: string): number => {
	const splitOptions = { toIntOptions: { safe: true } };
	const result = split(input).reduce(
		(acc, line) => {
			const sides = line.splitToInt(splitOptions) as Triangle;
			if (acc.side === 0) {
				acc.bufferSidesA = sides;
				acc.side = 1;
			} else if (acc.side === 1) {
				acc.bufferSidesB = sides;
				acc.side = 2;
			} else {
				for (let i = 0; i < 3; i++) {
					acc.triangles.push([acc.bufferSidesA[i], acc.bufferSidesB[i], sides[i]]);
				}
				acc.side = 0;
			}
			return acc;
		},
		{
			side: 0,
			triangles: [],
			bufferSidesA: [0, 0, 0],
			bufferSidesB: [0, 0, 0],
		} as {
			side: number;
			triangles: Triangle[];
			bufferSidesA: Triangle;
			bufferSidesB: Triangle;
		}
	);

	return result.triangles.count(isTriangle);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 1544 ~1.0257ms
}
