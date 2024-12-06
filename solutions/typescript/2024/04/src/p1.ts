import { Direction, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const searchWord = 'XMAS';

export const p1 = (input: string): number =>
	input
		.toGridGraph({
			connectionDirections: Direction.allDirections,
		})
		.nodeValues.filter((node) => node.toString() === searchWord[0])
		.map((node) => {
			return Direction.allDirections.filter((direction) => {
				let walkResult = node.walkDirection(
					direction,
					(_next, distance) => distance < searchWord.length - 1,
				);
				const word = walkResult.nodes.map((n) => n.toString()).join('');
				return word === searchWord;
			}).length;
		})
		.sum();

await task(p1, packageJson.aoc); // 2427 ~91.00ms
