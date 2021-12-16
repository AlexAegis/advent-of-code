import { bench, read } from '@lib';
import { Direction } from '@lib/model';
import { day, year } from '.';

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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 609 ~153.42ms
}
