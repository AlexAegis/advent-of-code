import type { Node } from './node.class.js';

export class Edge {
	public constructor(public from: Node, public to: Node) {}

	public fulfilled(useBaseCost = false): boolean {
		return this.from.processed(useBaseCost);
	}
}
