import type { ToString } from '../to-string.interface.js';

/**
 * Represents an edge between two vertices
 */
export interface Edge<T extends ToString, Dir extends ToString, N, EdgeData = unknown> {
	from: N;
	to: N;
	direction: Dir;
	data?: EdgeData | T | undefined;
	weight?: number | undefined;
	// currentPathWeighter?: CurrentPathWeighter<T, Dir, N> | undefined;
}
