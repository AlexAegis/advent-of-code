import { Direction, Vec2 } from '@lib/model';
import { GridNode } from './grid-node.class';
import { Heuristic } from './heuristic.type';
import { PortalGridGraph } from './portal-grid-graph.class';
import { Vertice } from './vertice.type';

export class PortalGridNode<T = string> extends GridNode<T> {
	public constructor(public p: Vec2, public portalLabel: string | undefined, ...values: T[]) {
		super(p, ...values);
		this.neighbours.push([undefined, Infinity]); // portal
	}

	public get portal(): Vertice<this> {
		return this.neighbours[4];
	}

	public attachNeightbours(graph: PortalGridGraph<T, this>, h?: Heuristic<T, this>): Vertice<this>[] {
		super.attachNeightbours(graph, h);
		if (this.portalLabel && !this.portal) {
			const o = [...graph.nodeMap.entries()].find(([_, v]) => v.portalLabel === this.portalLabel)?.[1];
			if (o) {
				this.neighbours[4][0] = o;
				o.neighbours[4][0] = this;
				if (h) {
					this.neighbours[4][1] = h(this, o);
					o.neighbours[4][1] = h(o, this);
				}
			}
		}
		return this.neighbours;
	}
}
