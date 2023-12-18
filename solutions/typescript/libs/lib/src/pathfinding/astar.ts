import type { GraphTraversalOptions } from '../model/graph/graph.class.js';
import type { BasicGraphNode } from '../model/graph/node.class.js';
import type { ToString } from '../model/to-string.interface.js';
import type { EdgeCollectionOptions, PathFindingResult } from './dijkstra.js';

export const aStar = <T extends ToString, Dir extends ToString, N extends BasicGraphNode<T, Dir>>(
	options: GraphTraversalOptions<T, Dir, N> &
		Omit<EdgeCollectionOptions<T, Dir, N>, 'pathConstructor'>,
): PathFindingResult<N> => {
	console.log(options);
	return { distances: new Map(), path: [] };
};
