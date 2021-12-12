import { bench, read } from '@lib';
import { Direction } from '@lib/model';
import { GridGraph } from '@lib/model/graph';
import { day, year } from '.';

const flash = (graph: GridGraph<number>, flashed = new Set<string>()): Set<string> => {
	const flashes = [...graph.nodes]
		.filter(([key, node]) => node.value > 9 && !flashed.has(key))
		.tap(([key, node]) => {
			flashed.add(key);
			[...node.neighbours.values()].forEach((neightbour) =>
				neightbour.to.updateValue((v) => v + 1)
			);
		}).length;
	if (flashes) {
		flash(graph, flashed);
	}
	return flashed;
};

export const next = (graph: GridGraph<number>): number => {
	graph.forEach((node) => node.updateValue((v) => v + 1)); // Increment everything by 1
	const flashed = flash(graph); // Flash 9s
	flashed.forEach((key) => graph.getNode(key)?.setValue(0)); // All flashed set to 0
	return flashed.size;
};

export const runner = (input: string, totalSteps = 100): number => {
	const graph = input.toGridGraph({
		valueConverter: (s) => s.tryInt(),
		connectionDirections: Direction.allDirections,
	});
	return totalSteps
		.iterate()
		.map(() => next(graph))
		.sum();
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1669 ~4.74ms
}
