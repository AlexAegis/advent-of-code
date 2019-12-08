import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';

export const runner = async (input: string) => {
	const h = 6;
	const w = 25;

	const lines = parse(input);

	const chunkSize = h * w;
	const layers: number[][] = [];
	for (let i = 0; i < lines.length; i += chunkSize) {
		layers.push(lines.slice(i, i + chunkSize));
	}

	const resultLine = layers
		.map(layer => [layer, layer.filter(n => n === 0).length])
		.reduce((a, n) => (n[1] < a[1] ? n : a), [[], Infinity] as [number[], number])[0] as number[];

	return resultLine.filter(n => n === 1).length * resultLine.filter(n => n === 2).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1088 ~2.3ms
}
