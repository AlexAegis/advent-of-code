import { Node } from './node.class';

export class Vertice {
	from: Node;
	to: Node;
	constructor(from: Node, to: Node) {
		this.from = from;
		this.to = to;
	}
	fulfilled = (useBaseCost: boolean = false) => this.from.processed(useBaseCost);
}
