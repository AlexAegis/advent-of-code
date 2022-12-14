/**
 * Represents a vertice between two nodes with an additional data field.
 */
export interface Vertice<N> {
	from: N;
	to: N;
	/**
	 * Vertice data, like weight.
	 */
	weight?: number;
	weighter?: () => number;
}
