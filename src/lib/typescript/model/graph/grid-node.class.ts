import { ClockwiseDirection, Direction, Vec2 } from '@lib/model';
import { Graph } from './graph.class';
import { Heuristic } from './heuristic.type';
import { Node } from './node.class';
import { Vertice } from './vertice.type';

export class GridNode<T = string> extends Node<T> {
	public constructor(public p: Vec2, ...values: T[]) {
		super(...values);
		this.neighbours.push([undefined, Infinity]);
		this.neighbours.push([undefined, Infinity]);
		this.neighbours.push([undefined, Infinity]);
		this.neighbours.push([undefined, Infinity]);
	}

	public get north(): Vertice<this> {
		return this.neighbours[ClockwiseDirection.NORTH];
	}

	public get east(): Vertice<this> {
		return this.neighbours[ClockwiseDirection.EAST];
	}

	public get south(): Vertice<this> {
		return this.neighbours[ClockwiseDirection.SOUTH];
	}

	public get west(): Vertice<this> {
		return this.neighbours[ClockwiseDirection.WEST];
	}

	public attachNeightbours(graph: Graph<T, this>, h?: Heuristic<T, this>): Vertice<this>[] {
		Direction.directions
			.map(d => graph.nodeMap.get(this.p.add(d).toString()))
			.forEach((n, i) => {
				if (n) {
					this.neighbours[i][0] = n;
					n.neighbours[Direction.reverseValue(i)][0] = this;
					if (h) {
						this.neighbours[i][1] = h(this, n);
						n.neighbours[Direction.reverseValue(i)][1] = h(n, this);
					}
				}
			});
		return this.neighbours;
	}
}
