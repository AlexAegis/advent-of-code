import { Direction } from '../direction.class';
import { ToString } from '../to-string.interface';
import { Vec2 } from '../vec2.class';
import { GridGraph } from './grid-graph.class';
import { GridNode } from './grid-node.class';
import { Weighter } from './heuristic.type';
import { PortalGridNode } from './portal-grid-node.class';

export class PortalGridGraph<
	T extends ToString,
	N extends GridNode<T> = PortalGridNode<T>
> extends GridGraph<T, N> {
	public constructor() {
		super();
	}

	public static fromTorus<T = string, N extends GridNode<T> = PortalGridNode<T>>(
		matrix: T[][],
		options: {
			weighter?: Weighter<PortalGridNode<T>>;
			under?: (v: T) => T[];
			filter?: (n: Vec2) => boolean;
			portalOf: (n: Vec2) => string | undefined;
			connectionDirections?: Direction[];
		}
	): PortalGridGraph<T, N> {
		const under = options?.under ?? ((v: T) => [v]);
		const weigther: Weighter<PortalGridNode<T>> =
			options.weighter ??
			((a: PortalGridNode<T>, b: PortalGridNode<T>) => (a.value !== b.value ? Infinity : 0));
		const connectionDirections = options?.connectionDirections ?? Direction.cardinalDirections;

		const graph = new PortalGridGraph<T, N>();
		for (let y = 0; y < matrix.length; y++) {
			const row = matrix[y];
			for (let x = 0; x < row.length; x++) {
				const v = row[x];
				const p = new Vec2(x, y);
				if (!options.filter || options.filter(p)) {
					const node = new PortalGridNode<T>(p, options.portalOf(p), ...under(v));
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					node.attachNeightbours(graph as any, connectionDirections, weigther);
				}
			}
		}
		return graph;
	}
}
