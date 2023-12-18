import type { ToString } from '../to-string.interface.js';
import type { GridGraph } from './grid-graph.class.js';
import type { GridGraphNode } from './grid-node.class.js';

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
		const nextPartition = graph.flood({ start: nodeNotInTheLoop });

		for (const [foundNode] of nextPartition) {
			nonPartitionedNodes.delete(foundNode);
		}
		foundPartitions.push(nextPartition);
	}

	return foundPartitions;
};
