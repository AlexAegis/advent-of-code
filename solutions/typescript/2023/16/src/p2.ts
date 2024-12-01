import { Direction, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { energizeMap, type Beam } from './internal/beam.js';

export const p2 = (input: string): number => {
	const gg = input.toGridGraph();
	const aabb = gg.boundingBox();
	const startingBeams = [
		...aabb.getTopEdge().map<Beam>((position) => ({ position, direction: Direction.SOUTH })),
		...aabb.getRightEdge().map<Beam>((position) => ({ position, direction: Direction.WEST })),
		...aabb.getBottomEdge().map<Beam>((position) => ({ position, direction: Direction.NORTH })),
		...aabb.getLeftEdge().map<Beam>((position) => ({ position, direction: Direction.EAST })),
	];
	return startingBeams.map((beam) => energizeMap(gg, beam)).max();
};

await task(p2, packageJson.aoc); // 8225 ~1s
