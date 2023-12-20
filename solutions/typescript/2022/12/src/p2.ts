import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { getHeightValue } from './get-height-value.function.js';

export const p2 = (input: string): number => {
	const graph = input.toGridGraph({
		weighter: (from, to) => {
			// Using reverse weights
			const toValue = getHeightValue(to.value.toString());
			const fromValue = getHeightValue(from.value.toString());
			return fromValue - toValue > 1 ? Number.POSITIVE_INFINITY : 0;
		},
	});

	const start = graph.findNode((n) => n.value === 'E');

	if (!start) {
		throw new Error('Cannot find starting node');
	}

	return graph.aStar({ start, end: (n) => n.value === 'a' }).path.length - 1;
};

await task(p2, packageJson.aoc); // 525 ~154.81ms
