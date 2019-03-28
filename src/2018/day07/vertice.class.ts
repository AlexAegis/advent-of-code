import { Node } from './node.class';

export class Vertice {
	constructor(public from: Node, public to: Node) {}
	fulfilled = (useBaseCost: boolean = false) => this.from.processed(useBaseCost);
}
