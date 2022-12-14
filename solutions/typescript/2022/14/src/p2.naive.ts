import { Direction, split, task, Vec2, Vec2String } from '@alexaegis/advent-of-code-lib';
import {
	AsciiDisplayComponent,
	Component,
	GridWorld,
	MetadataKindComponent,
	PositionComponent,
	StaticPositionComponent,
} from '@alexaegis/ecs';
import packageJson from '../package.json' assert { type: 'json' };

class SandKindComponent extends Component {}
class SandSpawnerKindComponent extends Component {}
class RockKindComponent extends Component {}

class SandWorldComponent extends Component {
	isSomethingFalling = false;
	sandFellIntoTheAbyss = false;
	/**
	 * Y level to despawn at
	 */
	constructor(public despawnBoundary = 1000) {
		super();
	}
}

export const p2 = (input: string): number => {
	const rockLines = split(input).map((line) =>
		line.split(' -> ').map((vs) => new Vec2(vs as Vec2String))
	);

	const sandKind = new SandKindComponent();
	const rockKind = new RockKindComponent();

	const sandDisplay = new AsciiDisplayComponent('o');
	const rockDisplay = new AsciiDisplayComponent('#');
	const world = new GridWorld();
	world.spawn(
		new SandSpawnerKindComponent(),
		new StaticPositionComponent(new Vec2(500, 0)),
		new AsciiDisplayComponent('+')
	);
	const spawnRock = (at: Vec2) =>
		world.spawn(rockKind, new StaticPositionComponent(at), rockDisplay);
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
	console.log(world.viewport.topLeft);
	console.log(world.viewport.bottomRight);
	const floor = world.entityBoundingBox.bottomRight.y + 2;
	console.log('FLOOR LEVEL', floor);
	world.spawn(new MetadataKindComponent(), new SandWorldComponent(world.viewport.bottomRight.y));

	world.addSystem((world) => {
		let somethingFalling = false;
		for (const [sandEntity, positionComponent] of world.query(
			PositionComponent,
			SandKindComponent
		)) {
			if (
				positionComponent.position.y + 1 < floor &&
				(positionComponent.move(Direction.NORTH) ||
					positionComponent.move(Direction.NORTHWEST) ||
					positionComponent.move(Direction.NORTHEAST))
			) {
				somethingFalling = true;
			} else {
				// Cant fall anymore, make it static
				world.deattachComponent(sandEntity, positionComponent);
				world.attachComponent(
					sandEntity,
					new StaticPositionComponent(positionComponent.position.clone())
				);
			}
		}

		world.getSingletonComponent(SandWorldComponent).isSomethingFalling = somethingFalling;
		return somethingFalling;
	});

	world.addSystem((world) => {
		let didSomething = false;
		const worldData = world.getSingletonComponent(SandWorldComponent);

		if (!worldData.isSomethingFalling && !worldData.sandFellIntoTheAbyss) {
			const [spawner, spawnPos] = world.queryOne(
				StaticPositionComponent,
				SandSpawnerKindComponent
			);

			if (world.entitiesAt(spawnPos.position).filter((e) => e !== spawner).length === 0) {
				spawnSand(spawnPos.position.clone());
				didSomething = true;
			}
		}
		return didSomething;
	});

	while (!world.systemsSettled) {
		world.tick();

		if (world.time % 2000 === 0) {
			world.print(true);
		}
	}

	world.print(true);

	// TODO: for some reason it has one extra
	return world.query(SandKindComponent, StaticPositionComponent).length;
};

await task(p2, packageJson.aoc, 'example.1.txt');
// not 8834
