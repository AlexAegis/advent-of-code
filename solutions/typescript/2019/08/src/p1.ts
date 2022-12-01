import { chunksOfArray } from '@alexaegis/advent-of-code-lib/functions';
import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p1 = (input: string): number => {
	const h = 6;
	const w = 25;

	const lines = parse(input);

	const resultLine = chunksOfArray(lines, h * w)
		.map((layer) => [layer, layer.count((n) => n === 0)])
		.reduce((a, n) => (n[1] < a[1] ? n : a), [[] as number[], Infinity])[0] as number[];

	return resultLine.count((n) => n === 1) * resultLine.count((n) => n === 2);
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 1088 ~2.3ms
}
