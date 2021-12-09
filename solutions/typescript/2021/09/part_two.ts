import { bench, read } from '@lib';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';
import { getLowPoints } from './part_one';

export const runner = (input: string): number => {
	const heightMap = input.toVectorMap((s) => s.tryInt());
	const lowPoints = getLowPoints(heightMap);

	const flow = (coord: Vec2, checked = new Set<string>()): Vec2[] => {
		const neighbours = Direction.cardinalDirections
			.map((direction) => coord.add(direction))
			.filter((nc) => {
				const ncs = nc.toString();
				const nch = heightMap.get(ncs);
				return !checked.has(ncs) && nch !== 9 && nch !== undefined;
			});
		neighbours.forEach((neighbour) => checked.add(neighbour.toString()));
		return [...neighbours, ...neighbours.flatMap((neighbour) => flow(neighbour, checked))];
	};

	const basins = lowPoints.map(([key]) => flow(new Vec2(key)));
	const largestThreeBasins = basins.sort((a, b) => b.length - a.length).slice(0, 3);
	return largestThreeBasins.map((basin) => basin.length).reduce((a, n) => a * n, 1);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1047744 ~26.36ms
}
