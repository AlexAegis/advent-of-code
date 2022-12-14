/**
 * Determines a value to a node
 */
export type Heuristic<N> = (n: N, tentativePath: N[]) => number;
/**
 * Determines a value to a vertice
 */
export type Weighter<N> = (a: N, b: N) => number;
