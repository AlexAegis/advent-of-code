import { Direction, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

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

	const path = graph.aStar(start, end, {
		heuristic: (node) => node.coordinate.manhattan(end.coordinate),
		edgeGenerator: (nodeMap, from, tentativePath) => {
			const maxConsecutivePathInTheSameDirection = 4;
			const lastThree = tentativePath.slice(-maxConsecutivePathInTheSameDirection);
			const whenAllTheSame = lastThree
				.slideWindow(2)
				.map(([a, b]) => a.directionTo(b))
				.reduceIfAllTheSame(); // todo: add a minlength filter

			const last = tentativePath.at(-2);
			//&& last?.directionTo(from)?.equals(d.reverse())
			return Direction.cardinalDirections
				.filter((d) =>
					whenAllTheSame && lastThree.length === maxConsecutivePathInTheSameDirection
						? !d.equals(whenAllTheSame)
						: true,
				)
				.filterMap((direction) => {
					const to = nodeMap.get(from.coordinate.add(direction).toString());
					return to
						? {
								direction,
								from,
								to,
								weight: to.value,
							}
						: undefined;
				});
		},
		/*currentPathWeighter: (from, to, direction, tentativePath) => {
			//console.log(
			//	'tentativePath',
			//	tentativePath.map((a) => a.coordinate.toString() + ' ' + a.value),
			//);
			//console.log('a', from.value, from.coordinate.toString());
			//console.log('b', to.value, to.coordinate.toString());
			const maxConsecutivePathInTheSameDirection = 4;
			const lastThree = tentativePath.slice(-maxConsecutivePathInTheSameDirection);
			//console.log(
			//	'lastThree',
			//	lastThree.map((a) => a.coordinate.toString() + ' ' + a.value),
			//);

			const whenAllTheSame = lastThree
				.slideWindow(2)
				.map(([a, b]) => a.directionTo(b))
				.reduceIfAllTheSame();

			if (
				lastThree.length === maxConsecutivePathInTheSameDirection &&
				whenAllTheSame &&
				direction.equals(whenAllTheSame)
			) {
				return 100;
			}

			const last = tentativePath.at(-2);

			if (last === from) {
				console.log('WHATTEFEFEFEFEF');
			}

			if (last?.directionTo(from)?.equals(direction.reverse())) {
				return 100;
			}

			console.log('VAL');
			return to.value;
		},*/
	});

	graph.printPath(path.path);

	return path.path
		.slice(1)
		.map((node) => node.value)
		.sum();
};

await task(p1, packageJson.aoc); // 0 ~0ms
// 1014 too high
