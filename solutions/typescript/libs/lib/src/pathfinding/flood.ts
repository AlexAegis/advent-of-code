import type { GraphTraversalOptions } from '../model/graph/graph.class.js';
import type { BasicGraphNode } from '../model/graph/node.class.js';
import type { ToString } from '../model/to-string.interface.js';
import { collectEdges, type EdgeCollectionOptions } from './dijkstra.js';

/**
 * A gutted out aStar, not trying to find a path, but calculating a distanceMap
 * to all reachable nodes.
 */
export const flood = <T extends ToString, Dir extends ToString, N extends BasicGraphNode<T, Dir>>(
	options: GraphTraversalOptions<T, Dir, N> & EdgeCollectionOptions<T, Dir, N>,
): Map<N, number> => {
	if (!options.start) {
		return new Map();
	}
	const openSet = new Set<N>(); // q?
	const cameFrom = new Map<N, N>(); // prev!
	const gScore = new Map<N, number>(); // weightMap! Infinity
	const dMap = new Map<N, number>(); // distanceMap Infinity

	const h = options?.heuristic ?? (() => 1);

	openSet.add(options.start);
	gScore.set(options.start, 0);
	dMap.set(options.start, 0);

	const fScore = new Map<N, number>(); // Infinity
	fScore.set(options.start, h(options.start, []));

	while (openSet.size > 0) {
		const umin = [...openSet.values()].reduce(
			(acc, b) => {
				const u = fScore.get(b) ?? Number.POSITIVE_INFINITY;
				if (!acc.node || u < acc.dist) {
					acc.node = b;
					acc.dist = fScore.get(b) ?? Number.POSITIVE_INFINITY;
				}
				return acc;
			},
			{ node: undefined as N | undefined, dist: Number.POSITIVE_INFINITY },
		);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const current = umin.node!;

		openSet.delete(current);

		for (const neighbour of collectEdges(current, options)) {
			const tentativegScore =
				(gScore.get(current) ?? Number.POSITIVE_INFINITY) +
				(options?.currentPathWeighter
					? options.currentPathWeighter(
							neighbour.from,
							neighbour.to,
							neighbour.direction,
							[],
						)
					: (neighbour.weight ?? 1));
			const tentativeDistance = (dMap.get(current) ?? 0) + 1;
			if (tentativegScore < (gScore.get(neighbour.to) ?? Number.POSITIVE_INFINITY)) {
				cameFrom.set(neighbour.to, current);
				gScore.set(neighbour.to, tentativegScore);
				fScore.set(neighbour.to, tentativegScore);
				dMap.set(neighbour.to, tentativeDistance);
				if (!openSet.has(neighbour.to)) {
					openSet.add(neighbour.to);
				}
			}
		}
	}

	return dMap;
};
