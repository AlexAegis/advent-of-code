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
			currentNode.putValue(TileColor.WHITE);
		} else if (currentNode.value === TileColor.WHITE) {
			currentNode.putValue(TileColor.BLACK);
		}
	}

	return [...g.nodes.values()].count((node) => node.value === TileColor.BLACK);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 479 ~2.61ms
}
