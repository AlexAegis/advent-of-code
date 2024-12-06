import { Direction, GridGraphNode, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const isArmCorrect = (
	nodeA: GridGraphNode | undefined,
	nodeB: GridGraphNode | undefined,
): boolean => {
	if (nodeA === undefined || nodeB === undefined) {
		return false;
	}

	return (
		(nodeA.toString() === 'S' && nodeB.toString() === 'M') ||
		(nodeA.toString() === 'M' && nodeB.toString() === 'S')
	);
};

export const p2 = (input: string): number => {
	let g = input.toGridGraph({
		connectionDirections: Direction.allDirections,
	});
	return g.nodeValues
		.filter((node) => node.toString() === 'A')
		.filter((node) => {
			let arm1Correct = isArmCorrect(
				node.getNeighbour(Direction.NORTHEAST),
				node.getNeighbour(Direction.SOUTHWEST),
			);
			let arm2Correct = isArmCorrect(
				node.getNeighbour(Direction.NORTHWEST),
				node.getNeighbour(Direction.SOUTHEAST),
			);

			return arm1Correct && arm2Correct;
		}).length;
};

await task(p2, packageJson.aoc); // 1900 ~79.72ms
