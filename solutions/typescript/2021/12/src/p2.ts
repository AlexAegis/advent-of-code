import { task } from '@alexaegis/advent-of-code-lib';
import { Graph, GraphNode } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

const pathContains = (
	path: GraphNode<string, number>[],
	node: GraphNode<string, number>,
	atMost = 1,
): boolean => {
	return path.count((pathNode) => pathNode.value === node.value) >= atMost;
};

const getPaths = (
	current: GraphNode<string, number>,
	until: (node: GraphNode<string, number>) => boolean,
	allPaths: GraphNode<string, number>[][],
	visitTwice: string | undefined,
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
				pathContains(path, neighbour.to, neighbour.to.value === visitTwice ? 2 : 1))
		) {
			continue;
		}
		getPaths(neighbour.to, until, allPaths, visitTwice, [...path]);
	}
};

/**
 * Find all unique paths from start to end
 * @param input
 * @returns
 */
export const p2 = (input: string): number => {
	const valueEdges = input.lines().map((line) => {
		const [from, to] = line.splitIntoStringPair('-');
		return { from, to };
	});
	const graph = Graph.fromUniqueValueEdges<string>(valueEdges, (t) => t, true);
	const start = graph.getNode('start');

	if (!start) {
		throw new Error('No start node!');
	}

	const smallCaves = [...graph.nodes.values()].filter((node) => node.value.isLowerCase());
	const allPaths: GraphNode<string, number>[][] = smallCaves.flatMap((smallCave) => {
		const paths: GraphNode<string, number>[][] = [];
		getPaths(start, (node) => node.value === 'end', paths, smallCave.value);
		return paths;
	});
	const renderedPaths = allPaths.map((p) => p.map((e) => e.value).join(','));
	const uniqueRenderedPaths = renderedPaths.unique();
	return uniqueRenderedPaths.length;
};

await task(p2, packageJson.aoc); // 98441 ~42s
