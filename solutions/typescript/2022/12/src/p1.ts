import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { getHeightValue } from './get-height-value.function.js';

export const p1 = (input: string): number => {
	const graph = input.toGridGraph({
		weighter: (from, to) => {
			// Using forward weights
			const fromValue = getHeightValue(from.value.toString());
			const toValue = getHeightValue(to.value.toString());
			return toValue - fromValue > 1 ? Number.POSITIVE_INFINITY : 0;
		},
	});

	const start = graph.findNode((n) => n.value === 'S');
	const end = graph.findNode((n) => n.value === 'E');

	if (!start || !end) {
		throw new Error('No path found');
	}

	return graph.aStar(start, end).length - 1;
};

await task(p1, packageJson.aoc); // 534 ~83.84ms
