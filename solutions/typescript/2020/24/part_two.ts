import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { Graph, Node } from '@lib/model/graph';
import { day, year } from '.';
import {
	hexagonalAxialDirections,
	HexagonalDirection,
	invertedHexagonalDirections,
	parse,
	TileColor,
} from './parse.function';

export const runner = (input: string): number => {
	const tilesToFlip = parse(input);

	const g = new Graph<TileColor, HexagonalDirection>();
	const center = new Node<TileColor, HexagonalDirection>(TileColor.WHITE);
	const centerKey = Vec2.ORIGIN.toString();
	g.nodes.set(centerKey, center);

	const expandNode = (
		g: Graph<TileColor, HexagonalDirection>,
		node: Node<TileColor, HexagonalDirection>,
		key?: string
	) => {
		const vs = key ?? g.nodes.findKey(node);
		if (vs) {
			const atCoord = new Vec2(vs);
			for (const instruction in invertedHexagonalDirections) {
				const cursor = atCoord
					.clone()
					.addMut(hexagonalAxialDirections[instruction as HexagonalDirection]);
				// console.log('argare', cursor.toString());
				const nextVertice = node.neighbours.getOrAdd(
					instruction as HexagonalDirection,
					() => ({
						from: node,
						to: g.nodes.getOrAdd(
							cursor.toString(),
							() => new Node<TileColor, HexagonalDirection>(TileColor.WHITE)
						),
						weight: 1,
					})
				);

				const nextNode = nextVertice.to;

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
		node: Node<TileColor, HexagonalDirection>,
		key?: string
	) => {
		if (node.value === TileColor.BLACK) {
			node.putValue(TileColor.WHITE);
		} else if (node.value === TileColor.WHITE) {
			node.putValue(TileColor.BLACK);
			expandNode(g, node, key);
		}
	};

	for (const ttf of tilesToFlip) {
		let currentNode = center;
		const cursor = Vec2.ORIGIN.clone();
		for (const instruction of ttf) {
			cursor.addMut(hexagonalAxialDirections[instruction]);

			const nextVertice = currentNode.neighbours.getOrAdd(instruction, () => ({
				from: currentNode,
				to: g.nodes.getOrAdd(
					cursor.toString(),
					() => new Node<TileColor, HexagonalDirection>(TileColor.WHITE)
				),
				weight: 1,
			}));
			const nextNode = nextVertice.to;

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

	// let blackCount = [...g.nodes.values()].filter((node) => node.value === TileColor.BLACK).length;
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
			flipTile(g, currentNode, key);
		}

		// blackCount = [...g.nodes.values()].filter((node) => node.value === TileColor.BLACK).length;
	}

	return [...g.nodes.values()].filter((node) => node.value === TileColor.BLACK).length;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 4135 ~391.98ms
}
