import { isNotNullish } from '@alexaegis/common';
import { PriorityQueue } from 'js-sdsl';
import type { Edge } from '../model/graph/edge.type.js';
import type { GraphTraversalOptions } from '../model/graph/graph.class.js';
import type { CurrentPathWeighter } from '../model/graph/heuristic.type.js';
import type { BasicGraphNode } from '../model/graph/node.class.js';
import type { ToString } from '../model/to-string.interface.js';

export type PathConstructor<N> = (to: N) => N[];

/**
 * TODO: Mark end as NoInfer
 */
export const constructPath = <N>(start: N, end: N | undefined, prevMap: Map<N, N>): N[] => {
	const path: N[] = [];
	if (end) {
		let u: N = end;
		if (start === u || prevMap.get(u)) {
			while (u) {
				path.unshift(u);
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				u = prevMap.get(u)!;
			}
		}
	}
	return path;
};

export interface PathFindingResult<N> {
	path: N[];
	distances: Map<N, number>;
}

export const calculateCostOfTraversal = <
	T extends ToString,
	Dir extends ToString,
	N extends BasicGraphNode<T, Dir>,
>(
	edge: Edge<T, Dir, N>,
	currentPathWeighter?: CurrentPathWeighter<T, Dir, N>,
	pathConstructor?: PathConstructor<N>,
): number => {
	let cost = 1;
	if (isNotNullish(currentPathWeighter) && isNotNullish(pathConstructor)) {
		cost = currentPathWeighter(edge.from, edge.to, edge.direction, pathConstructor(edge.to));
	} else if (isNotNullish(edge.weight)) {
		cost = edge.weight;
	}
	return cost;
};

export interface EdgeCollectionOptions<
	T extends ToString,
	Dir extends ToString,
	N extends BasicGraphNode<T, Dir>,
> {
	allNodes: Map<string, N>;
	pathConstructor: PathConstructor<N>;
	edgeGenerator?:
		| undefined
		| ((nodeMap: Map<string, N>, from: N, path: N[]) => Edge<T, Dir, N>[]);
	edgeFilter?: undefined | ((edge: Edge<T, Dir, N>, tentativePath: N[]) => boolean);
}

export const collectEdges = <
	T extends ToString,
	Dir extends ToString,
	N extends BasicGraphNode<T, Dir>,
>(
	node: N,
	options: EdgeCollectionOptions<T, Dir, N>,
) => {
	const edgeGenerator = options?.edgeGenerator;
	let edges = edgeGenerator
		? edgeGenerator(options.allNodes, node, options.pathConstructor(node))
		: [...node.neighbours.values()];

	const edgeFilter = options?.edgeFilter;
	if (edgeFilter) {
		edges = edges.filter((edge) => edgeFilter(edge, options.pathConstructor(node)));
	}

	return edges;
};

export const dijkstra = <
	T extends ToString,
	Dir extends ToString,
	N extends BasicGraphNode<T, Dir>,
>(
	options: Omit<GraphTraversalOptions<T, Dir, N>, 'heuristic'> &
		Omit<EdgeCollectionOptions<T, Dir, N>, 'pathConstructor'>,
): PathFindingResult<N> => {
	const dist = new Map<N, number>(); // The sum of the weights all the way to the end
	const pathLengthMap = new Map<N, number>(); // How many nodes there are to reach the end
	const prev = new Map<N, N>();
	const pq = new PriorityQueue(options.allNodes, (a, b) => {
		const bDist = dist.get(b) ?? Number.POSITIVE_INFINITY;
		const aDist = dist.get(a) ?? Number.POSITIVE_INFINITY;
		return aDist - bDist;
	});

	const pathConstructor: PathConstructor<N> = (to) => constructPath<N>(options.start, to, prev);
	const isFinished = isNotNullish(options.end)
		? (n: N) =>
				typeof options.end === 'function'
					? options.end(n, pathConstructor(n))
					: n === options.end
		: (_n: N) => false;

	dist.set(options.start, 0);
	pathLengthMap.set(options.start, 0);
	pq.updateItem(options.start);

	let target: N | undefined;
	while (!pq.empty()) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const u = pq.pop()!; // u, closest yet

		if (isFinished(u)) {
			target = u;
			break;
		}

		const uDist = dist.get(u) ?? Number.POSITIVE_INFINITY;

		for (const neighbour of collectEdges<T, Dir, N>(u, {
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
			const alt = uDist + weight; // alt
			const currentCost = dist.get(neighbour.to) ?? Number.POSITIVE_INFINITY;
			if (alt < currentCost) {
				dist.set(neighbour.to, alt);
				prev.set(neighbour.to, u);
				pathLengthMap.set(neighbour.to, (pathLengthMap.get(u) ?? 0) + 1);
				pq.updateItem(neighbour.to);
			}
		}
	}

	return target
		? {
				distances: pathLengthMap,
				path: constructPath(options.start, target, prev),
			}
		: {
				distances: pathLengthMap,
				path: [],
			};
};
