import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { Graph, Node, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import {
	hexagonalAxialDirections,
	HexagonalDirection,
	invertedHexagonalDirections,
	parse,
	TileColor,
} from './parse.function.js';

export const p1g = (input: string): number => {
	const tilesToFlip = parse(input);

	const g = new Graph<TileColor, HexagonalDirection>();
	const center = new Node<TileColor, HexagonalDirection>(Vec2.ORIGIN.toString(), TileColor.WHITE);
	g.nodes.set(center.key, center);

	for (const ttf of tilesToFlip) {
		let currentNode = center;
		const cursor = Vec2.ORIGIN.clone();
		for (const instruction of ttf) {
			cursor.addMut(hexagonalAxialDirections[instruction]);

			const nextVertice = currentNode.neighbours.getOrAdd(instruction, () => ({
				from: currentNode,
				to: g.nodes.getOrAdd(
					cursor.toString(),
					() =>
						new Node<TileColor, HexagonalDirection>(cursor.toString(), TileColor.WHITE)
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
		if (currentNode.value === TileColor.BLACK) {
			currentNode.setValue(TileColor.WHITE);
		} else if (currentNode.value === TileColor.WHITE) {
			currentNode.setValue(TileColor.BLACK);
		}
	}

	return [...g.nodes.values()].count((node) => node.value === TileColor.BLACK);
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1g, resources)}`); // 479 ~2.61ms
}
