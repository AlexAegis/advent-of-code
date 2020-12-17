import { Vec2 } from '@lib/model';
import { Direction } from '../direction.class';
import { ToString } from '../to-string.interface';
import { Vec2Like } from '../vec2.class';
import { Graph } from './graph.class';
import { GridNode } from './grid-node.class';
import { Heuristic } from './heuristic.type';

export class GridGraph<T = string, N extends GridNode<T> = GridNode<T>>
	extends Graph<T, N>
	implements ToString {
	public constructor() {
		super();
	}

	public static fromMatrix<T = string>(
		matrix: T[][],
		options?: {
			h?: Heuristic<GridNode<T>>;
			under?: (v: T) => T[];
			connectionDirections?: Direction[];
		}
	): GridGraph<T> {
		const under = options?.under ?? ((v: T) => [v]);
		const weigther =
			options?.h ??
			((a: GridNode<T>, b: GridNode<T>) => (a.value !== b.value ? Infinity : 0));
		const connectionDirections = options?.connectionDirections ?? Direction.cardinalDirections;

		const graph = new GridGraph<T>();
		for (let y = 0; y < matrix.length; y++) {
			const row = matrix[y];
			for (let x = 0; x < row.length; x++) {
				const node = new GridNode<T>(new Vec2(x, y), ...under(row[x]));
				graph.addNode(node, weigther, connectionDirections);
			}
		}
		return graph;
	}

	public static fromMap<T = string>(
		map: Map<string, T>,
		h?: Heuristic<GridNode<T>>,
		under = (v: T) => [v]
	): GridGraph<T> {
		const graph = new GridGraph<T>();
		for (const [k, v] of map.entries()) {
			const node = new GridNode<T>(new Vec2(k), ...under(v));
			graph.addNode(node, h);
		}
		return graph;
	}

	public getNode(v: Vec2Like | string): N | undefined {
		let s: string;
		if (typeof v === 'object') {
			s = Vec2.toString(v);
		} else {
			s = v;
		}
		return this.nodes.get(s);
	}

	public addNode(
		node: N,
		h?: Heuristic<N>,
		connectionDirections: Direction[] = Direction.cardinalDirections
	): N {
		this.nodes.set(node.p.toString(), node);
		node.attachNeightbours(this, connectionDirections, h);
		return node;
	}

	/**
	 * Every + shaped node group which all return true for the matcher is
	 * considered an intersection
	 *
	 * @param matcher
	 */
	public getIntersections(
		matcher: (node?: N) => boolean,
		intersectionDirections = Direction.cardinalDirections
	): N[] {
		return [...this.nodes.values()].filter(
			(node) =>
				matcher(node) &&
				intersectionDirections
					.map((direction) => node.neighbours.get(direction))
					.every((node) => matcher(node?.to))
		);
	}

	/**
	 * Simple string representation of the grid
	 */
	public toString(highlight?: GridNode<T>[], highlightCharacter = '0'): string {
		const result: string[][] = [];
		[...this.nodes.values()].forEach((node) => {
			const row = (result[node.p.y] = result[node.p.y] ?? []);
			const v = node.value as { toString?: () => string };
			row[node.p.x] = v?.toString ? v.toString() : ' ';
		});
		if (highlight) {
			for (const node of highlight) {
				result[node.p.y][node.p.x] = highlightCharacter;
			}
		}
		return result.map((row) => row.join('')).join('\n');
	}
}
