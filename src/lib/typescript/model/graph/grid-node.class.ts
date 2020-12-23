import { Direction, Vec2 } from '@lib/model';
import '../../map/map.polyfill';
import { Graph } from './graph.class';
import { Weighter } from './heuristic.type';
import { Node } from './node.class';
import { Vertice } from './vertice.type';

/**
 *
 */
export class GridNode<T = string> extends Node<T, Direction> {
	public constructor(public p: Vec2, ...values: T[]) {
		super(...values);
	}

	public get north(): Vertice<this> | undefined {
		return this.neighbours.get(Direction.NORTH);
	}

	public get northEast(): Vertice<this> | undefined {
		return this.neighbours.get(Direction.NORTHEAST);
	}

	public get east(): Vertice<this> | undefined {
		return this.neighbours.get(Direction.EAST);
	}

	public get southEast(): Vertice<this> | undefined {
		return this.neighbours.get(Direction.SOUTHEAST);
	}

	public get south(): Vertice<this> | undefined {
		return this.neighbours.get(Direction.SOUTH);
	}

	public get southWest(): Vertice<this> | undefined {
		return this.neighbours.get(Direction.SOUTHWEST);
	}

	public get west(): Vertice<this> | undefined {
		return this.neighbours.get(Direction.WEST);
	}

	public get northWest(): Vertice<this> | undefined {
		return this.neighbours.get(Direction.NORTHWEST);
	}

	public attachNeightbours(
		graph: Graph<T, Direction, this>,
		directions: Direction[] = Direction.cardinalDirections,
		weighter?: Weighter<this>
	): void {
		for (const dir of directions) {
			const node = graph.nodes.get(this.p.clone().add(dir).toString());
			const reverse = dir.turn(180);
			if (node) {
				const forwardVertice = this.neighbours.getOrAdd(dir, () => ({
					from: this,
					to: node,
				}));
				const backVertice = node.neighbours.getOrAdd(reverse, () => ({
					from: node,
					to: this,
				}));
				forwardVertice.to = node;
				backVertice.to = this;
				graph.vertices.add(forwardVertice);
				//graph.vertices.add(backVertice);
				if (weighter) {
					forwardVertice.weight = weighter(this, node);
					backVertice.weight = weighter(node, this);
					forwardVertice.weighter = () => weighter(this, node);
					backVertice.weighter = () => weighter(node, this);
				}
			}
		}
	}
}
