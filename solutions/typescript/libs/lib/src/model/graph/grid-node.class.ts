import '../../map/map.polyfill.js';
import { Direction } from '../direction/direction.class.js';
import type { ToString } from '../to-string.interface.js';
import { Vec2 } from '../vector/vec2.class.js';
import type { Edge } from './edge.type.js';
import type { Graph } from './graph.class.js';
import type { Weighter } from './heuristic.type.js';
import { GraphNode } from './node.class.js';

Vec2.ORIGIN;

interface WalkResult<T extends ToString = string> {
	nodes: GridGraphNode<T>[];
	walkedToTheEnd: boolean;
}
/**
 *
 */
export class GridGraphNode<T extends ToString = string> extends GraphNode<T> {
	public constructor(
		public coordinate: Vec2,
		value: T,
	) {
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
		nodes: GridGraphNode<T>[];
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

	public get north(): Edge<this> | undefined {
		return this.neighbours.get(Direction.NORTH);
	}

	public get northEast(): Edge<this> | undefined {
		return this.neighbours.get(Direction.NORTHEAST);
	}

	public get east(): Edge<this> | undefined {
		return this.neighbours.get(Direction.EAST);
	}

	public get southEast(): Edge<this> | undefined {
		return this.neighbours.get(Direction.SOUTHEAST);
	}

	public get south(): Edge<this> | undefined {
		return this.neighbours.get(Direction.SOUTH);
	}

	public get southWest(): Edge<this> | undefined {
		return this.neighbours.get(Direction.SOUTHWEST);
	}

	public get west(): Edge<this> | undefined {
		return this.neighbours.get(Direction.WEST);
	}

	public get northWest(): Edge<this> | undefined {
		return this.neighbours.get(Direction.NORTHWEST);
	}

	public calculateWeights(weighter: Weighter<this>) {
		this.neighbours.forEach((edge) => {
			edge.weight = weighter(this, edge.to);
			edge.weighter = () => weighter(this, edge.to);
		});
	}

	public attachNeightbours(
		graph: Graph<T, Direction, this>,
		directions = Direction.cardinalDirections,
		weighter?: Weighter<this>,
	): void {
		for (const dir of directions) {
			const node = graph.nodes.get(this.coordinate.clone().add(dir).toString());
			const reverse = dir.turn(180);
			if (node) {
				const forwardEdge = this.neighbours.getOrAdd(dir, () => ({
					from: this,
					to: node,
				}));
				const backEdge = node.neighbours.getOrAdd(reverse, () => ({
					from: node,
					to: this,
				}));
				forwardEdge.to = node;
				backEdge.to = this;
				graph.edges.add(forwardEdge);
				graph.edges.add(backEdge);
				if (weighter) {
					this.calculateWeights(weighter);
					forwardEdge.weight = weighter(this, node);
					backEdge.weight = weighter(node, this);
					forwardEdge.weighter = () => weighter(this, node);
					backEdge.weighter = () => weighter(node, this);
				}
			}
		}
	}
}
