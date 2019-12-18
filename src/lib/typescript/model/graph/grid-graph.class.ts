import { Direction, Vec2 } from '@lib/model';
import { throws } from 'assert';
import { Graph } from './graph.class';
import { GridNode } from './grid-node.class';
import { Node } from './node.class';

export class GridGraph<T = string> extends Graph<T> {
	public nodeMap = new Map<string, GridNode<T>>();

	public constructor() {
		super();
	}

	public static fromMatrix<T = string>(
		matrix: T[][],
		h?: (a: GridNode<T>, b: GridNode<T>) => number,
		under = (v: T) => [v]
	): GridGraph<T> {
		const graph = new GridGraph<T>();
		for (let y = 0; y < matrix.length; y++) {
			const row = matrix[y];
			for (let x = 0; x < row.length; x++) {
				graph.addNode(new Vec2(x, y), under(row[x]), h);
			}
		}
		return graph;
	}

	public static fromMap<T = string>(
		map: Map<string, T>,
		h?: (a: GridNode<T>, b: GridNode<T>) => number,
		under = (v: T) => [v]
	): GridGraph<T> {
		const graph = new GridGraph<T>();
		for (const [k, v] of map.entries()) {
			graph.addNode(new Vec2(k), under(v), h);
		}
		return graph;
	}

	public addNode(p: Vec2, values: T[], h?: (a: GridNode<T>, b: GridNode<T>) => number) {
		const node = new GridNode<T>(p, ...values);
		this.nodeMap.set(p.toString(), node);
		return node.attachNeightbours(this, h);
	}

	public getIntersections(matcher: (node?: GridNode<T>) => boolean): GridNode<T>[] {
		return [...this.nodeMap.values()].filter(node => matcher(node) && node.neighbours.every(n => matcher(n[0])));
	}
}
