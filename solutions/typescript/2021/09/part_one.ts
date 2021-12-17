import { bench, read } from '@lib';
import { Direction, Vec2, Vec2String } from '@lib/model';
import { day, year } from '.';

export const getLowPoints = (map: Map<Vec2String, number>): [Vec2String, number][] =>
	[...map.entries()].filter(([key, value]) => {
		const coord = new Vec2(key);
		return Direction.cardinalDirections
			.map((dir) => coord.add(dir))
			.every((neighbour) => {
				const neightbourHeight = map.get(neighbour.toString());
				return neightbourHeight === undefined || neightbourHeight > value;
			});
	});

export const runner = (input: string): number => {
	const heightMap = input.toVectorMap((s) => s.tryInt());
	return getLowPoints(heightMap)
		.map(([, value]) => 1 + value)
		.sum();
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 456 ~9.63ms
}
