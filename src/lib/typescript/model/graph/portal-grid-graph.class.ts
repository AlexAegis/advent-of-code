import { Vec2 } from '../vec2.class';
import { GridGraph } from './grid-graph.class';
import { Heuristic } from './heuristic.type';
import { PortalGridNode } from './portal-grid-node.class';

export class PortalGridGraph<
	T = string,
	N extends PortalGridNode<T> = PortalGridNode<T>
> extends GridGraph<T, N> {
	public constructor() {
		super();
	}

	public static fromTorus<T = string, N extends PortalGridNode<T> = PortalGridNode<T>>(
		matrix: T[][],
		portalOf: (n: Vec2) => string | undefined,
		filter?: (n: Vec2) => boolean,
		h?: Heuristic<T, PortalGridNode<T>>,
		under = (v: T) => [v]
	): PortalGridGraph<T, N> {
		const graph = new PortalGridGraph<T, N>();
		for (let y = 0; y < matrix.length; y++) {
			const row = matrix[y];
			for (let x = 0; x < row.length; x++) {
				const v = row[x];
				const p = new Vec2(x, y);
				if (!filter || filter(p)) {
					const node = new PortalGridNode<T>(p, portalOf(p), ...under(v));
					node.attachNeightbours(graph, h);
				}
			}
		}
		return graph;
	}
}
