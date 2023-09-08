import type { Direction } from '../direction/direction.class.js';
import type { ToString } from '../to-string.interface.js';
import type { Edge } from './edge.type.js';

export class GraphNode<T extends ToString, Dir extends ToString = Direction> implements ToString {
	public neighbours = new Map<Dir, Edge<this>>();

	public constructor(
		public key: string,
		public value: T,
	) {}

	public updateValue(change: (t: T) => T): this {
		this.value = change(this.value);
		return this;
	}

	public setValue(t: T): this {
		this.value = t;
		return this;
	}

	*[Symbol.iterator](): IterableIterator<Edge<this>> {
		yield* this.neighbours.values();
	}

	public get neighbourNodes(): this[] {
		return this.neighbourEdges.map((edge) => edge.to);
	}

	public get neighbourEdges(): Edge<this>[] {
		return [...this.neighbours.values()];
	}

	public *walk(visited = new Set<this>()): IterableIterator<this> {
		yield this;
		visited.add(this);
		for (const neighbour of this.neighbours.values()) {
			if (!visited.has(neighbour.to)) {
				yield* neighbour.to.walk(visited);
			}
		}
	}

	public toString(): string {
		if (typeof this.value === 'string') {
			return this.value;
		} else if ((this.value as Partial<ToString>).toString === undefined) {
			return ' ';
		} else {
			return (this.value as ToString).toString();
		}
	}
}
