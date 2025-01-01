import { BoundingBox, Direction, task, Vec2, type Vec2String } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export interface PatrolResult {
	path: Set<Vec2String>;
	encounters: Set<Vec2String>;
	isLoop: boolean;
	movement: Move[];
}

interface Move {
	position: Vec2;
	direction: Direction;
}

export const patrol = (obscructions: Set<string>, map: BoundingBox, from: Vec2): PatrolResult => {
	let guardPosition = from.clone();
	let guardDirection = Direction.NORTH.clone();
	const path = new Set<Vec2String>();
	const encounters = new Set<Vec2String>();
	const guardMovement = new Set<string>();
	const movementPath: Move[] = [];

	path.add(guardPosition.toString());
	guardMovement.add(guardPosition.toString() + '+' + guardDirection.toString());
	movementPath.push({ position: guardPosition, direction: guardDirection });

	let isLoop = false;

	while (true) {
		let forwardPosition = guardPosition.add(guardDirection);
		if (!forwardPosition.isWithin(map)) {
			break;
		}

		if (obscructions.has(forwardPosition.toString())) {
			encounters.add(forwardPosition.toString());
			guardDirection = guardDirection.rotateLeft();
		}

		guardPosition.addMut(guardDirection);
		path.add(guardPosition.toString());
		const move = guardPosition.toString() + '+' + guardDirection.toString();
		movementPath.push({ position: guardPosition, direction: guardDirection });

		if (guardMovement.has(move)) {
			isLoop = true;
			break;
		} else {
			guardMovement.add(move);
		}
	}
	return {
		path,
		encounters,
		isLoop,
	};
};

/**
 * Since the guard can only rotate right, and 90 degrees, a loop always
 * will look like a rectangle
 */
export const matchEnclosure = (
	position: Vec2,
	direction: Direction,
	pivotPlacement: Direction,
	boundingBox: BoundingBox,
	obscructions: Set<Vec2String>,
): boolean => {
	const possibleObstruction = position.add(direction);
	if (obscructions.has(possibleObstruction.toString())) {
		return false; // Already obsctructed
	}

	const firstCorner = position.add(direction.rotateLeft(1), {
		times: (v) => !obscructions.has(v.toString()) && boundingBox.contains(v),
	});
	console.log('fc', firstCorner);

	return false;
};

export const createParametricEnclosure =
	(pivot: Vec2, pivotPlacement: Direction) => (size: Vec2) => {};

export const createEnclosure = (pivot: Vec2, pivotPlacement: Direction, size: Vec2): Vec2[] => {
	const corners = [pivot];

	const vertical = pivotPlacement.y > 0 ? new Vec2(1, -size.y) : new Vec2(-1, size.y);
	const horizontal = pivotPlacement.x > 0 ? new Vec2(-size.x, -1) : new Vec2(size.x, 1);
	// Horizontal

	corners.push(pivot.add(vertical));
	corners.push(pivot.add(horizontal));

	corners.push(pivot.add(vertical.add(horizontal)));

	return corners;
};

const enclosurePivotMap = {
	[Direction.NORTH.toString()]: Direction.NORTHWEST,
	[Direction.EAST.toString()]: Direction.NORTHEAST,
	[Direction.SOUTH.toString()]: Direction.SOUTHEAST,
	[Direction.WEST.toString()]: Direction.SOUTHWEST,
} as const;

export const p2 = (input: string): number => {
	const g = input.toGridGraph();
	const boundingBox = g.boundingBox();

	const obstructions = new Set(
		g.nodeValues.filter((node) => node.value === '#').map((node) => node.coordinate.toString()),
	);

	const freeNodes = new Set(
		g.nodeValues.filter((node) => node.value === '.').map((node) => node.coordinate.toString()),
	);

	const guardNode = g.findNode((node) => node.value === '^');
	if (!guardNode) {
		throw new Error('Guard not found');
	}

	g.print();
	console.log('23332323----------------------');

	const originalPatrolResult = patrol(obstructions, boundingBox, guardNode.coordinate);

	const enclosure = createEnclosure(new Vec2(3, 3), Direction.SOUTHWEST, new Vec2(3, 3));

	g.print((n) =>
		enclosure.map((e) => e.toString()).includes(n.coordinate.toString())
			? enclosure
					.map((e) => e.toString())
					.indexOf(n.coordinate.toString())
					.toString()
			: originalPatrolResult.path.has(n.coordinate.toString())
				? 'X'
				: originalPatrolResult.encounters.has(n.coordinate.toString())
					? 'E'
					: n.toString(),
	);

	const result = originalPatrolResult.movement.filter((move) => {
		const pivotPlacement = enclosurePivotMap[move.direction.toString()];
		if (!pivotPlacement) {
			throw new Error('invalid direction');
		}
		return matchEnclosure(
			move.position,
			move.direction,
			pivotPlacement,
			boundingBox,
			obstructions,
		);
	}).length;

	// const possibleObstructionCoordinates = [...originalPatrolResult.path].filter(
	// 	(p) => p !== guardNode.coordinate.toString(),
	// );

	//const possibleObstructionCoordinates = [...freeNodes];
	//
	//return possibleObstructionCoordinates.filter((possibleObstructionCoordinate) => {
	//	const newObstructions = new Set(obstructions);
	//	newObstructions.add(possibleObstructionCoordinate);
	//
	//	const patrolResult = patrol(newObstructions, map, guardNode.coordinate);
	//
	//	//g.print((n) =>
	//	//	patrolResult.path.has(n.coordinate.toString())
	//	//		? 'X'
	//	//		: n.coordinate.toString() === possibleObstructionCoordinate
	//	//			? 'O'
	//	//			: n.toString(),
	//	//);
	//	// console.log('--------', patrolResult);
	//	return patrolResult.isLoop;
	//}).length;
	return result;
};

await task(p2, packageJson.aoc); // 1563 ~0.09ms
// 1563 too low
