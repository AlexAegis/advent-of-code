import { isNotNullish } from '@alexaegis/common';
import { slideWindow } from '../../array/groups/slide-window.function.js';
import { mapFirst } from '../../array/map-first.function.js';
import { hasToString } from '../../functions/assertions/has-to-string.assert.js';
import { mapLast, renderMatrix } from '../../index.js';

import { stringToVectorMap } from '../../string/string-to-vectormap.function.js';
import { DirectionArrowUnicodeSymbol } from '../direction/direction-arrow-unicode.symbol.enum.js';
import { Direction } from '../direction/direction.class.js';
import type { ToString } from '../to-string.interface.js';
import { BoundingBox } from '../vector/bounding-box.class.js';
import { Vec2 } from '../vector/vec2.class.js';
import type { Vec2Like, Vec2String } from '../vector/vec2.class.types.js';
import { Graph } from './graph.class.js';
import { GridGraphNode } from './grid-node.class.js';
import type { Weighter } from './heuristic.type.js';
import { PortalGridNode } from './portal-grid-node.class.js';

export interface GridGraphOptions<T extends ToString> {
	weighter?: Weighter<GridGraphNode<T>>;
	connectionDirections?: readonly Readonly<Direction>[];
	ignoreNodes?: (s: string) => boolean;
}

export class GridGraph<T extends ToString = string, N extends GridGraphNode<T> = GridGraphNode<T>>
	extends Graph<T, Direction, N>
	implements ToString
{
	public override nodes: Map<Vec2String, N> = new Map<Vec2String, N>();

	public constructor() {
		super();
	}

	private static fillDefaultGridGraphOptions<T extends ToString>(
		gridGraphOptions?: GridGraphOptions<T>,
	): Required<GridGraphOptions<T>> {
		return {
			connectionDirections: Direction.cardinalDirections,
			ignoreNodes: (s) => s === ' ',
			weighter: (a: GridGraphNode<T>, b: GridGraphNode<T>) =>
				a.value === b.value ? 0 : Number.POSITIVE_INFINITY,
			...gridGraphOptions,
		};
	}

	/**
	 * @returns a GridGraph from a rectangle like string where every single character is a node
	 */
	public static fromString<T extends ToString = string>(
		str: string,
		gridOptions?: GridGraphOptions<T> & {
			valueConverter?: (value: string) => T;
		},
	): GridGraph<T> {
		const normalizedGridOptions = GridGraph.fillDefaultGridGraphOptions(gridOptions);
		const map = stringToVectorMap(str, { valueConverter: gridOptions?.valueConverter });

		return GridGraph.fromMap(map, normalizedGridOptions);
	}

	/**
	 * @returns a GridGraph from a matrix
	 */
	public static fromMatrix<T extends ToString = string>(
		matrix: T[][],
		options?: GridGraphOptions<T>,
	): GridGraph<T> {
		const { connectionDirections, weighter } = GridGraph.fillDefaultGridGraphOptions(options);

		const graph = new GridGraph<T>();
		for (let y = 0; y < matrix.length; y++) {
			const row = matrix[y];
			if (isNotNullish(row)) {
				for (let x = 0; x < row.length; x++) {
					const value = row[x];
					if (isNotNullish(value)) {
						const node = new GridGraphNode<T>(new Vec2(x, y), value);
						graph.addNode(node, weighter, connectionDirections);
					}
				}
			}
		}
		return graph;
	}

	/**
	 * @returns a GridGraph from a Map where the keys are serialized Vec2s
	 */
	public static fromMap<T extends ToString = string>(
		map: Map<Vec2String, T>,
		options?: GridGraphOptions<T>,
	): GridGraph<T> {
		const graph = new GridGraph<T>();
		for (const [k, v] of map.entries()) {
			const node = new GridGraphNode<T>(new Vec2(k), v);
			graph.addNode(node, options?.weighter, options?.connectionDirections);
		}
		return graph;
	}

	/**
	 *
	 * @returns two Vec2s that are not necessarily point to a node but all the nodes are between
	 */
	public boundingBox(): BoundingBox {
		return BoundingBox.fromVectors(this.allCoordinates());
	}

	public allCoordinates(): Vec2[] {
		return [...this.nodes.keys()].map((key) => new Vec2(key));
	}

	public changeOf(key: Vec2Like | string, change: (t: T) => T): void {
		this.getNode(key)?.updateValue(change);
	}

	public override getNode(key: Vec2Like | string): N | undefined {
		const keyStr = typeof key === 'object' ? Vec2.toString(key) : key;
		return super.getNode(keyStr);
	}

	public findNode(predicate: (node: GridGraphNode<T>) => boolean): GridGraphNode<T> | undefined {
		for (const node of this.nodes.values()) {
			if (predicate(node)) {
				return node;
			}
		}
		return undefined;
	}

	public addNode(
		node: N,
		weighter?: Weighter<N>,
		connectionDirections: readonly Readonly<Direction>[] = Direction.cardinalDirections,
	): N {
		this.nodes.set(node.coordinate.toString(), node);
		node.attachNeightbours(this, connectionDirections, weighter);
		return node;
	}

	/**
	 * Adds edges between edge vertices so that in each column each northmost
	 * node will have an edge pointing to the southmost and vice-versa
	 */
	public connectEdgeNodesWrappingAround(
		weighter: (a: GridGraphNode<T>, b: GridGraphNode<T>) => number = (a, b) =>
			a.value === b.value ? 0 : Number.POSITIVE_INFINITY,
	): void {
		const box = this.boundingBox();
		const verticalIndices = box.vertical.collectValues();
		const horizontalIndices = box.horizontal.collectValues();

		for (const x of horizontalIndices) {
			const first = mapFirst(verticalIndices, (y) => this.getNode({ x, y }));
			const last = mapLast(verticalIndices, (y) => this.getNode({ x, y }));

			if (first !== undefined && last !== undefined) {
				first.neighbours.set(Direction.NORTH, {
					from: first,
					to: last,
					weight: weighter(first, last),
				});
				last.neighbours.set(Direction.SOUTH, {
					from: last,
					to: first,
					weight: weighter(last, first),
				});
			}
		}

		for (const y of verticalIndices) {
			const first = mapFirst(horizontalIndices, (x) => this.getNode({ x, y }));
			const last = mapLast(horizontalIndices, (x) => this.getNode({ x, y }));

			if (first !== undefined && last !== undefined) {
				first.neighbours.set(Direction.WEST, {
					from: first,
					to: last,
					weight: weighter(first, last),
				});
				last.neighbours.set(Direction.EAST, {
					from: last,
					to: first,
					weight: weighter(last, first),
				});
			}
		}
	}

	/**
	 * Simple string representation of the grid
	 * @param nodeToString: if returns a string that will be used as a symbol for printing
	 */
	public override toString(
		nodeToString?: (node: GridGraphNode<T>) => string | undefined,
	): string {
		const box = this.boundingBox();
		const result = box.createBlankMatrix(() => ' ');
		for (const cell of box.walkCells()) {
			const node = this.getNode(cell);
			let nodeRepresentation = ' ';
			if (node) {
				let optionalToStringRep: string | undefined;
				if (nodeToString) {
					optionalToStringRep = nodeToString(node);
				}
				if (optionalToStringRep) {
					nodeRepresentation = optionalToStringRep;
				} else if (hasToString(node.value)) {
					nodeRepresentation = node.value.toString();
				}
			}
			const row = result[cell.y];
			if (isNotNullish(row)) {
				row[cell.x] = nodeRepresentation;
			}
		}

		return renderMatrix(result);
	}

	public printPath(
		path: GridGraphNode<T>[],
		nodeToString?: (node: GridGraphNode<T>) => string,
	): void {
		const pathSymbols = slideWindow(path, 2).reduce((accumulator, [prev, next]) => {
			let sym = '#';
			switch (next.key) {
				case prev.north?.to.key: {
					sym = DirectionArrowUnicodeSymbol.NORTH;

					break;
				}
				case prev.east?.to.key: {
					sym = DirectionArrowUnicodeSymbol.EAST;

					break;
				}
				case prev.south?.to.key: {
					sym = DirectionArrowUnicodeSymbol.SOUTH;

					break;
				}
				case prev.west?.to.key: {
					sym = DirectionArrowUnicodeSymbol.WEST;

					break;
				}
				// No default
			}
			accumulator.set(prev.key, sym);
			return accumulator;
		}, new Map<string, string>());

		const last = path.at(-1);
		if (isNotNullish(last)) {
			pathSymbols.set(last.coordinate.toString(), 'X');
		}

		this.print(
			(node) =>
				(pathSymbols.get(node.key) ?? nodeToString?.(node) ?? node.value.toString()) || '░',
		);
	}

	public print(nodeToString?: (node: GridGraphNode<T>) => string): void {
		console.log(this.toString(nodeToString));
	}
}

/**
 * ? Has to be here because of circular imports.
 * TODO: Refactor it into a common graph solution that is not inheritance based.
 */
export class PortalGridGraph<
	T extends ToString,
	N extends GridGraphNode<T> = PortalGridNode<T>,
> extends GridGraph<T, N> {
	public constructor() {
		super();
	}

	public static fromTorus<
		T extends ToString = string,
		N extends GridGraphNode<T> = PortalGridNode<T>,
	>(
		matrix: T[][],
		options: {
			weighter?: Weighter<PortalGridNode<T>>;
			filter?: (n: Vec2) => boolean;
			portalOf: (n: Vec2) => string | undefined;
			connectionDirections?: Direction[];
		},
	): PortalGridGraph<T, N> {
		const weigther: Weighter<PortalGridNode<T>> =
			options.weighter ??
			((a: PortalGridNode<T>, b: PortalGridNode<T>) =>
				a.value === b.value ? 0 : Number.POSITIVE_INFINITY);
		const connectionDirections = options.connectionDirections ?? Direction.cardinalDirections;

		const graph = new PortalGridGraph<T, N>();
		for (let y = 0; y < matrix.length; y++) {
			const row = matrix[y];
			if (isNotNullish(row)) {
				for (let x = 0; x < row.length; x++) {
					const v = row[x];
					if (isNotNullish(v)) {
						const p = new Vec2(x, y);
						if (!options.filter || options.filter(p)) {
							const node = new PortalGridNode<T>(p, options.portalOf(p), v);
							node.attachNeightbours(graph, connectionDirections, weigther);
						}
					}
				}
			}
		}
		return graph;
	}
}
