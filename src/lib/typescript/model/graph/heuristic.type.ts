import { Node } from './node.class';

export type Heuristic<T = string, N extends Node<T> = Node<T>> = (a: N, b: N) => number;
