import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { Graph, Node } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

const pathContains = (
	path: Node<string, number>[],
	node: Node<string, number>,
	atMost = 1
): boolean => {
	return path.count((pathNode) => pathNode.value === node.value) >= atMost;
};

const getPaths = (
	current: Node<string, number>,
	until: (node: Node<string, number>) => boolean,
	allPaths: Node<string, number>[][],
	visitTwice: string | undefined,
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
	const valueVertices = input.lines().map((line) => {
		const [from, to] = line.split('-');
		return { from, to };
	});
	const graph = Graph.fromUniqueValueVertices<string>(valueVertices, (t) => t, true);
	const start = graph.getNode('start')!;

	const smallCaves = [...graph.nodes.values()].filter((node) => node.value.isLowerCase());
	const allPaths: Node<string, number>[][] = smallCaves.flatMap((smallCave) => {
		const paths: Node<string, number>[][] = [];
		getPaths(start, (node) => node.value === 'end', paths, smallCave.value);
		return paths;
	});
	const renderedPaths = allPaths.map((p) => p.map((e) => e.value).join(','));
	const uniqueRenderedPaths = renderedPaths.unique();
	return uniqueRenderedPaths.length;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 98441 ~42s
}
