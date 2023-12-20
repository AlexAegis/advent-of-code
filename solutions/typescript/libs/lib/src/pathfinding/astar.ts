import { isNotNullish } from '@alexaegis/common';
import { PriorityQueue } from 'js-sdsl';
import type { GraphTraversalOptions } from '../model/graph/graph.class.js';
import type { BasicGraphNode } from '../model/graph/node.class.js';
import type { ToString } from '../model/to-string.interface.js';
import {
	calculateCostOfTraversal,
	collectEdges,
	constructPath,
	type EdgeCollectionOptions,
	type PathConstructor,
	type PathFindingResult,
} from './dijkstra.js';

/**
 * Finds the shortest path between two nodes in a graph. The nodes must be aware
 * of their own neighbours.
 *
 * When an end is not defined the algorithm will travel though the reachable
 * parts of the graph from the start and calculate the distance to
 * each nodes from the start.
 */
export const aStar = <T extends ToString, Dir extends ToString, N extends BasicGraphNode<T, Dir>>(
	options: GraphTraversalOptions<T, Dir, N> &
		Omit<EdgeCollectionOptions<T, Dir, N>, 'pathConstructor'>,
): PathFindingResult<N> => {
	if (!options.start) {
		return { path: [], distances: new Map() };
	}

	const h = options?.heuristic ?? (() => 1);

	const prev = new Map<N, N>(); // prev!
	const gScore = new Map<N, number>(); // dist! Infinity
	const fScore = new Map<N, number>(); // Infinity
	const pathLengthMap = new Map<N, number>(); // How many nodes there are to reach the end

	gScore.set(options.start, 0);
	fScore.set(options.start, options.end ? h(options.start, []) : 1);
	pathLengthMap.set(options.start, 0);
	// This is used to support weights of 0
	const orderOfDiscovery = [options.start];

	const pq = new PriorityQueue<N>([options.start], (a, b) => {
		const aScore = fScore.get(a) ?? Number.POSITIVE_INFINITY;
		const bScore = fScore.get(b) ?? Number.POSITIVE_INFINITY;

		if (aScore === bScore) {
			let aPathLength = orderOfDiscovery.indexOf(a);
			let bPathLength = orderOfDiscovery.indexOf(b);
			if (aPathLength < 0) {
				aPathLength = Number.POSITIVE_INFINITY;
			}
			if (bPathLength < 0) {
				bPathLength = Number.POSITIVE_INFINITY;
			}
			return aPathLength - bPathLength;
		} else {
			return aScore - bScore;
		}
	});
	const pathConstructor: PathConstructor<N> = (to) => constructPath<N>(options.start, to, prev);

	const isFinished = isNotNullish(options.end)
		? (n: N) =>
				typeof options.end === 'function'
					? options.end(n, pathConstructor(n))
					: n === options.end
		: (_n: N) => false;

	let goal: N | undefined;

	while (pq.length > 0) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const current = pq.pop()!; // u, closest yet
		orderOfDiscovery.removeItem(current);

		if (isFinished(current)) {
			goal = current;
			break;
		}

		const uDist = gScore.get(current) ?? Number.POSITIVE_INFINITY;

		for (const neighbour of collectEdges<T, Dir, N>(current, {
			pathConstructor,
			allNodes: options.allNodes,
			edgeFilter: options.edgeFilter,
			edgeGenerator: options.edgeGenerator,
		})) {
			const weight = calculateCostOfTraversal<T, Dir, N>(
				neighbour,
				options.currentPathWeighter,
				pathConstructor,
			);
			const tentativegScore = uDist + weight;
			const currentScore = gScore.get(neighbour.to) ?? Number.POSITIVE_INFINITY;
			if (tentativegScore < currentScore) {
				prev.set(neighbour.to, current);
				gScore.set(neighbour.to, tentativegScore);
				fScore.set(
					neighbour.to,
					tentativegScore +
						(options.end
							? h(neighbour.to, constructPath<N>(options.start, current, prev))
							: 1),
				);
				pathLengthMap.set(neighbour.to, (pathLengthMap.get(current) ?? 0) + 1);

				if (!pq.updateItem(neighbour.to)) {
					pq.push(neighbour.to);
					orderOfDiscovery.push(neighbour.to);
				}
			}
		}
	}

	return {
		path: goal ? constructPath<N>(options.start, goal, prev) : [],
		distances: pathLengthMap,
	};
};
