import { Vertice } from './vertice.class';
import { Element } from '../element.class';

export abstract class Block extends Element {
	protected _vertices: Array<Vertice> = [];
	constructor(tile: string, protected _weight: number = 0) {
		super(tile);
	}

	get vertices() {
		return this._vertices;
	}
	/*
	get bottomBlock(): Block {
		return this.vertices[0].to === this ? this.vertices[0].from : this.vertices[0].to;
	}

	get bottom(): Vertice {
		return this.vertices.length > 0 ? this.vertices[0]: undefined;
	}*/
}
