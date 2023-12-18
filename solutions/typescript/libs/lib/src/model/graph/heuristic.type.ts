import type { BasicGraphNode, Direction, ToString } from '../index.js';

/**
 * Determines a value to a node
 */
export type Heuristic<
	T extends ToString,
	Dir extends ToString,
	N extends BasicGraphNode<T, Dir>,
> = (n: N, tentativePath: N[]) => number;

/**
 * Determines a value to an edge
 */
export type Weighter<T extends ToString, Dir extends ToString, N extends BasicGraphNode<T, Dir>> = (
	a: N,
	b: N,
	aToBDirection: Dir,
) => number;

/**
 * Determines a value to an edge, based on the current, tentative path
 */
export type CurrentPathWeighter<
	T extends ToString,
	Dir extends ToString,
	N extends BasicGraphNode<T, Dir>,
> = (a: N, b: N, aToBDirection: Dir, tentativePath: N[]) => number;

/**
 * Determines if an edge should be even formed
 */
export type ConnectionFilter<
	T extends ToString,
	Dir extends ToString,
	N extends BasicGraphNode<T, Dir>,
> = (a: N, b: N, aToBDirection: Direction) => boolean;
