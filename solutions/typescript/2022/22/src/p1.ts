/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	Direction,
	DOUBLE_NEWLINE,
	GridGraphNode,
	mapFirst,
	task,
} from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { getFacingScore, parseMovementInstructions } from './parse.function.js';

export const p1 = (input: string): number => {
	const [map, rawInstructions] = input.splitIntoStringPair(DOUBLE_NEWLINE);
	const instructions = parseMovementInstructions(rawInstructions);
	const graph = map.toGridGraph();

	graph.connectEdgeNodesWrappingAround();

	const box = graph.boundingBox();
	const start = mapFirst(box.horizontal.collectValues(), (x) => {
		const node = graph.getNode({ x, y: 0 });
		return node?.value === '.' ? node : undefined;
	})!;

	const path: GridGraphNode[] = [start];
	let position = start;
	let direction = Direction.EAST;
	for (const instruction of instructions) {
		if (instruction === 'L') {
			direction = direction.left();
		} else if (instruction === 'R') {
			direction = direction.right();
		} else {
			for (let i = 0; i < instruction; i++) {
				const edge = position.neighbours.get(direction);
				if (edge && edge.weight !== Number.POSITIVE_INFINITY) {
					position = edge.to;
					path.push(position);
				}
			}
		}
	}

	if (process.env['RUN']) {
		graph.printPath(path);
	}

	return (
		1000 * (position.coordinate.y + 1) +
		4 * (position.coordinate.x + 1) +
		getFacingScore(direction)
	);
};

await task(p1, packageJson.aoc); // 97356 ~67.88ms
