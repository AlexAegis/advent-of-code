import { Element } from '../element.class';
import { Vertice } from './vertice.interface';

export abstract class Block extends Element {
	protected _vertices: Vertice[] = [];
	constructor(tile: string, protected _weight: number = 0) {
		super(tile);
	}

	get vertices(): Vertice[] {
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
