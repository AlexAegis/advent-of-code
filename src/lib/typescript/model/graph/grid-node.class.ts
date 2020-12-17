import { CardinalDirectionValueClockwise, Direction, Vec2 } from '@lib/model';
import { Graph } from './graph.class';
import { Heuristic } from './heuristic.type';
import { Node } from './node.class';
import { Vertice } from './vertice.type';

export interface GridVertices<T> {
	north?: Vertice<T>;
	east?: Vertice<T>;
	south?: Vertice<T>;
	west?: Vertice<T>;
}

/**
 * TODO: Add OPTIONAL diagonal capabilities
 */
export class GridNode<T = string> extends Node<T> {
	public constructor(public p: Vec2, ...values: T[]) {
		super(...values);
		this.neighbours.push({ from: this, to: undefined, data: Infinity });
		this.neighbours.push({ from: this, to: undefined, data: Infinity });
		this.neighbours.push({ from: this, to: undefined, data: Infinity });
		this.neighbours.push({ from: this, to: undefined, data: Infinity });
	}

	public get north(): Vertice<this> | undefined {
		return this.neighbours[CardinalDirectionValueClockwise.NORTH];
	}

	public get east(): Vertice<this> | undefined {
		return this.neighbours[CardinalDirectionValueClockwise.EAST];
	}

	public get south(): Vertice<this> | undefined {
		return this.neighbours[CardinalDirectionValueClockwise.SOUTH];
	}

	public get west(): Vertice<this> | undefined {
		return this.neighbours[CardinalDirectionValueClockwise.WEST];
	}

	public gridNeighbours(): GridVertices<this> {
		return {
			north: this.north,
			east: this.east,
			south: this.south,
			west: this.west,
		};
	}

	public attachNeightbours(graph: Graph<T, this>, h?: Heuristic<T, this>): Vertice<this>[] {
		Direction.cardinalDirections
			.map((d) => graph.nodeMap.get(this.p.add(d).toString()))
			.forEach((n, i) => {
				const reverse = Direction.reverseValue(i);
				if (n && reverse !== undefined) {
					this.neighbours[i].to = n;
					n.neighbours[reverse].to = this;
					if (h) {
						this.neighbours[i].data = h(this, n);
						n.neighbours[reverse].data = h(n, this);
					}
				}
			});
		return this.neighbours;
	}
}
