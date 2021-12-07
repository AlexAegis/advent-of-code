import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const positions = input.splitToInt({ delimiter: /,/ });
	const min = positions.min();
	const max = positions.max();
	const costs = min.lerp(max).map((i) => ({
		cost: positions.map((position) => Math.abs(position - i)).sum(),
		i,
	}));
	const minCostIndex = costs.reduce((acc, next) => (next.cost > acc.cost ? acc : next), {
		cost: Infinity,
		i: 0,
	}).i;
	return positions.map((position) => Math.abs(position - minCostIndex)).sum();
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 325528 ~23.57ms
}
