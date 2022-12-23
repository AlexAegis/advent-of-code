/**
 * Represents an edge between two vertices
 */
export interface Edge<N> {
	from: N;
	to: N;
	weight?: number;
	weighter?: () => number;
}
