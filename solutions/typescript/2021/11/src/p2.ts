import { bench, read } from '@alexaegis/advent-of-code-lib';
import { Direction } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { next } from './p1.js';

export const runner = (input: string): number => {
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
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 351 ~14.20ms
}
