import { bench, read } from '@lib';
import { chunksOfArray } from '@lib/functions/chunks-of-array.function';
import { day, year } from '.';
import { parse } from './parse';

export enum COLOR {
	BLACK = 0,
	WHITE = 1,
	TRANSPARENT = 2,
}

export const runner = (input: string): string => {
	const h = 6;
	const w = 25;

	const lines = parse(input);

	const layers = chunksOfArray(lines, h * w);

	const merged = layers.slice(1).reduce((a, n) => {
		for (let i = 0; i <= n.length; i++) {
			if (a[i] === COLOR.TRANSPARENT) {
				a[i] = n[i];
			}
		}
		return a;
	}, layers[0]);

	return (
		'\n' +
		chunksOfArray(merged, w)
			.map(
				(l) =>
					l
						.map((n) => {
							switch (n) {
								case COLOR.BLACK:
									return '`';
								case COLOR.WHITE:
									return '#';
								case COLOR.TRANSPARENT:
								default:
									return ' ';
							}
						})
						.join('') + '\n'
			)
			.join('')
	);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // LGYHB ~3.26ms
}
