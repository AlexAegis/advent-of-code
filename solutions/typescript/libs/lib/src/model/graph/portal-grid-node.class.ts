import { Direction } from '../direction/direction.class.js';
import type { ToString } from '../to-string.interface.js';
import type { Vec2 } from '../vector/vec2.class.js';
import type { PortalGridGraph } from './grid-graph.class.js';

import type { Edge } from './edge.type.js';
import { GridGraphNode } from './grid-node.class.js';
import type { Weighter } from './heuristic.type.js';

export class PortalGridNode<T extends ToString = string> extends GridGraphNode<T> {
	public constructor(
		public override coordinate: Vec2,
		public portalLabel: string | undefined,
		value: T,
	) {
		super(coordinate, value);
		if (portalLabel) {
			// this.neighbours.set(portalLabel, { from: this, to: undefined, data: Infinity }); // portal
		}
	}

	public portal(): Edge<this> | undefined {
		return this.portalLabel
			? this.neighbours.get(this.portalLabel as unknown as Direction)
			: undefined;
	}

	public override attachNeightbours(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		graph: PortalGridGraph<T, any>,
		directions = Direction.cardinalDirections,
		weighter?: Weighter<this>,
	): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		super.attachNeightbours(graph, directions, weighter);
		if (this.portalLabel && !this.portal()) {
			const node = [...graph.nodes.entries()].find(
				([_, v]) => (v as this).portalLabel === this.portalLabel,
			)?.[1] as this | undefined;
			const portal = this.portal();
			if (node && portal) {
				const forwardEdge = this.neighbours.getOrAdd(
					this.portalLabel as unknown as Direction,
					() => ({
						from: this,
						to: node,
					}),
				);
				const backEdge = node.neighbours.getOrAdd(
					this.portalLabel as unknown as Direction,
					() => ({
						from: node,
						to: this,
					}),
				);

				forwardEdge.to = node;
				backEdge.to = this;
				graph.edges.add(forwardEdge);
				//graph.edges.add(backEdge);
				if (weighter) {
					forwardEdge.weight = weighter(this, node);
					backEdge.weight = weighter(node, this);
					forwardEdge.weighter = () => weighter(this, node);
					backEdge.weighter = () => weighter(node, this);
				}
			}
		}
	}
}
