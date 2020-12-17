import { Vec2 } from '@lib/model';
import { Direction } from '../direction.class';
import { GridNode } from './grid-node.class';
import { Heuristic } from './heuristic.type';
import { PortalGridGraph } from './portal-grid-graph.class';
import { Vertice } from './vertice.type';

export class PortalGridNode<T = string> extends GridNode<T> {
	public constructor(public p: Vec2, public portalLabel: string | undefined, ...values: T[]) {
		super(p, ...values);
		if (portalLabel) {
			// this.neighbours.set(portalLabel, { from: this, to: undefined, data: Infinity }); // portal
		}
	}

	public portal(): Vertice<this> | undefined {
		return this.portalLabel
			? this.neighbours.get((this.portalLabel as unknown) as Direction)
			: undefined;
	}

	public attachNeightbours(
		graph: PortalGridGraph<T, this>,
		directions: Direction[] = Direction.cardinalDirections,
		h?: Heuristic<this>
	): void {
		super.attachNeightbours(graph, directions, h);
		if (this.portalLabel && !this.portal) {
			const node = [...graph.nodes.entries()].find(
				([_, v]) => v.portalLabel === this.portalLabel
			)?.[1];
			const portal = this.portal();
			if (node && portal) {
				const forwardVertice = this.neighbours.getOrAdd(
					(this.portalLabel as unknown) as Direction,
					() => ({
						from: this,
						to: node,
					})
				);
				const backVertice = node.neighbours.getOrAdd(
					(this.portalLabel as unknown) as Direction,
					() => ({
						from: node,
						to: this,
					})
				);

				forwardVertice.to = node;
				backVertice.to = this;
				graph.vertices.add(forwardVertice);
				//graph.vertices.add(backVertice);
				if (h) {
					forwardVertice.data = h(this, node);
					backVertice.data = h(node, this);
					forwardVertice.h = () => h(this, node);
					backVertice.h = () => h(node, this);
				}
			}
		}
	}
}
