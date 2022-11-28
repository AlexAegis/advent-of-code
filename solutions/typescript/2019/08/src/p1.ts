import { bench, read } from '@alexaegis/advent-of-code-lib';
import { chunksOfArray } from '@alexaegis/advent-of-code-lib/functions';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const runner = (input: string): number => {
	const h = 6;
	const w = 25;

	const lines = parse(input);

	const resultLine = chunksOfArray(lines, h * w)
		.map((layer) => [layer, layer.count((n) => n === 0)])
		.reduce((a, n) => (n[1] < a[1] ? n : a), [[] as number[], Infinity])[0] as number[];

	return resultLine.count((n) => n === 1) * resultLine.count((n) => n === 2);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 1088 ~2.3ms
}
