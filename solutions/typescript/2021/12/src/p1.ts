import { task } from '@alexaegis/advent-of-code-lib';
import { Graph, GraphNode } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';

const getPaths = (
	current: GraphNode<string, number>,
	until: (node: GraphNode<string, number>) => boolean,
	allPaths: GraphNode<string, number>[][],
	path: GraphNode<string, number>[] = [],
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
		const [from, to] = line.splitIntoStringPair('-');
		return { from, to };
	});
	const graph = Graph.fromUniqueValueEdges<string>(valueEdges, (t) => t, true);
	const start = graph.getNode('start');

	if (!start) {
		throw new Error('No start node!');
	}

	const allPaths: GraphNode<string, number>[][] = [];
	getPaths(start, (node) => node.value === 'end', allPaths);
	return allPaths.length;
};

await task(p1, packageJson.aoc); // 4167 ~5.83ms
