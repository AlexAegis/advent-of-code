import {
	Direction,
	GridGraph,
	GridGraphNode,
	task,
	type ToString,
} from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse, weighter } from './parse.js';

export const findPartition = <
	T extends ToString = string,
	N extends GridGraphNode<T> = GridGraphNode<T>,
>(
	partitions: Map<N, number>[],
	node: N,
): Map<N, number> => {
	const partition = partitions.find((p) => p.has(node));
	if (!partition) {
		throw new Error('No partition found for node');
	}
	return partition;
};

const enclosedPartitions = <
	T extends ToString = string,
	N extends GridGraphNode<T> = GridGraphNode<T>,
>(
	partitions: Map<N, number>[],
	encloser: Map<N, number>,
): Map<N, number>[] => {
	const partitionsEnclosedByLoop = partitions.filter(
		(partition) =>
			partition !== encloser &&
			partition.keyArray().every(
				(pn) =>
					pn.neighbours.size >= 4 && // Not an edge node
					pn.neighbours
						.valueArray()
						.every((pnn) => encloser.has(pnn.to) || partition.has(pnn.to)),
			),
	);
	return partitionsEnclosedByLoop;
};

export const partitionGraph = <
	T extends ToString = string,
	N extends GridGraphNode<T> = GridGraphNode<T>,
>(
	graph: GridGraph<T, N>,
	foundPartitions: Map<N, number>[],
): Map<N, number>[] => {
	const nonPartitionedNodes = new Set(graph.nodes.values());
	for (const foundPartition of foundPartitions) {
		for (const [foundNode] of foundPartition) {
			nonPartitionedNodes.delete(foundNode);
		}
	}
	while (nonPartitionedNodes.size > 0) {
		const nodeNotInTheLoop = nonPartitionedNodes.values().next().value as N;
		const nextPartition = graph.flood(nodeNotInTheLoop);

		for (const [foundNode] of nextPartition) {
			nonPartitionedNodes.delete(foundNode);
		}
		foundPartitions.push(nextPartition);
	}

	return foundPartitions;
};

export interface GraphLoopPartitions<
	T extends ToString = string,
	N extends GridGraphNode<T> = GridGraphNode<T>,
> {
	loop: Set<N>;
	/**
	 * empty if the loop has no nodes inside, or the loop is not closed
	 */
	inside: Set<N>;
	/**
	 * empty if the loop has no nodes outside, or the loop is not closed
	 */
	outside: Set<N>;
}

export const partitionIntoTwoFromLoop = <
	T extends ToString = string,
	N extends GridGraphNode<T> = GridGraphNode<T>,
>(
	graph: GridGraph<T, N>,
	loop: Map<N, number>,
): GraphLoopPartitions<T, N> => {
	const nonPartitionedNodes = new Set(graph.nodes.values());

	for (const [foundNode] of loop) {
		nonPartitionedNodes.delete(foundNode);
	}

	const foundPartitions: Map<N, number>[] = [];

	while (nonPartitionedNodes.size > 0) {
		const nodeNotInTheLoop = nonPartitionedNodes.values().next().value as N;
		const nextPartition = graph.flood(nodeNotInTheLoop, {
			weighter: (a, b) => (loop.has(a) || loop.has(b) ? Number.POSITIVE_INFINITY : 1),
		});

		for (const [foundNode] of nextPartition) {
			nonPartitionedNodes.delete(foundNode);
		}
		foundPartitions.push(nextPartition);
	}

	const insides = enclosedPartitions<T, N>(foundPartitions, loop);
	const outside = foundPartitions.find((p) => !insides.includes(p));

	return {
		loop: new Set(loop.keys()),
		inside: new Set(insides.flatMap((i) => i.keyArray())),
		outside: new Set(outside?.keys()),
	};
};

export const p2 = (input: string): number => {
	const originalGraph = parse(input);
	const liminalNodes = new Set<GridGraphNode>();
	// Expanding graph to address liminal space
	const graph = new GridGraph<string>();
	for (const ogNode of originalGraph.nodeValues) {
		for (const { from, to, weight, direction } of Direction.allDirections.map((direction) => ({
			...ogNode.neighbours.get(direction),
			from: ogNode,
			to: originalGraph.getNode(ogNode.coordinate.add(direction)),
			direction,
		}))) {
			if (to === undefined) {
				continue;
			}

			let newNodeSymbol = '.';
			if (from.value === '.' && to.value === '.') {
				newNodeSymbol = '.';
			} else if (weight && weight < Number.POSITIVE_INFINITY) {
				newNodeSymbol = direction.isHorizonal() ? '-' : '|';
			}

			const fromDoubled = from.coordinate.add(from.coordinate);
			const toDoubled = to.coordinate.add(to.coordinate);

			const middle = fromDoubled.middle(toDoubled);

			const newFrom = graph.nodes.getOrAdd(
				fromDoubled.toString(),
				(_n) => new GridGraphNode(fromDoubled, from.value),
			);
			const newMiddle = graph.nodes.getOrAdd(
				middle.toString(),
				(_n) => new GridGraphNode(middle, newNodeSymbol),
			);
			liminalNodes.add(newMiddle);
			const newTo = graph.nodes.getOrAdd(
				toDoubled.toString(),
				(_n) => new GridGraphNode(toDoubled, to.value),
			);

			newFrom.attachNeightbours(graph, Direction.cardinalDirections, weighter);
			newMiddle.attachNeightbours(graph, Direction.cardinalDirections, weighter);
			newTo.attachNeightbours(graph, Direction.cardinalDirections, weighter);
		}
	}

	const animalStart = graph.findNode((node) => node.value === 'S');

	if (!animalStart) {
		throw new Error('no starting position for the animal!');
	}

	const pathLoop = graph.flood(animalStart);

	const { inside, outside } = partitionIntoTwoFromLoop(graph, pathLoop);

	if (process.env['RUN']) {
		graph.print((n) => (inside.has(n) ? 'I' : outside.has(n) ? 'O' : n.toString()));
	}

	return inside.valueArray().filter((node) => !liminalNodes.has(node)).length ?? -1;
};

await task(p2, packageJson.aoc); // 435 ~1.4s
