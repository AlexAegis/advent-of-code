import {
	BoundingBox,
	Direction,
	DOUBLE_NEWLINE,
	GridGraphNode,
	mapFirst,
	NEWLINE,
	task,
	Vec2String,
	zip,
} from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { CubeMap } from './cube-map.class.js';
import { getFacingScore, parseMovementInstructions } from './parse.function.js';

export type Vec2EdgeString = `${Vec2String}-${Vec2String}`;

const getShortestSegment = (input: string): number =>
	input
		.split(NEWLINE)
		.map((line) =>
			[...line.matchAll(/ +/g), ...line.matchAll(/[.#]+/g)]
				.map((matches) => matches[0].length)
				.min()
		)
		.min();

export const p2 = (input: string): number => {
	const [map, rawInstructions] = input.split(DOUBLE_NEWLINE);
	const instructions = parseMovementInstructions(rawInstructions);
	const graph = map.toGridGraph<string>();
	console.log(instructions);
	const sideLength = getShortestSegment(input);
	console.log('sideLength', sideLength);
	const flatCubeBox = graph.boundingBox();
	console.log('flatCubeBox', flatCubeBox.toString());
	const horizontalFaceCount = flatCubeBox.horizontal.length / sideLength;
	const verticalFaceCount = flatCubeBox.vertical.length / sideLength;

	const flatCubeFaceBox = BoundingBox.fromSize({ x: horizontalFaceCount, y: verticalFaceCount });

	console.log(
		'horizontalFaceCount',
		horizontalFaceCount,
		'verticalFaceCount',
		verticalFaceCount,
		'flatCubeFaceBox',
		flatCubeFaceBox.toString()
	);
	const flatCube = flatCubeFaceBox.createBlankMatrix((flatCubeCell) => {
		const topLeft = flatCubeCell.clone().applyChange((n) => n * sideLength);
		if (graph.nodes.has(topLeft.toString())) {
			const bottomRight = flatCubeCell.clone().applyChange((n) => (n + 1) * sideLength - 1);
			console.log('topleft', topLeft, 'bottomRight', bottomRight);
			console.log('makeCube', flatCubeCell.toString());
			return BoundingBox.fromVectors(topLeft, bottomRight);
		} else {
			return undefined;
		}
	});

	console.log(
		'flatmat \n',
		flatCube
			.map((f) =>
				f.map((e) => e?.toString() ?? '                                     ').join(', ')
			)
			.join(';\n')
	);

	const cube = new CubeMap(flatCube);
	cube.solve();
	console.log('isFolded ?', cube.isFolded());

	cube.cubeGraph.nodes.forEach((v, k) => {
		console.log('CUBENODE, ', k);

		console.log(v.value.topLeft.toString());
		v.neighbours.forEach((ve, ke) => {
			console.log(
				`\t${Direction.getNameOf(
					ke
				)}, delta ${ke}, IN CUBEMAP: ${ve.to.coordinate.toString()} REAL: ${ve.to.value.toString()}`
			);
		});
	});

	// ! SOURCE ALWAYS CLOCKWISE TARGET ALWAYS COUNTERCLOCKWISE

	// For every cubeface in the simplistic representation where faces are already connected
	for (const cubeFace of cube.cubeGraph.nodes.values()) {
		// get the box of the face on the flat representation
		const faceBox = cubeFace.value;
		console.log(
			'cubeFACE',
			cubeFace.coordinate.toString(),
			faceBox.toString(),
			'topLeft',
			faceBox.topLeft.toString(),
			'bottomRight',
			faceBox.bottomRight.toString()
		);
		// Then in every direction
		for (const direction of Direction.cardinalDirections) {
			// Then for the source edge, get all the coordinates for the nodes along that edge
			console.log(
				'direc',
				Direction.getNameOf(direction),
				faceBox
					.getEdge(direction)
					.map((a) => a.toString())
					.join('; ')
			);
			const sourceEdge = faceBox
				.getEdge(direction)
				.map((coordinate) => graph.getNode(coordinate)!);
			// Find the matching edge on the target cubeface
			const targetCubeface = cubeFace.neighbours.get(direction)!.to;
			const [reverseDirection] = [...targetCubeface.neighbours.entries()].find(
				([, edge]) => edge.to === cubeFace
			)!;
			// And collect the edge of the target face

			const targetEdge = targetCubeface.value
				.getEdge(reverseDirection)
				.map((coordinate) => graph.getNode(coordinate)!)
				.reverse();

			console.log(
				'what sourceEdge',
				sourceEdge.join(', '),
				sourceEdge.map((s) => s.coordinate.toString()).join(', ')
			);
			console.log(
				'what targetEdge',
				targetEdge.join(', '),
				targetEdge.map((s) => s.coordinate.toString()).join(', ')
			);
			for (const [from, to] of zip(sourceEdge, targetEdge)) {
				const existingForwardEdge = from.neighbours.get(direction);
				if (existingForwardEdge) {
					if (existingForwardEdge.from !== from || existingForwardEdge.to !== to) {
						throw new Error(
							`Existing forward edge is bad, ${from.coordinate.toString()}->${to.coordinate.toString()} is actually ${existingForwardEdge.from.coordinate.toString()}->${existingForwardEdge.to.coordinate.toString()}`
						);
					}
				} else {
					from.neighbours.set(direction, {
						from,
						to,
						data: reverseDirection.turn(180),
						weight: from.value === to.value ? 0 : Infinity,
					});
				}
				/*
				const existingReverseEdge = to.neighbours.get(reverseDirection);
				if (existingReverseEdge) {
					if (existingReverseEdge.from !== to || existingReverseEdge.to !== from) {
						throw new Error(
							`Existing reverse edge is bad, ${to.coordinate.toString()}->${from.coordinate.toString()} is actually ${existingReverseEdge.from.coordinate.toString()}->${existingReverseEdge.to.coordinate.toString()}`
						);
					}
				} else {
					to.neighbours.set(reverseDirection, {
						from: to,
						to: from,
						data: reverseDirection,
						weight: from.value === to.value ? 0 : Infinity,
					});
				}*/
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
				if (edge && edge.weight !== Infinity) {
					position = edge.to;
					path.push(position);
					if (edge.data) {
						direction = edge.data as Direction;
					}
				}
			}
		}
	}

	console.log('path', path.map((p) => p.coordinate.toString()).join('->'));

	if (process.env.RUN) {
		graph.printPath(path);
	}

	return (
		1000 * (position.coordinate.y + 1) +
		4 * (position.coordinate.x + 1) +
		getFacingScore(direction)
	);
};

await task(p2, packageJson.aoc); // 120175 ~0ms
