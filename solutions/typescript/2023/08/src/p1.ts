/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Direction, Graph, GraphNode, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	const [rawInstructions, ...lines] = input.lines(false);

	const instructions = [...(rawInstructions ?? '')];
	const graph = new Graph<number>();
	for (const line of lines) {
		const [key, gates] = line.splitIntoStringPair(' = ');
		const [leftGate, rightGate] = gates
			.replaceAll('(', '')
			.replaceAll(')', '')
			.splitIntoStringPair(', ');
		const graphNode = graph.nodes.getOrAdd(key, (key) => new GraphNode(key, 0));
		const leftNode = graph.nodes.getOrAdd(leftGate, (key) => new GraphNode(key, 0));
		const rightNode = graph.nodes.getOrAdd(rightGate, (key) => new GraphNode(key, 0));
		graphNode.neighbours.set(Direction.WEST, { from: graphNode, to: leftNode });
		graphNode.neighbours.set(Direction.EAST, { from: graphNode, to: rightNode });
		graph.nodes.set(key, graphNode);
	}

	graph.nodes.forEach((n) => {
		console.log(
			n.key,
			n.neighbourNodes.map((nn) => nn.key),
		);
	});

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	let currentNode = graph.nodes.get('AAA')!;

	let steps = 0;

	while (currentNode.key !== 'ZZZ') {
		const instruction = instructions[steps % instructions.length];

		currentNode = currentNode.neighbours.get(
			instruction === 'L' ? Direction.WEST : Direction.EAST,
		)!.to;

		steps++;
	}
	return steps;
};

await task(p1, packageJson.aoc, 'example.1.txt'); // 22199 ~0ms
