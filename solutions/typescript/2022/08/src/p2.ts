import { desc, Direction, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const graph = input.toGridGraph();
	return graph.nodes
		.valueArray()
		.map((node) =>
			Direction.cardinalDirections
				.map((d) => node.walkDirection(d, (n) => n.value < node.value).nodes.length)
				.product()
		)
		.sort(desc)
		.first();
};

await task(p2, packageJson.aoc); // 172224 ~41.09ms
