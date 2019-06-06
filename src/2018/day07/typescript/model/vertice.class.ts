import { Node } from './node.class';

export class Vertice {
	public constructor(public from: Node, public to: Node) {}

	public fulfilled(useBaseCost: boolean = false): boolean {
		return this.from.processed(useBaseCost);
	}
}
