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

	*[Symbol.iterator](): IterableIterator<Required<Vertice<this>>> {
		yield* this.neighbours.filter((n) => !!n.to) as Required<Vertice<this>>[];
	}

	public removeTop(): T | undefined {
		return this.values.shift();
	}

	public putValue(v: T): this {
		this.values.unshift(v);
		return this;
	}

	public appendNeighbour(to: this, data: number): void {
		this.neighbours.push({ from: this, to, data });
	}

	public toString(layer = 0): string {
		const toPrint = this.values.length > layer ? this.values[layer] : this.bottomValue;
		if (typeof toPrint === 'string') {
			return toPrint;
		} else if ((toPrint as ToString).toString !== undefined) {
			return (toPrint as ToString).toString();
		} else {
			return ' ';
		}
	}
}
