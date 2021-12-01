import { bench, read } from '@lib';
import { chunksOfArray } from '@lib/functions/chunks-of-array.function';
import { day, year } from '.';
import { parse } from './parse';

export const runner = (input: string): number => {
	const h = 6;
	const w = 25;

	const lines = parse(input);

	const resultLine = chunksOfArray(lines, h * w)
		.map((layer) => [layer, layer.count((n) => n === 0)])
		.reduce((a, n) => (n[1] < a[1] ? n : a), [[] as number[], Infinity])[0] as number[];

	return resultLine.count((n) => n === 1) * resultLine.count((n) => n === 2);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1088 ~2.3ms
}
