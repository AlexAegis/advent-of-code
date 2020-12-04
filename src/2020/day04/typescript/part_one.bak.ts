import { bench, read, split } from '@lib';
import { drawMapStatic } from '@lib/functions';
import { Vec2 } from '@lib/model';
import { day, year } from '.';

export const EMPTY = '.';
export const TREE = '#';

export const countTrees = (lines: string[], slope: Vec2, position = new Vec2(0, 0)): number =>
	lines.filter((line) => {
		position.addMut(slope);
		position.x = position.x % line.length;
		return lines[position.y]?.[position.x] === TREE;
	}).length;

export const runner = (input: string): number => {
	const lines = split(input);
	const map = new Map<string, string>();
	let y = 0;
	const height = lines.length;
	const width = lines[0]?.length;
	for (const line of lines) {
		console.log(line);
		let x = 0;
		for (const letter of line) {
			const vec = new Vec2(x, y);
			map.set(vec.toString(), letter);
			x++;
		}
		y++;
	}
	drawMapStatic(map, (t) => t ?? ' ', 0, height, 0, width);
	console.log('y', y);
	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 265 ~0.3ms
}
