import { ClockwiseDirection, Vec2 } from '@lib/model';
import { Node } from './node.class';
import { Vertice } from './vertice.type';

export class GridNode<T = string> extends Node<T> {
	public constructor(public position: Vec2, ...values: T[]) {
		super(...values);
		this.neighbours.push([undefined, Infinity]);
		this.neighbours.push([undefined, Infinity]);
		this.neighbours.push([undefined, Infinity]);
		this.neighbours.push([undefined, Infinity]);
	}

	public get north(): Vertice<T> {
		return this.neighbours[ClockwiseDirection.NORTH];
	}

	public get east(): Vertice<T> {
		return this.neighbours[ClockwiseDirection.EAST];
	}

	public get south(): Vertice<T> {
		return this.neighbours[ClockwiseDirection.SOUTH];
	}

	public get west(): Vertice<T> {
		return this.neighbours[ClockwiseDirection.WEST];
	}
}
