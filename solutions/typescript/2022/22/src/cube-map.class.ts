import {
	Direction,
	GridGraph,
	GridGraphNode,
	ToString,
	Vec2,
	Vec2Like,
} from '@alexaegis/advent-of-code-lib';

/**
 * Face connection scenarios
 *
 * Imagine a random face marked with `@`
 * To find the face directly to the top of it could only be present in 6 places
 * because cubes have 6 faces.
 *
 * Folding all of these configurations will leave the tail end at the top
 * of the face marked with `@`
 *
 * Do this with every side (patterns rotated) and you'll get your folded cube.
 *
 */
export class CubeMap<T extends ToString> {
	cubeGraph = new GridGraph<T>();
	constructor(private readonly flatCube: (T | undefined)[][]) {
		for (let y = 0; y < this.flatCube.length; y++) {
			const row = this.flatCube[y];
			for (let x = 0; x < row.length; x++) {
				const cell = row[x];
				if (cell) {
					const position = new Vec2(x, y);
					const node = new GridGraphNode(position, cell);
					this.cubeGraph.nodes.set(node.coordinate.toString(), node);
				}
			}
		}
	}

	solve(): void {
		this.cubeGraph.print();

		for (const node of this.cubeGraph.nodes.values()) {
			for (const direction of Direction.cardinalDirections) {
				for (const facePath of walkCubeFacePaths(direction, node.coordinate)) {
					if (facePath.every((vertex) => this.cubeGraph.nodes.has(vertex.toString()))) {
						const neighbouringFacePosition = facePath.last();
						const neighbouringNode = this.cubeGraph.nodes.get(
							neighbouringFacePosition.toString()
						);
						if (neighbouringNode) {
							const alreadyFoundNeighbour = node.neighbours.get(direction);
							if (!alreadyFoundNeighbour) {
								node.neighbours.set(direction, {
									from: node,
									to: neighbouringNode,
									weight: 0,
								});
							} else if (
								neighbouringNode &&
								alreadyFoundNeighbour &&
								neighbouringNode !== alreadyFoundNeighbour.to
							) {
								console.log(
									direction,
									node.coordinate,
									neighbouringNode.coordinate,
									alreadyFoundNeighbour.to.coordinate
								);
								throw new Error('Found a different face for an existing neighbour');
							}
						}
					}
				}
			}
		}
	}

	isFolded(): boolean {
		return [...this.cubeGraph.nodes.values()]
			.map((node) => node.neighbourNodes.length)
			.every((length) => length === 4);
	}
}

const pathFromDirections = (directions: Direction[]): Vec2[] => {
	const cursor = Vec2.ORIGIN.clone();
	const result: Vec2[] = [];
	for (const direction of directions) {
		cursor.addMut(direction);
		result.push(cursor.clone());
	}
	return result;
};

/**
 * .#.
 * .@.
 * ...
 */
const get1Path = (initialDirection: Direction): Vec2[] => [initialDirection];

/**
 * #..
 * #@.
 * ...
 */
const get2PathLeftUp = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([initialDirection.left(), initialDirection]);

/**
 * ..#
 * .@#
 * ...
 */
const get2PathRightUp = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([initialDirection.right(), initialDirection]);

/**
 *  .....
 *  ...@.
 *  .###.
 *  .....
 */
const get3PathDownLeft = (initialDirection: Direction): Vec2[] => [
	initialDirection.reverse(),
	initialDirection.reverse().add(initialDirection.left()),
	initialDirection.reverse().add(initialDirection.left()).add(initialDirection.left()),
];

/**
 * .......
 * ...@...
 * ...###.
 * .......
 */
const get3PathDownRight = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.reverse(),
		initialDirection.right(),
		initialDirection.right(),
	]);

/**
 * .#...
 * .##@.
 * .....
 */
const get3PathLeftUp = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([initialDirection.left(), initialDirection.left(), initialDirection]);

/**
 * .....#.
 * ...@##.
 * .......
 */
const get3PathRightUp = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([initialDirection.right(), initialDirection.right(), initialDirection]);

/**
 * ...
 * .@.
 * .#.
 * .#.
 * .#.
 * ...
 */
const get3PathBack = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.reverse(),
		initialDirection.reverse(),
		initialDirection.reverse(),
	]);

/**
 *  .....
 *  ..#@.
 *  ..#..
 *  ..#..
 *  ..#..
 */
const get4PathLeftBack = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.left(),
		initialDirection.reverse(),
		initialDirection.reverse(),
		initialDirection.reverse(),
	]);

/**
 *  .....
 *  ..@#.
 *  ...#.
 *  ...#.
 *  ...#.
 */
const get4PathRightBack = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.right(),
		initialDirection.reverse(),
		initialDirection.reverse(),
		initialDirection.reverse(),
	]);

/**
 *  #....
 *  ###@.
 *  .....
 */
const get4PathLeftUp = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.left(),
		initialDirection.left(),
		initialDirection.left(),
		initialDirection,
	]);

/**
 *  ....#
 *  .@###
 *  .....
 */
const get4PathRightUp = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.right(),
		initialDirection.right(),
		initialDirection.right(),
		initialDirection,
	]);

/**
 *  .....
 *  ..#@.
 *  ###..
 *  .....
 */
const get4PathLeftBackLeft = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.left(),
		initialDirection.reverse(),
		initialDirection.left(),
		initialDirection.left(),
	]);

/**
 *  ........
 *  ...@#...
 *  ....###.
 *  ........
 */
const get4PathRightDownRight = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.right(),
		initialDirection.reverse(),
		initialDirection.right(),
		initialDirection.right(),
	]);

/**
 * ....
 * ..@.
 * .##.
 * ##..
 * ....
 */
const get4PathDownLeftDownLeft = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.reverse(),
		initialDirection.left(),
		initialDirection.reverse(),
		initialDirection.left(),
	]);

/**
 * .....
 * .@...
 * .##..
 * ..##.
 * .....
 */
const get4PathDownRightDownRight = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.reverse(),
		initialDirection.right(),
		initialDirection.reverse(),
		initialDirection.right(),
	]);

/**
 * ...
 * .@.
 * .#.
 * ##.
 * #..
 * ...
 */
const get4PathDownLeftDown = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.reverse(),
		initialDirection.reverse(),
		initialDirection.left(),
		initialDirection.reverse(),
	]);

/**
 *  ...
 *  .@.
 *  .#.
 *  .##
 *  ..#
 *  ...
 */
const get4PathDownRightDown = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.reverse(),
		initialDirection.reverse(),
		initialDirection.right(),
		initialDirection.reverse(),
	]);

/**
 * ......
 * ..##@.
 * ###...
 * ......
 */
const get5PathLeftDownLeft = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.left(),
		initialDirection.left(),
		initialDirection.reverse(),
		initialDirection.left(),
		initialDirection.left(),
	]);

/**
 * .......
 * .@##...
 * ...###.
 * .......
 */
const get5PathRightDownRight = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.right(),
		initialDirection.right(),
		initialDirection.reverse(),
		initialDirection.right(),
		initialDirection.right(),
	]);

/**
 * .....
 * ..#@.
 * .##..
 * ##...
 * .....
 * @param direction
 * @returns
 */
const get5PathLeftDownLeftDownLeft = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.left(),
		initialDirection.reverse(),
		initialDirection.left(),
		initialDirection.reverse(),
		initialDirection.left(),
	]);

/**
 * ......
 * .@#...
 * ..##..
 * ...##.
 * ......
 * @param direction
 * @returns
 */
const get5PathRightDownRightDownRight = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.right(),
		initialDirection.reverse(),
		initialDirection.right(),
		initialDirection.reverse(),
		initialDirection.right(),
	]);

/**
 *   ....
 *   .#@.
 *   .#..
 *   ##..
 *   #...
 *   ....
 * @param direction
 * @returns
 */
const get5PathLeftDownLeftDown = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.left(),
		initialDirection.reverse(),
		initialDirection.reverse(),
		initialDirection.left(),
		initialDirection.reverse(),
	]);

/**
 *   ......
 *   ..@#..
 *   ...#..
 *   ...##.
 *   ....#.
 *   ......
 * @param direction
 * @returns
 */
const get5PathRightDownRightDown = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.right(),
		initialDirection.reverse(),
		initialDirection.reverse(),
		initialDirection.right(),
		initialDirection.reverse(),
	]);

/**
 *   ....
 *   ..@.
 *   .##.
 *   .#..
 *   ##..
 *   ....
 * @param direction
 * @returns
 */
const get5PathDownLeftDownLeft = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.reverse(),
		initialDirection.left(),
		initialDirection.reverse(),
		initialDirection.reverse(),
		initialDirection.left(),
	]);

/**
 *   ......
 *   ..@...
 *   ..##..
 *   ...#..
 *   ...##.
 *   ......
 * @param initialDirection
 * @returns
 */
const get5PathDownRightDownRight = (initialDirection: Direction): Vec2[] =>
	pathFromDirections([
		initialDirection.reverse(),
		initialDirection.right(),
		initialDirection.reverse(),
		initialDirection.reverse(),
		initialDirection.right(),
	]);

/**
 * In this collection of paths, every paths should either be not fully matching,
 * (for every vector there is a node in the flat cubemap) or when there is,
 * the last node in the path is connected to the source node in the direction of
 * initialDirection
 */
export const everyCubeFacePath = (initialDirection: Direction, shiftBy: Vec2Like): Vec2[][] => [
	...walkCubeFacePaths(initialDirection, shiftBy),
];

export function* walkCubeFacePaths(
	initialDirection: Direction,
	shiftBy: Vec2Like
): Generator<Vec2[]> {
	yield get1Path(initialDirection).map((position) => position.add(shiftBy));
	yield get2PathLeftUp(initialDirection).map((position) => position.add(shiftBy));
	yield get2PathRightUp(initialDirection).map((position) => position.add(shiftBy));

	yield get3PathLeftUp(initialDirection).map((position) => position.add(shiftBy));
	yield get3PathRightUp(initialDirection).map((position) => position.add(shiftBy));
	yield get3PathDownLeft(initialDirection).map((position) => position.add(shiftBy));
	yield get3PathDownRight(initialDirection).map((position) => position.add(shiftBy));
	yield get3PathBack(initialDirection).map((position) => position.add(shiftBy));

	yield get4PathLeftUp(initialDirection).map((position) => position.add(shiftBy));
	yield get4PathRightUp(initialDirection).map((position) => position.add(shiftBy));
	yield get4PathLeftBack(initialDirection).map((position) => position.add(shiftBy));
	yield get4PathRightBack(initialDirection).map((position) => position.add(shiftBy));
	yield get4PathDownLeftDownLeft(initialDirection).map((position) => position.add(shiftBy));
	yield get4PathDownRightDownRight(initialDirection).map((position) => position.add(shiftBy));
	yield get4PathRightDownRight(initialDirection).map((position) => position.add(shiftBy));
	yield get4PathLeftBackLeft(initialDirection).map((position) => position.add(shiftBy));
	yield get4PathDownRightDown(initialDirection).map((position) => position.add(shiftBy));
	yield get4PathDownLeftDown(initialDirection).map((position) => position.add(shiftBy));

	yield get5PathLeftDownLeft(initialDirection).map((position) => position.add(shiftBy));
	yield get5PathRightDownRight(initialDirection).map((position) => position.add(shiftBy));
	yield get5PathDownLeftDownLeft(initialDirection).map((position) => position.add(shiftBy));
	yield get5PathDownRightDownRight(initialDirection).map((position) => position.add(shiftBy));
	yield get5PathLeftDownLeftDown(initialDirection).map((position) => position.add(shiftBy));
	yield get5PathRightDownRightDown(initialDirection).map((position) => position.add(shiftBy));
	yield get5PathLeftDownLeftDownLeft(initialDirection).map((position) => position.add(shiftBy));
	yield get5PathRightDownRightDownRight(initialDirection).map((position) =>
		position.add(shiftBy)
	);
}
