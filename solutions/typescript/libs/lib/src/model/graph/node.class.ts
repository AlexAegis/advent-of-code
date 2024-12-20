import type { Direction } from '../direction/direction.class.js';
import type { ToString } from '../to-string.interface.js';
import type { Edge } from './edge.type.js';

export interface BasicGraphNode<T extends ToString, Dir extends ToString = Direction>
	extends ToString {
	value: T;
	neighbours: Map<Dir, Edge<T, Dir, this>>;
}

export class GraphNode<T extends ToString, Dir extends ToString = Direction>
	implements ToString, BasicGraphNode<T, Dir>
{
	public neighbours = new Map<Dir, Edge<T, Dir, this>>();

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

	public getNeighbour(direction: Dir): this | undefined {
		return this.neighbours.get(direction)?.to;
	}

	public directionTo(target: this): Dir | undefined {
		return [...this.neighbours.entries()].find(
			([, neightbour]) => neightbour.to === target,
		)?.[0];
	}

	*[Symbol.iterator](): IterableIterator<Edge<T, Dir, this>> {
		yield* this.neighbours.values();
	}

	public get neighbourNodes(): this[] {
		return this.neighbourEdges.map((edge) => edge.to);
	}

	public get neighbourEdges(): Edge<T, Dir, this>[] {
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
