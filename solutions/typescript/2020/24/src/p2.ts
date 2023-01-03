import { task } from '@alexaegis/advent-of-code-lib';
import { Graph, GraphNode, Vec2, Vec2String } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import {
	hexagonalAxialDirections,
	HexagonalDirection,
	invertedHexagonalDirections,
	parse,
	TileColor,
} from './parse.function.js';

export const p2 = (input: string): number => {
	const tilesToFlip = parse(input);

	const g = new Graph<TileColor, HexagonalDirection>();
	const center = new GraphNode<TileColor, HexagonalDirection>(
		Vec2.ORIGIN.toString(),
		TileColor.WHITE
	);
	g.nodes.set(center.key, center);

	const expandNode = (
		g: Graph<TileColor, HexagonalDirection>,
		node: GraphNode<TileColor, HexagonalDirection>,
		key?: Vec2String
	) => {
		const vs = key ?? g.nodes.findKey(node);
		if (vs) {
			const atCoord = new Vec2(vs as Vec2String);
			for (const instruction in invertedHexagonalDirections) {
				const cursor = atCoord
					.clone()
					.addMut(hexagonalAxialDirections[instruction as HexagonalDirection]);
				// console.log('argare', cursor.toString());
				const nextEdge = node.neighbours.getOrAdd(
					instruction as HexagonalDirection,
					() => ({
						from: node,
						to: g.nodes.getOrAdd(
							cursor.toString(),
							() =>
								new GraphNode<TileColor, HexagonalDirection>(
									cursor.toString(),
									TileColor.WHITE
								)
						),
						weight: 1,
					})
				);

				const nextNode = nextEdge.to;

				const inv = invertedHexagonalDirections[instruction as HexagonalDirection];
				nextNode.neighbours.getOrAdd(inv, () => ({
					from: nextNode,
					to: node,
					weight: 1,
				}));
			}
		}
	};
	/*
	const expandAllBlack = (g: Graph<TileColor, HexaDirs>) => {
		for (const [key, node] of g.nodes.entries()) {
			if (node.value === TileColor.BLACK) {
				expandNode(g, node, key);
			}
		}
	};*/

	const flipTile = (
		g: Graph<TileColor, HexagonalDirection>,
		node: GraphNode<TileColor, HexagonalDirection>,
		key?: Vec2String
	) => {
		if (node.value === TileColor.BLACK) {
			node.setValue(TileColor.WHITE);
		} else if (node.value === TileColor.WHITE) {
			node.setValue(TileColor.BLACK);
			expandNode(g, node, key);
		}
	};

	for (const ttf of tilesToFlip) {
		let currentNode = center;
		const cursor = Vec2.ORIGIN.clone();
		for (const instruction of ttf) {
			cursor.addMut(hexagonalAxialDirections[instruction]);

			const nextEdge = currentNode.neighbours.getOrAdd(instruction, () => ({
				from: currentNode,
				to: g.nodes.getOrAdd(
					cursor.toString(),
					() =>
						new GraphNode<TileColor, HexagonalDirection>(
							cursor.toString(),
							TileColor.WHITE
						)
				),
				weight: 1,
			}));
			const nextNode = nextEdge.to;

			const inv = invertedHexagonalDirections[instruction];
			nextNode.neighbours.getOrAdd(inv, () => ({
				from: nextNode,
				to: currentNode,
				weight: 1,
			}));

			currentNode = nextNode;
		}
		flipTile(g, currentNode, cursor.toString());
	}

	// let blackCount = [...g.nodes.values()].count((node) => node.value === TileColor.BLACK);
	for (let i = 0; i < 100; i++) {
		const toFlip = [...g.nodes.entries()].filter(([, node]) => {
			const blackNeighbours = [...node.neighbours.values()].filter(
				(neighbour) => neighbour.to.value === TileColor.BLACK
			).length;
			if (node.value === TileColor.BLACK) {
				return blackNeighbours === 0 || blackNeighbours > 2;
			} else {
				return blackNeighbours === 2;
			}
		});

		for (const [key, currentNode] of toFlip) {
			flipTile(g, currentNode, key as Vec2String);
		}

		// blackCount = [...g.nodes.values()].count((node) => node.value === TileColor.BLACK);
	}

	return [...g.nodes.values()].count((node) => node.value === TileColor.BLACK);
};

await task(p2, packageJson.aoc); // 4135 ~391.98ms
