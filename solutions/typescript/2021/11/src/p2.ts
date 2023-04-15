import { task } from '@alexaegis/advent-of-code-lib';
import { Direction } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import { next } from './p1.js';

export const p2 = (input: string): number => {
	const graph = input.toGridGraph({
		valueConverter: (s) => s.tryInt(),
		connectionDirections: Direction.allDirections,
	});
	let step = 1;
	while (next(graph) !== graph.size) {
		step++;
	}
	return step;
};

await task(p2, packageJson.aoc); // 351 ~14.20ms
