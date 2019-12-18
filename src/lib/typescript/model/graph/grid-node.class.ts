import { ClockwiseDirection, Direction, Vec2 } from '@lib/model';
import { GridGraph } from './grid-graph.class';
import { Node } from './node.class';
import { Vertice } from './vertice.type';

export class GridNode<T = string> extends Node<T> {
	public neighbours: Vertice<GridNode<T>>[] = [];
	public constructor(public p: Vec2, ...values: T[]) {
		super(...values);
		this.neighbours.push([undefined, Infinity]);
		this.neighbours.push([undefined, Infinity]);
		this.neighbours.push([undefined, Infinity]);
		this.neighbours.push([undefined, Infinity]);
	}

	public get north(): Vertice<GridNode<T>> {
		return this.neighbours[ClockwiseDirection.NORTH];
	}

	public get east(): Vertice<GridNode<T>> {
		return this.neighbours[ClockwiseDirection.EAST];
	}

	public get south(): Vertice<GridNode<T>> {
		return this.neighbours[ClockwiseDirection.SOUTH];
	}

	public get west(): Vertice<GridNode<T>> {
		return this.neighbours[ClockwiseDirection.WEST];
	}

	public attachNeightbours(
		graph: GridGraph<T>,
		h?: (a: GridNode<T>, b: GridNode<T>) => number
	): Vertice<GridNode<T>>[] {
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
