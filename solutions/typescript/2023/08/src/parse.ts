import { Direction, Graph, GraphNode } from '@alexaegis/advent-of-code-lib';

export const parse = (input: string): [Graph<number>, string[]] => {
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
		graphNode.neighbours.set(Direction.WEST, {
			from: graphNode,
			to: leftNode,
			direction: Direction.WEST,
		});
		graphNode.neighbours.set(Direction.EAST, {
			from: graphNode,
			to: rightNode,
			direction: Direction.EAST,
		});
		graph.nodes.set(key, graphNode);
	}

	return [graph, instructions];
};

export const stepUntil = (
	fromNode: GraphNode<number>,
	instructions: string[],
	until: (n: GraphNode<number>) => boolean,
): number => {
	let step = 0;
	let currentNode = fromNode;
	while (!until(currentNode)) {
		const instruction = instructions[step % instructions.length];
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		currentNode = currentNode.neighbours.get(
			instruction === 'L' ? Direction.WEST : Direction.EAST,
		)!.to;
		step++;
	}
	return step;
};
