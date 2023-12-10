import {
	Direction,
	GridGraphNode,
	type GridGraph,
	type Weighter,
} from '@alexaegis/advent-of-code-lib';

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

export const weighter: Weighter<GridGraphNode> = (a, b, dir) => {
	if (a.value === '.' && b.value === '.') {
		return 1;
	}

	const aConnectors = pipeConnectorMap[a.value.toString()];
	const bConnectors = pipeConnectorMap[b.value.toString()];

	const connection =
		(aConnectors?.includes(dir) && bConnectors?.includes(dir.reverse())) ?? false;
	return connection ? 1 : Number.POSITIVE_INFINITY;
};

export const parse = (input: string): GridGraph =>
	input.toGridGraph({
		weighter,
	});
