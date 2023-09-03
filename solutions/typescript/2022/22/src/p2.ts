/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	BoundingBox,
	DOUBLE_NEWLINE,
	Direction,
	GridGraphNode,
	NEWLINE,
	mapFirst,
	task,
	zip,
	type Vec2String,
} from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { CubeMap } from './cube-map.class.js';
import { getFacingScore, parseMovementInstructions } from './parse.function.js';

export type Vec2EdgeString = `${Vec2String}-${Vec2String}`;

const getShortestSegment = (input: string): number =>
	input
		.split(NEWLINE)
		.map((line) =>
			[...line.matchAll(/ +/g), ...line.matchAll(/[#.]+/g)]
				.map((matches) => matches[0].length)
				.min(),
		)
		.min();

export const p2 = (input: string): number => {
	const [map, rawInstructions] = input.splitIntoStringPair(DOUBLE_NEWLINE);
	const instructions = parseMovementInstructions(rawInstructions);
	const graph = map.toGridGraph<string>();
	const sideLength = getShortestSegment(input);
	const flatCubeBox = graph.boundingBox();
	const horizontalFaceCount = flatCubeBox.horizontal.length / sideLength;
	const verticalFaceCount = flatCubeBox.vertical.length / sideLength;

	const flatCubeFaceBox = BoundingBox.fromSize({ x: horizontalFaceCount, y: verticalFaceCount });

	const flatCube = flatCubeFaceBox.createBlankMatrix((flatCubeCell) => {
		const topLeft = flatCubeCell.clone().applyChange((n) => n * sideLength);
		if (graph.nodes.has(topLeft.toString())) {
			const bottomRight = flatCubeCell.clone().applyChange((n) => (n + 1) * sideLength - 1);
			return BoundingBox.fromVectors([topLeft, bottomRight]);
		} else {
			return undefined;
		}
	});

	const cube = new CubeMap(flatCube);
	cube.solve();
	// For every cubeface in the simplistic representation where faces are already connected
	for (const cubeFace of cube.cubeGraph.nodes.values()) {
		// get the box of the face on the flat representation
		const faceBox = cubeFace.value;

		// Then in every direction
		for (const direction of Direction.cardinalDirections) {
			// Then for the source edge, get all the coordinates for the nodes along that edge
			const sourceEdge = faceBox
				.getEdge(direction)
				.map((coordinate) => graph.getNode(coordinate)!);
			// Find the matching edge on the target cubeface
			const targetCubeface = cubeFace.neighbours.get(direction)!.to;
			const [reverseDirection] = [...targetCubeface.neighbours.entries()].find(
				([, edge]) => edge.to === cubeFace,
			)!;
			// And collect the edge of the target face

			const targetEdge = targetCubeface.value
				.getEdge(reverseDirection)
				.map((coordinate) => graph.getNode(coordinate)!)
				.reverse();

			for (const [from, to] of zip(sourceEdge, targetEdge)) {
				from.neighbours.set(direction, {
					from,
					to,
					data: reverseDirection.turn(180),
					weight: from.value === to.value ? 0 : Number.POSITIVE_INFINITY,
				});
			}
		}
	}

	const start = mapFirst(flatCubeBox.horizontal.collectValues(), (x) => {
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
					if (edge.data) {
						direction = edge.data as Direction;
					}
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

await task(p2, packageJson.aoc); // 120175 ~63.39ms
