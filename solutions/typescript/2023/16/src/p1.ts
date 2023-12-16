import { Direction, Vec2, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { energizeMap } from './internal/beam.js';

export const p1 = (input: string): number => {
	const gg = input.toGridGraph<string>();
	return energizeMap(gg, { position: new Vec2(0, 0), direction: Direction.EAST });
};

await task(p1, packageJson.aoc); // 8034 ~31.37ms
