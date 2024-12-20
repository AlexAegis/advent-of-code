import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const getCost = (distance: number): number => {
	let cost = 0;
	for (let i = 1; i <= Math.abs(distance); i++) {
		cost += i;
	}
	return cost;
};

export const p2 = (input: string): number => {
	const positions = input.splitToInt({ delimiter: /,/ });
	const min = positions.min();
	const max = positions.max();
	const costs = min.lerp(max).map((i) => ({
		cost: positions.map((position) => getCost(position - i)).sum(),
		i,
	}));
	const minCostIndex = costs.reduce((acc, next) => (next.cost > acc.cost ? acc : next), {
		cost: Number.POSITIVE_INFINITY,
		i: 0,
	});
	return positions.map((position) => getCost(position - minCostIndex.i)).sum();
};

await task(p2, packageJson.aoc); // 85015836 ~712.10ms
