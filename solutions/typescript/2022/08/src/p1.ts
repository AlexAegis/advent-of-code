import { Direction, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	const graph = input.toGridGraph();
	return graph.nodes
		.valueArray()
		.filter((node) =>
			Direction.cardinalDirections.some(
				(d) => node.walkDirection(d, (n) => n.value < node.value).walkedToTheEnd,
			),
		).length;
};

await task(p1, packageJson.aoc); // 1779 ~39.22ms
