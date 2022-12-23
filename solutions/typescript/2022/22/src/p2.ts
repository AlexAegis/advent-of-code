import {
	BoundingBox,
	Direction,
	DOUBLE_NEWLINE,
	NEWLINE,
	task,
	Vec2String,
} from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { CubeMap } from './cube-map.class.js';
import { parseMovementInstructions } from './parse.function.js';

export type Vec2EdgeString = `${Vec2String}-${Vec2String}`;

export const p2 = (input: string): number => {
	const [map, rawInstructions] = input.split(DOUBLE_NEWLINE);
	const instructions = parseMovementInstructions(rawInstructions);
	const graph = map.toGridGraph<string>();
	console.log(instructions);
	const sideLength = map
		.split(NEWLINE)
		.map((line) =>
			[...line.matchAll(/ +/g), ...line.matchAll(/[.#]+/g)]
				.map((matches) => matches[0].length)
				.min()
		)
		.min();

	const faceBox = BoundingBox.fromSize({ x: sideLength, y: sideLength });
	const box = graph.boundingBox();
	const flatcubeWidth = box.horizontal.length / sideLength;
	const flatcubeHeight = box.vertical.length / sideLength;

	const flatCubeSize = BoundingBox.fromSize({ x: flatcubeWidth, y: flatcubeHeight });

	const flatCube = flatCubeSize.createBlankMatrix((flatCubeCell) =>
		graph.getNode(flatCubeCell.applyChange((n) => n * sideLength))
	);

	const cube = new CubeMap(flatCube);
	cube.solve();
	console.log('isFolded ?', cube.isFolded());

	for (const cubeFace of cube.cubeGraph.nodes.values()) {
		const faceAnchor = cubeFace.value;
		const northEdge = faceBox.horizontal
			.collectValues()
			.map((x) => faceAnchor.coordinate.add({ x, y: 0 }));
		const northernCubeface = cubeFace.north!.to;
		const northernCubefaceReverseDirection = [northernCubeface.neighbours.entries()].find(
			([, v]) => v[1].to === cubeFace
		)!;
		for (const direction of Direction.cardinalDirections) {
			// get edge
			console.log(direction, northernCubefaceReverseDirection, northEdge);
		}
	}

	/*
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
				const edge = position.neighbours.get(
					direction
				);
				if (edge && edge.weight !== Infinity) {
					position = edge.to;
					path.push(position);
				}
			}
		}
	}

	if (process.env.RUN) {
		graph.printPath(path);
	}

	return (
		1000 * (position.coordinate.y + 1) +
		4 * (position.coordinate.x + 1) +
		getFacingScore(direction)
	);*/
	return -1;
};

await task(p2, packageJson.aoc); // 97356 ~0ms
