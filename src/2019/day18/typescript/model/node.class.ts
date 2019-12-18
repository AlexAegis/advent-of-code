import { Vec2 } from '@lib/model';
import { ToString } from '@lib/model/to-string.interface';

export type Vertice<T> = [Node<T> | undefined, number];

export class Node<T = string> implements ToString {
	public neighbours: Vertice<T>[] = [];

	public values: T[] = [];

	public constructor(...values: T[]) {
		this.values.push(...values);
	}

	public get value(): T | undefined {
		return this.values[0];
	}

	public get bottomValue(): T | undefined {
		return this.values[this.values.length - 1];
	}

	public removeTop(): T | undefined {
		return this.values.shift();
	}

	public putValue(v: T): Node<T> {
		this.values.unshift(v);
		return this;
	}

	public appendNeighbour(n: Node<T>, w: number = 0) {
		this.neighbours.push([n, w]);
	}

	public toString(layer: number = 0): string {
		const toPrint = this.values.length > layer ? this.values[layer] : this.bottomValue;
		if (typeof toPrint === 'string') {
			return toPrint;
		} else if ((toPrint as any).toString !== undefined) {
			return (toPrint as any).toString();
		} else {
			return ' ';
		}
	}
}

export enum ClockwiseDirection {
	NORTH = 0,
	EAST = 1,
	SOUTH = 2,
	WEST = 3
}

// tslint:disable-next-line: max-classes-per-file
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
