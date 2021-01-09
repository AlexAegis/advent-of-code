/**
 * Determines a value to a node
 */
export type Heuristic<N> = (n: N, path: Map<N, N>) => number;
/**
 * Determines a value to a vertice
 */
export type Weighter<N> = (a: N, b: N) => number;
