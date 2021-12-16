import { BoundingBox, boundingBoxOf } from '@lib/functions';
import { Vec2 } from '@lib/model';
import { stringToVectorMap } from '@lib/string';
import { Direction } from '../direction.class';
import { ToString } from '../to-string.interface';
import { Vec2Like } from '../vec2.class';
import { Graph } from './graph.class';
import { GridNode } from './grid-node.class';
import { Weighter } from './heuristic.type';

export interface GridGraphOptions<T> {
	weighter?: Weighter<GridNode<T>>;
	under?: (v: T) => T[];
	connectionDirections?: Direction[];
}

export class GridGraph<T = string, N extends GridNode<T> = GridNode<T>>
	extends Graph<T, Direction, N>
	implements ToString
{
	public constructor() {
		super();
	}

	private static fillDefaultGridGraphOptions<T>(
		gridGraphOptions?: GridGraphOptions<T>
	): Required<GridGraphOptions<T>> {
		return {
			connectionDirections: Direction.cardinalDirections,
			under: (v) => [v],
			weighter: (a: GridNode<T>, b: GridNode<T>) => (a.value !== b.value ? Infinity : 0),
			...gridGraphOptions,
		};
	}

	public static fromString<T = string>(
		str: string,
		gridOptions?: GridGraphOptions<T> & { valueConverter?: (value: string) => T }
	): GridGraph<T> {
		const normalizedGridOptions = GridGraph.fillDefaultGridGraphOptions(gridOptions);
		const map = stringToVectorMap(str, gridOptions?.valueConverter);
		return GridGraph.fromMap(map, normalizedGridOptions);
	}

	public static fromMatrix<T = string>(
		matrix: T[][],
		options?: GridGraphOptions<T>
	): GridGraph<T> {
		const { connectionDirections, under, weighter } =
			GridGraph.fillDefaultGridGraphOptions(options);

		const graph = new GridGraph<T>();
		for (let y = 0; y < matrix.length; y++) {
			const row = matrix[y];
			for (let x = 0; x < row.length; x++) {
				const node = new GridNode<T>(new Vec2(x, y), ...under(row[x]));
				graph.addNode(node, weighter, connectionDirections);
			}
		}
		return graph;
	}

	public static fromMap<T = string>(
		map: Map<string, T>,
		options?: GridGraphOptions<T>
	): GridGraph<T> {
		const graph = new GridGraph<T>();
		for (const [k, v] of map.entries()) {
			const node = new GridNode<T>(new Vec2(k), ...(options?.under?.(v) ?? [v]));
			graph.addNode(node, options?.weighter, options?.connectionDirections);
		}
		return graph;
	}

	public boundingBox(): BoundingBox {
		return boundingBoxOf(this.allCoordinates());
	}

	public allCoordinates(): Vec2[] {
		return [...this.nodes.keys()].map((key) => new Vec2(key));
	}

	public changeOf(key: Vec2Like | string, change: (t: T) => T): void {
		this.getNode(key)?.updateValue(change);
	}

	public valueOf(key: Vec2Like | string): T | undefined {
		return this.getNode(key)?.value;
	}

	public getNode(key: Vec2Like | string): N | undefined {
		let keyStr: string;
		if (typeof key === 'object') {
			keyStr = Vec2.toString(key);
		} else {
			keyStr = key;
		}
		return super.getNode(keyStr);
	}

	public addNode(
		node: N,
		weighter?: Weighter<N>,
		connectionDirections: Direction[] = Direction.cardinalDirections
	): N {
		this.nodes.set(node.coordinate.toString(), node);
		node.attachNeightbours(this, connectionDirections, weighter);
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
			const row = (result[node.coordinate.y] = result[node.coordinate.y] ?? []);
			const v = node.value as { toString?: () => string };
			row[node.coordinate.x] = v?.toString ? v.toString() : ' ';
		});
		if (highlight) {
			for (const node of highlight) {
				result[node.coordinate.y][node.coordinate.x] = highlightCharacter;
			}
		}
		return result.map((row) => row.join('')).join('\n');
	}

	public print(highlight?: GridNode<T>[], highlightCharacter = '0'): void {
		console.log(this.toString(highlight, highlightCharacter));
	}
}
