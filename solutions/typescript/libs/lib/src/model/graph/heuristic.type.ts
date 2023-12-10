import type { Direction } from '../index.js';

/**
 * Determines a value to a node
 */
export type Heuristic<N> = (n: N, tentativePath: N[]) => number;

/**
 * Determines a value to an edge
 */
export type Weighter<N, Dir = Direction> = (a: N, b: N, aToBDirection: Dir) => number;

/**
 * Determines if an edge should be even formed
 */
export type ConnectionFilter<N> = (a: N, b: N, aToBDirection: Direction) => boolean;
