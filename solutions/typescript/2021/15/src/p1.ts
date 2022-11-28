import { bench, read } from '@alexaegis/advent-of-code-lib';
import { Direction } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number => {
	const graph = input.toGridGraph<number>({
		valueConverter: (s) => parseInt(s, 10),
		weighter: (a, b) => b.value - a.value,
		connectionDirections: Direction.cardinalDirections,
	});

	const { topLeft, bottomRight } = graph.boundingBox();
	const start = graph.getNode(topLeft);
	const end = graph.getNode(bottomRight);

	const path = graph.aStar(start, end, {
		heuristic: (_currentNode, tentativePath) => tentativePath.map((n) => n.value).sum(),
	});

	return path.map((p) => p.value).sum() - (start?.value ?? 0);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 609 ~153.42ms
}
