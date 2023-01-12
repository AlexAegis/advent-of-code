import { Direction, split, Vec2, Vec2String } from '@alexaegis/advent-of-code-lib';
import {
	AsciiDisplayComponent,
	ColliderComponent,
	Component,
	GridWorld,
	PositionComponent,
	spawnWall,
	StaticPositionComponent,
} from '@alexaegis/ecs';

export class SandKindComponent extends Component {}
export class RockKindComponent extends Component {}

export class SandSpawnerKindComponent extends Component {
	enabled = true;
}

export const createSandWorld = (wallDefinitions: string): GridWorld => {
	const rockLines = split(wallDefinitions).map((line) =>
		line.split(' -> ').map((vs) => new Vec2(vs as Vec2String))
	);

	const sandKind = new SandKindComponent();
	const sandDisplay = AsciiDisplayComponent.fromString('o');

	const world = new GridWorld({
		executorSpeed: process.env.RUN ? 60 : 'instant',
		executorHaltCondition: 'untilSettled',
		io: process.env.RUN ? 'terminalKit' : undefined,
	});

	const sandSpawner = world.spawn(
		new SandSpawnerKindComponent(),
		new StaticPositionComponent(new Vec2(500, 0)),
		AsciiDisplayComponent.fromString('+')
	);

	const spawnSand = (at: Vec2) =>
		world.spawn(sandKind, new PositionComponent(at), sandDisplay, ColliderComponent.unit);

	for (const rockLine of rockLines) {
		rockLine.pairwise((from, to) => {
			spawnWall(world, from, to);
		});
	}

	world.centerCameraOnEntities();

	const floor = world.getVisibleEntityBoundingBox().bottom + 1;

	const tryMoveLikeSand = (c: PositionComponent): boolean =>
		c.position.y < floor &&
		(c.move(Direction.SOUTH) || c.move(Direction.SOUTHWEST) || c.move(Direction.SOUTHEAST));

	// Spawn and settle sand
	world.addSystem((world) => {
		let didSomething = false;

		const [_e, sandSpawnerData, position] = world.queryOne(
			SandSpawnerKindComponent,
			StaticPositionComponent
		);
		if (
			sandSpawnerData.enabled &&
			world.entitiesVisibleAt(position.position).filter((e) => e !== sandSpawner).length === 0
		) {
			const spawnedSand = spawnSand(position.position.clone());
			const positionComponent = spawnedSand.getComponent(PositionComponent)!;
			let moving = true;
			while (moving) {
				moving = tryMoveLikeSand(positionComponent);
			}

			spawnedSand.freezePosition();

			didSomething = true;
		}

		return didSomething;
	});

	// Looks prettier, but slow
	/*
	// spawn sand when there are no movable sand on the map
	world.addSystem((world) => {
		let didSomething = false;

		const [_e, sandSpawnerData, sandSpawnerPosition] = world.queryOne(
			SandSpawnerKindComponent,
			StaticPositionComponent
		);
		if (
			sandSpawnerData.enabled &&
			world.query(PositionComponent, SandKindComponent).length === 0 &&
			world.entitiesAt(position.position).filter((e) => e !== sandSpawner).length === 0
		) {
			spawnSand(sandSpawnerPosition.position.clone());
			didSomething = true;
		}

		return didSomething;
	});

	// move sand
	world.addSystem((world) => {
		let didSomething = false;

		for (const [sand, positionComponent] of world.query(PositionComponent, SandKindComponent)) {
			const moving = tryMoveLikeSand(positionComponent);

			if (!moving) {
				sand.freezePosition();
			}

			didSomething = didSomething || moving;
		}

		return didSomething;
	});
*/
	return world;
};
