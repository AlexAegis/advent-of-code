import { Direction, split, Vec2, Vec2String } from '@alexaegis/advent-of-code-lib';
import {
	AsciiDisplayComponent,
	Component,
	GridWorld,
	PositionComponent,
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
	const rockKind = new RockKindComponent();

	const sandDisplay = new AsciiDisplayComponent('o');
	const rockDisplay = new AsciiDisplayComponent('#');
	const world = new GridWorld();
	const sandSpawner = world.spawn(
		new SandSpawnerKindComponent(),
		new StaticPositionComponent(new Vec2(500, 0)),
		new AsciiDisplayComponent('+')
	);

	const spawnRock = (at: Vec2) => {
		// It appears that the input has duplicated lines so it's not given that
		// every segment is unique
		if (world.getEntitiesByPosition(at).length === 0) {
			world.spawn(rockKind, new StaticPositionComponent(at), rockDisplay);
		}
	};
	const spawnSand = (at: Vec2) => world.spawn(sandKind, new PositionComponent(at), sandDisplay);

	for (const rockLine of rockLines) {
		rockLine.pairwise((from, to) => {
			spawnRock(from);
			for (const rockPiecePosition of from.reach(to, false, true)) {
				spawnRock(rockPiecePosition);
			}
		});
	}

	world.calculateEntityBoundingBox();
	world.focusViewportToEntities();

	const floor = world.entityBoundingBox.topRight.y + 2;

	const tryMoveLikeSand = (c: PositionComponent): boolean =>
		c.position.y + 1 < floor &&
		(c.move(Direction.NORTH) || c.move(Direction.NORTHWEST) || c.move(Direction.NORTHEAST));

	// Spawn and settle sand
	world.addSystem((world) => {
		let didSomething = false;

		const [_e, sandSpawnerData, sandSpawnerPosition] = world.queryOne(
			SandSpawnerKindComponent,
			StaticPositionComponent
		);
		if (
			sandSpawnerData.enabled &&
			world.entitiesAt(sandSpawnerPosition.position).filter((e) => e !== sandSpawner)
				.length === 0
		) {
			const spawnedSand = spawnSand(sandSpawnerPosition.position.clone());
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

	return world;
};
