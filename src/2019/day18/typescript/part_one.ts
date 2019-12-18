import { bench, read } from '@lib';
import { drawMapStatic, printMatrix } from '@lib/functions';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { parseLines } from './parse';

export const draw = (m: Map<string, string>, size: Vec2): void => {
	const mat = drawMapStatic(m, t => t ?? ' ', 0, size.y, 0, size.x, false);
	console.log(printMatrix(mat, true, false));
};

export const runner = async (input: string) => {
	const { map, doors, keys, size } = parseLines(input);
	console.log('map: ', map, 'doors: ', doors, 'keys: ', keys, 'size: ', size);
	draw(map, size);
	return 0;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 0 ~0ms
}
