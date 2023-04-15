import { task } from '@alexaegis/advent-of-code-lib';
import { chunksOfArray } from '@alexaegis/advent-of-code-lib/functions';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const p1 = (input: string): number => {
	const h = 6;
	const w = 25;

	const lines = parse(input);

	const resultLine = chunksOfArray(lines, h * w)
		.map<[number[], number]>((layer) => [layer, layer.count((n) => n === 0)])
		.reduce((a, n) => (n[1] < a[1] ? n : a), [[] as number[], Infinity])[0] as number[];

	return resultLine.count((n) => n === 1) * resultLine.count((n) => n === 2);
};

await task(p1, packageJson.aoc); // 1088 ~2.3ms
