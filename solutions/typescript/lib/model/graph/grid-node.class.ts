import '../../map/map.polyfill.js';
import { Direction } from '../direction/direction.class.js';
import type { ToString } from '../to-string.interface.js';
import { Vec2 } from '../vector/vec2.class.js';
import type { Graph } from './graph.class.js';
import type { Weighter } from './heuristic.type.js';
import { Node } from './node.class.js';
import type { Vertice } from './vertice.type.js';

Vec2.ORIGIN;

type WalkResult<T extends ToString = string> = { nodes: GridNode<T>[]; walkedToTheEnd: boolean };
/**
 *
 */
export class GridNode<T extends ToString = string> extends Node<T, Direction> {
	public constructor(public coordinate: Vec2, value: T) {
		super(coordinate.toString(), value);
	}

	public walkNorth(until?: (next: this) => boolean): WalkResult<T> {
		return this.walkDirection(Direction.NORTH, until);
	}

	public walkNorthEast(until?: (next: this) => boolean): WalkResult<T> {
		return this.walkDirection(Direction.NORTHEAST, until);
	}

	public walkEast(until?: (next: this) => boolean): WalkResult<T> {
		return this.walkDirection(Direction.EAST, until);
	}

	public walkSouthEast(until?: (next: this) => boolean): WalkResult<T> {
		return this.walkDirection(Direction.SOUTHEAST, until);
	}

	public walkSouth(until?: (next: this) => boolean): WalkResult<T> {
		return this.walkDirection(Direction.SOUTH, until);
	}

	public walkSouthWest(until?: (next: this) => boolean): WalkResult<T> {
		return this.walkDirection(Direction.SOUTHWEST, until);
	}

	public walkWest(until?: (next: this) => boolean): WalkResult<T> {
		return this.walkDirection(Direction.WEST, until);
	}

	public walkNorthWest(until?: (next: this) => boolean): {
		nodes: GridNode<T>[];
		walkedToTheEnd: boolean;
	} {
		return this.walkDirection(Direction.NORTHWEST, until);
	}

	public walkDirection(direction: Direction, whileTrue?: (next: this) => boolean): WalkResult<T> {
		const nodes: this[] = [];
		let neighbour = this.neighbours.get(direction)?.to;
		let walkedToTheEnd = true;
		while (neighbour) {
			nodes.push(neighbour);
			if (whileTrue && !whileTrue(neighbour)) {
				walkedToTheEnd = false;
				break;
			}
			neighbour = neighbour.neighbours.get(direction)?.to;
		}
		return { nodes, walkedToTheEnd };
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

	public calculateWeights(weighter: Weighter<this>) {
		this.neighbours.forEach((vertice) => {
			vertice.weight = weighter(this, vertice.to);
			vertice.weighter = () => weighter(this, vertice.to);
		});
	}

	public attachNeightbours(
		graph: Graph<T, Direction, this>,
		directions = Direction.cardinalDirections,
		weighter?: Weighter<this>
	): void {
		for (const dir of directions) {
			const node = graph.nodes.get(this.coordinate.clone().add(dir).toString());
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
					// this.calculateWeights(weighter);
					forwardVertice.weight = weighter(this, node);
					backVertice.weight = weighter(node, this);
					forwardVertice.weighter = () => weighter(this, node);
					backVertice.weighter = () => weighter(node, this);
				}
			}
		}
	}
}
