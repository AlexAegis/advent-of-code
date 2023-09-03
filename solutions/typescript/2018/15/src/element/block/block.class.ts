import { Element } from '../element.class.js';
import type { Edge } from './edge.interface.js';

export abstract class Block extends Element {
	protected _edges: Edge[] = [];
	constructor(
		tile: string,
		protected _weight = 0,
	) {
		super(tile);
	}

	get edges(): Edge[] {
		return this._edges;
	}
}
