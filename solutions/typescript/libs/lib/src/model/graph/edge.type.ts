import type { CurrentPathWeighter, Direction } from '../index.js';

/**
 * Represents an edge between two vertices
 */
export interface Edge<N, Dir = Direction, EdgeData = unknown> {
	from: N;
	to: N;
	direction: Dir;
	data?: EdgeData;
	weight?: number;
	currentPathWeighter?: CurrentPathWeighter<N, Dir>;
}
