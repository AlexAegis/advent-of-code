/**
 * Determines a value to a node
 */
export type Heuristic<N> = (n: N, tentativePath: N[]) => number;
/**
 * Determines a value to an edge
 */
export type Weighter<N> = (a: N, b: N) => number;
