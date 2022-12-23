import { task } from '@alexaegis/advent-of-code-lib';
import { Graph, Node } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

const getPaths = (
	current: Node<string, number>,
	until: (node: Node<string, number>) => boolean,
	allPaths: Node<string, number>[][],
	path: Node<string, number>[] = []
): void => {
	path.push(current);
	if (until(current)) {
		allPaths.push(path);
		return;
	}
	for (const neighbour of current) {
		if (
			neighbour.to.value === 'start' ||
			(neighbour.to.value.isLowerCase() &&
				path.some((node) => node.value === neighbour.to.value))
		) {
			continue;
		}
		getPaths(neighbour.to, until, allPaths, [...path]);
	}
};

/**
 * Find all unique paths from start to end
 * @param input
 * @returns
 */
export const p1 = (input: string): number => {
	const valueEdges = input.lines().map((line) => {
		const [from, to] = line.split('-');
		return { from, to };
	});
	const graph = Graph.fromUniqueValueEdges<string>(valueEdges, (t) => t, true);
	const start = graph.getNode('start')!;
	const allPaths: Node<string, number>[][] = [];
	getPaths(start, (node) => node.value === 'end', allPaths);
	return allPaths.length;
};

await task(p1, packageJson.aoc); // 4167 ~5.83ms
