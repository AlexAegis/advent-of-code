/**
 * Represents an edge between two vertices
 */
export interface Edge<N, EdgeData = unknown> {
	from: N;
	to: N;
	data?: EdgeData;
	weight?: number;
	weighter?: () => number;
}
