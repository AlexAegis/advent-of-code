import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
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
		cost: Infinity,
		i: 0,
	});
	return positions.map((position) => getCost(position - minCostIndex.i)).sum();
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 85015836 ~712.10ms
}
