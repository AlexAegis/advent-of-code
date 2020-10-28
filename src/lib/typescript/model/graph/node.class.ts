import { ToString } from '@lib/model/to-string.interface';
import { Vertice } from './vertice.type';

export class Node<T = string> implements ToString {
	public neighbours: Vertice<this>[] = [];

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

	public putValue(v: T): this {
		this.values.unshift(v);
		return this;
	}

	public appendNeighbour(n: this, w = 0): void {
		this.neighbours.push([n, w]);
	}

	public toString(layer = 0): string {
		const toPrint = this.values.length > layer ? this.values[layer] : this.bottomValue;
		if (typeof toPrint === 'string') {
			return toPrint;
		} else if ((toPrint as { toString: () => string }).toString !== undefined) {
			return (toPrint as { toString: () => string }).toString();
		} else {
			return ' ';
		}
	}
}
