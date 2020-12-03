import { bench, read, split } from '@lib';
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

export const runner = (input: string): number => countTrees(split(input), new Vec2(3, 1));

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 265 ~0.3ms
}
