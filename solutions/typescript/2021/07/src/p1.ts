import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	const positions = input.splitToInt({ delimiter: /,/ });
	const min = positions.min();
	const max = positions.max();
	const costs = min.lerp(max).map((i) => ({
		cost: positions.map((position) => Math.abs(position - i)).sum(),
		i,
	}));
	const minCostIndex = costs.reduce((acc, next) => (next.cost > acc.cost ? acc : next), {
		cost: Number.POSITIVE_INFINITY,
		i: 0,
	}).i;
	return positions.map((position) => Math.abs(position - minCostIndex)).sum();
};

await task(p1, packageJson.aoc); // 325528 ~23.57ms
