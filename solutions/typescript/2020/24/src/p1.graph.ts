import { task } from '@alexaegis/advent-of-code-lib';
import { Graph, GraphNode, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import {
	TileColor,
	hexagonalAxialDirections,
	invertedHexagonalDirections,
	parse,
	type HexagonalDirection,
} from './parse.function.js';

export const p1g = (input: string): number => {
	const tilesToFlip = parse(input);

	const g = new Graph<TileColor, HexagonalDirection>();
	const center = new GraphNode<TileColor, HexagonalDirection>(
		Vec2.ORIGIN.toString(),
		TileColor.WHITE,
	);
	g.nodes.set(center.key, center);

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
							TileColor.WHITE,
						),
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
		if (currentNode.value === TileColor.BLACK) {
			currentNode.setValue(TileColor.WHITE);
		} else {
			currentNode.setValue(TileColor.BLACK);
		}
	}

	return [...g.nodes.values()].count((node) => node.value === TileColor.BLACK);
};

await task(p1g, packageJson.aoc); // 479 ~2.61ms
