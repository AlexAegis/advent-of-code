import { BoundingBox, boundingBoxOf, hasToString } from '@lib/functions';
import { Vec2 } from '@lib/model';
import { stringToVectorMap } from '@lib/string';
import { Direction } from '../direction/direction.class';
import { ToString } from '../to-string.interface';
import { Vec2Like, Vec2String } from '../vector/vec2.class';
import { Graph } from './graph.class';
import { GridNode } from './grid-node.class';
import { Weighter } from './heuristic.type';

export interface GridGraphOptions<T> {
	weighter?: Weighter<GridNode<T>>;
	connectionDirections?: readonly Readonly<Direction>[];
}

export class GridGraph<T = string, N extends GridNode<T> = GridNode<T>>
	extends Graph<T, Direction, N>
	implements ToString
{
	public nodes: Map<Vec2String, N> = new Map<Vec2String, N>();

	public constructor() {
		super();
	}

	private static fillDefaultGridGraphOptions<T>(
		gridGraphOptions?: GridGraphOptions<T>
	): Required<GridGraphOptions<T>> {
		return {
			connectionDirections: Direction.cardinalDirections,
			weighter: (a: GridNode<T>, b: GridNode<T>) => (a.value !== b.value ? Infinity : 0),
			...gridGraphOptions,
		};
	}

	/**
	 * @returns a GridGraph from a rectangle like string where every single character is a node
	 */
	public static fromString<T = string>(
		str: string,
		gridOptions?: GridGraphOptions<T> & { valueConverter?: (value: string) => T }
	): GridGraph<T> {
		const normalizedGridOptions = GridGraph.fillDefaultGridGraphOptions(gridOptions);
		const map = stringToVectorMap(str, gridOptions?.valueConverter);
		return GridGraph.fromMap(map, normalizedGridOptions);
	}

	/**
	 * @returns a GridGraph from a matrix
	 */
	public static fromMatrix<T = string>(
		matrix: T[][],
		options?: GridGraphOptions<T>
	): GridGraph<T> {
		const { connectionDirections, weighter } = GridGraph.fillDefaultGridGraphOptions(options);

		const graph = new GridGraph<T>();
		for (let y = 0; y < matrix.length; y++) {
			const row = matrix[y];
			for (let x = 0; x < row.length; x++) {
				const node = new GridNode<T>(new Vec2(x, y), row[x]);
				graph.addNode(node, weighter, connectionDirections);
			}
		}
		return graph;
	}

	/**
	 * @returns a GridGraph from a Map where the keys are serialized Vec2s
	 */
	public static fromMap<T = string>(
		map: Map<Vec2String, T>,
		options?: GridGraphOptions<T>
	): GridGraph<T> {
		const graph = new GridGraph<T>();
		for (const [k, v] of map.entries()) {
			const node = new GridNode<T>(new Vec2(k), v);
			graph.addNode(node, options?.weighter, options?.connectionDirections);
		}
		return graph;
	}

	/**
	 *
	 * @returns two Vec2s that are not necessarily point to a node but all the nodes are between
	 */
	public boundingBox(): BoundingBox {
		return boundingBoxOf(this.allCoordinates());
	}

	public allCoordinates(): Vec2[] {
		return [...this.nodes.keys()].map((key) => new Vec2(key));
	}

	public changeOf(key: Vec2Like | string, change: (t: T) => T): void {
		this.getNode(key)?.updateValue(change);
	}

	public getNode(key: Vec2Like | Vec2String | string): N | undefined {
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
		connectionDirections: readonly Readonly<Direction>[] = Direction.cardinalDirections
	): N {
		this.nodes.set(node.coordinate.toString(), node);
		node.attachNeightbours(this, connectionDirections, weighter);
		return node;
	}

	/**
	 * Simple string representation of the grid
	 * @param nodeToString: if returns a string that will be used as a symbol for printing
	 */
	public toString(nodeToString?: (node: GridNode<T>) => string | undefined): string {
		const result: string[][] = [];
		this.nodeValues.forEach((node) => {
			const row = (result[node.coordinate.y] = result[node.coordinate.y] ?? []);
			let nodeRepresentation: string;
			let optionalToStringRep: string | undefined;
			if (nodeToString) {
				optionalToStringRep = nodeToString(node);
			}
			if (optionalToStringRep) {
				nodeRepresentation = optionalToStringRep;
			} else if (hasToString(node.value)) {
				nodeRepresentation = node.value.toString();
			} else {
				nodeRepresentation = ' ';
			}
			row[node.coordinate.x] = nodeRepresentation;
		});

		return result.map((row) => row.join('')).join('\n');
	}

	public print(nodeToString?: (node: GridNode<T>) => string): void {
		console.log(this.toString(nodeToString));
	}
}
