import {
	Direction,
	GridGraph,
	GridGraphNode,
	task,
	type ToString,
	type Weighter,
} from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

const pipeConnectorMap: Record<string, Direction[]> = {
	'|': [Direction.NORTH, Direction.SOUTH],
	'-': [Direction.WEST, Direction.EAST],
	L: [Direction.NORTH, Direction.EAST],
	J: [Direction.NORTH, Direction.WEST],
	'7': [Direction.SOUTH, Direction.WEST],
	F: [Direction.SOUTH, Direction.EAST],
	'.': [],
	S: [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST],
};

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

const weighter: Weighter<GridGraphNode> = (a, b, dir) => {
	if (a.value === '.' && b.value === '.') {
		return 1;
	}

	const aConnectors = pipeConnectorMap[a.value.toString()];
	const bConnectors = pipeConnectorMap[b.value.toString()];

	const connection =
		(aConnectors?.includes(dir) && bConnectors?.includes(dir.reverse())) ?? false;
	return connection ? 1 : Number.POSITIVE_INFINITY;
};

export const p2 = (input: string): number => {
	const og = input.toGridGraph<string>({
		weighter,
	});

	const liminalNodes = new Set<GridGraphNode>();
	const gg = new GridGraph<string>();
	for (const ogNode of og.nodeValues) {
		for (const { from, to, weight, direction } of Direction.allDirections.map((direction) => ({
			...ogNode.neighbours.get(direction),
			from: ogNode,
			to: og.getNode(ogNode.coordinate.add(direction)),
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

			const newFrom = gg.nodes.getOrAdd(
				fromDoubled.toString(),
				(_n) => new GridGraphNode(fromDoubled, from.value),
			);
			const newMiddle = gg.nodes.getOrAdd(
				middle.toString(),
				(_n) => new GridGraphNode(middle, newNodeSymbol),
			);
			liminalNodes.add(newMiddle);
			const newTo = gg.nodes.getOrAdd(
				toDoubled.toString(),
				(_n) => new GridGraphNode(toDoubled, to.value),
			);

			newFrom.attachNeightbours(gg, Direction.cardinalDirections, weighter);
			newMiddle.attachNeightbours(gg, Direction.cardinalDirections, weighter);
			newTo.attachNeightbours(gg, Direction.cardinalDirections, weighter);
		}
	}

	const animalStart = gg.findNode((node) => node.value === 'S');

	if (!animalStart) {
		throw new Error('no starting position for the animal!');
	}

	const pathLoop = gg.flood(animalStart);

	const { inside, outside } = partitionIntoTwoFromLoop(gg, pathLoop);

	gg.print((n) => (inside.has(n) ? 'I' : outside.has(n) ? 'O' : n.toString()));

	return inside.valueArray().filter((node) => !liminalNodes.has(node)).length ?? -1;
};

await task(p2, packageJson.aoc); // 435 ~0ms
