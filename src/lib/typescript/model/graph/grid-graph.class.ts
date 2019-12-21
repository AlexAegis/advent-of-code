import { Vec2 } from '@lib/model';
import { Graph } from './graph.class';
import { GridNode } from './grid-node.class';
import { Heuristic } from './heuristic.type';

export class GridGraph<T = string, N extends GridNode<T> = GridNode<T>> extends Graph<T, N> {
	public constructor() {
		super();
	}

	public static fromMatrix<T = string>(
		matrix: T[][],
		h?: Heuristic<T, GridNode<T>>,
		under = (v: T) => [v]
	): GridGraph<T> {
		const graph = new GridGraph<T>();
		for (let y = 0; y < matrix.length; y++) {
			const row = matrix[y];
			for (let x = 0; x < row.length; x++) {
				const node = new GridNode<T>(new Vec2(x, y), ...under(row[x]));
				graph.addNode(node, h);
			}
		}
		return graph;
	}

	public static fromMap<T = string>(
		map: Map<string, T>,
		h?: Heuristic<T, GridNode<T>>,
		under = (v: T) => [v]
	): GridGraph<T> {
		const graph = new GridGraph<T>();
		for (const [k, v] of map.entries()) {
			const node = new GridNode<T>(new Vec2(k), ...under(v));
			graph.addNode(node, h);
		}
		return graph;
	}

	public addNode(node: N, h?: Heuristic<T, GridNode<T>>): N {
		this.nodeMap.set(node.p.toString(), node);
		node.attachNeightbours(this, h);
		return node;
	}

	public getIntersections(matcher: (node?: N) => boolean): N[] {
		return [...this.nodeMap.values()].filter(
			node => matcher(node) && node.neighbours.every(n => matcher(n[0] as N))
		);
	}
}
