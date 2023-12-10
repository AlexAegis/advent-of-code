import { Direction, descending, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

const pipeConnectorMap: Record<string, Direction[]> = {
	'|': [Direction.NORTH, Direction.SOUTH],
	'-': [Direction.WEST, Direction.EAST],
	L: [Direction.NORTH, Direction.EAST],
	J: [Direction.NORTH, Direction.WEST],
	'7': [Direction.SOUTH, Direction.WEST],
	F: [Direction.SOUTH, Direction.EAST],
	'.': [],
	S: [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST],
};

export const p1 = (input: string): number => {
	const graph = input.toGridGraph({
		weighter: (a, b, dir) => {
			console.log(a.value, b.value, dir.toString());
			const aConnectors = pipeConnectorMap[a.value.toString()];
			const bConnectors = pipeConnectorMap[b.value.toString()];
			const connection =
				(aConnectors?.includes(dir) && bConnectors?.includes(dir.reverse())) ?? false;
			return connection ? 1 : 0;
		},
		connectionFilter: (a, b, dir) => {
			console.log(a.value, b.value, dir.toString());
			const aConnectors = pipeConnectorMap[a.value.toString()];
			const bConnectors = pipeConnectorMap[b.value.toString()];

			return (aConnectors?.includes(dir) && bConnectors?.includes(dir.reverse())) ?? false;
		},
	});
	graph.print();

	const animalStart = graph.findNode((node) => node.value === 'S');
	if (!animalStart) {
		throw new Error('no starting position for the animal!');
	}

	const distanceMap = graph.flood(animalStart);

	return distanceMap
		.entryArray()
		.map(([_node, distance]) => distance)
		.sort(descending)
		.first();
};

await task(p1, packageJson.aoc); // 6733 ~0ms
