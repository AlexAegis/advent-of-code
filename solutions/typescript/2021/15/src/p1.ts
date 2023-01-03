import { task } from '@alexaegis/advent-of-code-lib';
import { Direction } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
	const graph = input.toGridGraph<number>({
		valueConverter: (s) => parseInt(s, 10),
		weighter: (a, b) => b.value - a.value,
		connectionDirections: Direction.cardinalDirections,
	});

	const boundingBox = graph.boundingBox();
	const start = graph.getNode(boundingBox.topLeft);
	const end = graph.getNode(boundingBox.bottomRight);

	const path = graph.aStar(start, end, {
		heuristic: (_currentNode, tentativePath) => tentativePath.map((n) => n.value).sum(),
	});

	return path.map((p) => p.value).sum() - (start?.value ?? 0);
};

await task(p1, packageJson.aoc); // 609 ~153.42ms
