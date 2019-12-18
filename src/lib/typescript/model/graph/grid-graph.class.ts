import { Direction, Vec2 } from '@lib/model';
import { Graph } from './graph.class';
import { GridNode } from './grid-node.class';

export class GridGraph<T = string> extends Graph<T> {
	public nodes: GridNode<T>[] = [];
	public nodeMap = new Map<string, GridNode<T>>();

	public constructor() {
		super();
	}

	public static fromMatrix<T = string>(
		matrix: T[][],
		h: (a: GridNode<T>, b: GridNode<T>) => number,
		under = (v: T) => [v]
	): GridGraph<T> {
		const graph = new GridGraph<T>();
		for (let y = 0; y < matrix.length; y++) {
			const row = matrix[y];
			for (let x = 0; x < row.length; x++) {
				const tile = row[x];
				const vec = new Vec2(x, y);

				const node = new GridNode<T>(vec, ...under(tile));

				graph.nodeMap.set(vec.toString(), node);

				Direction.directions
					.map(d => graph.nodeMap.get(vec.add(d).toString()))
					.forEach((n, i) => {
						if (n) {
							node.neighbours[i][0] = n;
							node.neighbours[i][1] = h(node, n);
						}
					});
			}
		}
		return graph;
	}
}
