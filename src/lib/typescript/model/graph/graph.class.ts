import { Node } from './node.class';

export class Graph<T = string> {
	public nodes: Node<T>[] = [];

	public constructor() {}

	public aStar(start: Node<T>, goal: Node<T>, h: (n: Node<T>) => number) {}
}
