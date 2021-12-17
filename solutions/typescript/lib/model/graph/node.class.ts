import { ToString } from '@lib/model/to-string.interface';
import { Direction } from '../direction/direction.class';
import { Vertice } from './vertice.type';

export class Node<T extends ToString, Dir extends ToString = Direction> implements ToString {
	public neighbours = new Map<Dir, Vertice<this>>();

	public constructor(public key: string, public value: T) {}

	public updateValue(change: (t: T) => T): this {
		this.value = change(this.value);
		return this;
	}

	public setValue(t: T): this {
		this.value = t;
		return this;
	}

	*[Symbol.iterator](): IterableIterator<Vertice<this>> {
		yield* this.neighbours.values();
	}

	public get neighbourNodes(): this[] {
		return this.neighbourVertices.map((vertice) => vertice.to);
	}

	public get neighbourVertices(): Vertice<this>[] {
		return [...this.neighbours.values()];
	}

	public *walk(visited: Set<this> = new Set()): IterableIterator<this> {
		yield this;
		visited.add(this);
		for (const neighbour of this.neighbours.values()) {
			if (neighbour.to && !visited.has(neighbour.to)) {
				yield* neighbour.to.walk(visited);
			}
		}
	}

	public toString(): string {
		if (typeof this.value === 'string') {
			return this.value;
		} else if ((this.value as ToString).toString !== undefined) {
			return (this.value as ToString).toString();
		} else {
			return ' ';
		}
	}
}
