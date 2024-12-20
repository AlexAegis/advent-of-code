import { Direction } from '../direction/direction.class.js';
import type { ToString } from '../to-string.interface.js';
import { Vec2 } from '../vector/vec2.class.js';
import type { Edge } from './edge.type.js';
import type { GridGraph } from './grid-graph.class.js';
import type { ConnectionFilter, Weighter } from './heuristic.type.js';
import { GraphNode, type BasicGraphNode } from './node.class.js';

Vec2.ORIGIN;

interface WalkResult<T extends ToString = string> {
	nodes: GridGraphNode<T>[];
	walkedToTheEnd: boolean;
}
/**
 *
 */
export class GridGraphNode<T extends ToString = string>
	extends GraphNode<T>
	implements BasicGraphNode<T>
{
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

	public walkDirection(
		direction: Direction,
		whileTrue?: (next: this, distance: number) => boolean,
	): WalkResult<T> {
		const nodes: this[] = [this];
		let neighbour = this.neighbours.get(direction)?.to;
		let walkedToTheEnd = true;
		let distance = 0;
		while (neighbour) {
			nodes.push(neighbour);
			distance++;
			if (whileTrue && !whileTrue(neighbour, distance)) {
				walkedToTheEnd = false;
				break;
			}
			neighbour = neighbour.neighbours.get(direction)?.to;
		}
		return { nodes, walkedToTheEnd };
	}

	public get north(): Edge<T, Direction, this> | undefined {
		return this.neighbours.get(Direction.NORTH);
	}

	public get northEast(): Edge<T, Direction, this> | undefined {
		return this.neighbours.get(Direction.NORTHEAST);
	}

	public get east(): Edge<T, Direction, this> | undefined {
		return this.neighbours.get(Direction.EAST);
	}

	public get southEast(): Edge<T, Direction, this> | undefined {
		return this.neighbours.get(Direction.SOUTHEAST);
	}

	public get south(): Edge<T, Direction, this> | undefined {
		return this.neighbours.get(Direction.SOUTH);
	}

	public get southWest(): Edge<T, Direction, this> | undefined {
		return this.neighbours.get(Direction.SOUTHWEST);
	}

	public get west(): Edge<T, Direction, this> | undefined {
		return this.neighbours.get(Direction.WEST);
	}

	public get northWest(): Edge<T, Direction, this> | undefined {
		return this.neighbours.get(Direction.NORTHWEST);
	}

	public calculateWeights(weighter: Weighter<T, Direction, this>) {
		this.neighbours.forEach((edge, direction) => {
			edge.weight = weighter(this, edge.to, direction);
			// edge.currentPathWeighter = () => weighter(this, edge.to, direction);
		});
	}

	public attachNeightbours(
		graph: GridGraph<T, this>,
		directions = Direction.cardinalDirections,
		weighter?: Weighter<T, Direction, this>,
		connectionFilter?: ConnectionFilter<T, Direction, this>,
	): void {
		for (const dir of directions) {
			const node = graph.nodes.get(this.coordinate.clone().add(dir).toString());
			const reverse = dir.turn(180);
			const connectionEnabled =
				connectionFilter && node ? connectionFilter?.(this, node, dir) : true;
			if (node && connectionEnabled) {
				const forwardEdge = this.neighbours.getOrAdd(dir, () => ({
					from: this,
					to: node,
					direction: dir,
				}));
				const backEdge = node.neighbours.getOrAdd(reverse, () => ({
					from: node,
					to: this,
					direction: reverse,
				}));
				forwardEdge.to = node;
				backEdge.to = this;
				graph.edges.add(forwardEdge);
				graph.edges.add(backEdge);
				if (weighter) {
					this.calculateWeights(weighter);
					forwardEdge.weight = weighter(this, node, dir);
					backEdge.weight = weighter(node, this, reverse);
					// forwardEdge.currentPathWeighter = () => weighter(this, node, dir);
					// backEdge.currentPathWeighter = () => weighter(node, this, reverse);
				}
			}
		}
	}
}
