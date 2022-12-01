import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { Direction } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
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

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 351 ~14.20ms
}
