import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { getHeightValue } from './get-height-value.function.js';

export const p2 = (input: string): number => {
	const graph = input.toGridGraph({
		weighter: (from, to) => {
			// Using reverse weights
			const toValue = getHeightValue(to.value.toString());
			const fromValue = getHeightValue(from.value.toString());
			return fromValue - toValue > 1 ? Infinity : fromValue < toValue ? 0 : 1;
		},
	});

	const start = graph.findNode((n) => n.value === 'E');

	return graph.aStar(start, (n) => n.value === 'a').length - 1;
};

await task(p2, packageJson.aoc); // 525 ~140.04ms
