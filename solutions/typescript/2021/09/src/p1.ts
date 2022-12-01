import { Direction, Vec2, Vec2String } from '@alexaegis/advent-of-code-lib/model';
import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

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

export const p1 = (input: string): number => {
	const heightMap = input.toVectorMap((s) => s.tryInt());
	return getLowPoints(heightMap)
		.map(([, value]) => 1 + value)
		.sum();
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 456 ~9.63ms
}
