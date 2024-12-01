import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
	const graph = input.toGridGraph<number>({
		valueConverter: (value) => Number.parseInt(value, 10),
		weighter: (_from, to, _dir) => to.value,
	}); // heat loss

	const aabb = graph.boundingBox();
	const start = graph.getNode(aabb.topLeft);
	const end = graph.getNode(aabb.bottomRight);

	if (!start || !end) {
		throw new Error('No start or end node!');
	}

	const path = graph.aStar({
		start,
		end,
		heuristic: (node) => node.coordinate.manhattan(end.coordinate),
		edgeFilter: (edge, tentativePath) => {
			const maxConsecutivePathInTheSameDirection = 4;
			const lastThree = tentativePath
				.slice(-maxConsecutivePathInTheSameDirection)
				.slideWindow(2)
				.map(([a, b]) => a.directionTo(b));
			console.log(lastThree.map((a) => a?.toString()));
			const whenAllTheSame = lastThree.reduceIfAllTheSame(
				maxConsecutivePathInTheSameDirection - 1,
			);
			const hasThreeConsecutive = whenAllTheSame && edge.direction.equals(whenAllTheSame);

			const last = tentativePath.at(-2);
			const lastDirection = last?.directionTo(edge.from);
			const isBackwards = lastDirection?.reverse().equals(edge.direction);

			return !isBackwards && !hasThreeConsecutive;
		},
	});

	graph.printPath(path.path);

	return path.path
		.slice(1)
		.map((node) => node.value)
		.sum();
};

await task(p1, packageJson.aoc); // 0 ~0ms
// 1014 too high
