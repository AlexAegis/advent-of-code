import { descending, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const p1 = (input: string): number => {
	const graph = parse(input);

	const animalStart = graph.findNode((node) => node.value === 'S');
	if (!animalStart) {
		throw new Error('no starting position for the animal!');
	}

	const distanceMap = graph.flood(animalStart);

	return distanceMap
		.entryArray()
		.map(([_node, distance]) => distance)
		.sort(descending)
		.first();
};

await task(p1, packageJson.aoc); // 6733 ~0ms
