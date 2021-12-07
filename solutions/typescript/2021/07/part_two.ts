import { bench, read } from '@lib';
import { day, year } from '.';

const getCost = (distance: number): number => {
	let cost = 0;
	for (let i = 1; i <= Math.abs(distance); i++) {
		cost += i;
	}
	return cost;
};

export const runner = (input: string): number => {
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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 85015836 ~712.10ms
}
