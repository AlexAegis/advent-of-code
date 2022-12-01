import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

export const EMPTY = '.';
export const TREE = '#';

export const countTrees = (lines: string[], slope: Vec2, position = new Vec2(0, 0)): number =>
	lines.filter((line) => {
		position.addMut(slope);
		position.x = position.x % line.length;
		return lines[position.y]?.[position.x] === TREE;
	}).length;

export const p1 = (input: string): number => countTrees(split(input), new Vec2(3, 1));

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 265 ~0.3ms
}
