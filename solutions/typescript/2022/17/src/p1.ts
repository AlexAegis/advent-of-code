import { Direction, split, task, Vec2 } from '@alexaegis/advent-of-code-lib';
import {
	AsciiDisplayComponent,
	ColliderComponent,
	Component,
	Entity,
	GridWorld,
	PositionComponent,
	spawnWall,
	StaticPositionComponent,
} from '@alexaegis/ecs';
import packageJson from '../package.json' assert { type: 'json' };

export class TetrominoComponent extends Component {}

const horizontalLineTetromino = '####';

const crossTetromino = `\
 #
###
 # `;

const reverseLTetromino = `\
  #
  #
###`;

const verticalTetromino = `\
#
#
#
#`;

const squareTetromino = `\
##
##`;

export const tetrominoOrder = [
	horizontalLineTetromino,
	crossTetromino,
	reverseLTetromino,
	verticalTetromino,
	squareTetromino,
];

export const spawnTetromino = (
	world: GridWorld,
	display: string,
	tallestPointSoFar: number
): Entity => {
	const asciiDisplayComponent = AsciiDisplayComponent.fromString(display);
	// Left edge should be two units away from the left wall
	// Bottom edge is three units above the tallest point
	const spawnPosition = new Vec2(
		-1,
		tallestPointSoFar - 3 - asciiDisplayComponent.sprite.boundingBox.height
	);
	return world.spawn(
		new TetrominoComponent(),
		new PositionComponent(spawnPosition),
		asciiDisplayComponent,
		ColliderComponent.fromRender(asciiDisplayComponent.sprite)
	);
};

export const spawnTetrisArea = (world: GridWorld): void => {
	const baseLine = 0;
	const width = 3;
	spawnWall(world, new Vec2(-width, baseLine), new Vec2(width, baseLine)); // Bottom
	spawnWall(world, new Vec2(-width - 1, baseLine), new Vec2(-width - 1, -Infinity)); // Left
	spawnWall(world, new Vec2(width + 1, baseLine), new Vec2(width + 1, -Infinity)); // Right
};

/**
 * This solution is not optimal at all, but it's not meant to be. I'm just
 * playing around this ECS system I created.
 */
export const p1 = async (input: string): Promise<number> => {
	const inputCommands = split(input)[0].split('');

	let i = 0;
	let tallestPoint = 0;
	let currentShape = 0;

	const world = new GridWorld({
		executorHaltCondition: (w) =>
			w.query(TetrominoComponent, StaticPositionComponent).length === 2022,
		executorSpeed: process.env.RUN ? 60 : 'instant',
		io: process.env.RUN ? 'terminalKit' : undefined,
	});

	const spawnNextTetromino = (): Entity => {
		const entity = spawnTetromino(world, tetrominoOrder[currentShape], tallestPoint);
		currentShape = (currentShape + 1) % tetrominoOrder.length;
		return entity;
	};

	spawnTetrisArea(world);
	const firstTetromino = spawnNextTetromino();
	world.centerCameraOnEntity(firstTetromino);

	// Spawn system
	world.addSystem((w) => {
		if (w.query(PositionComponent, TetrominoComponent).length === 0) {
			const entity = spawnNextTetromino();
			w.centerCameraOnEntity(entity);
		}
	});

	// Fall system
	world.addSystem((w, t) => {
		if (t.tick % 2 === 0) {
			const [fallingTetrominoEntity, positionComponent] = w.queryOne(
				PositionComponent,
				TetrominoComponent
			);

			if (!positionComponent.move(Direction.SOUTH)) {
				fallingTetrominoEntity.freezePosition();
				tallestPoint =
					positionComponent.position.y < tallestPoint
						? positionComponent.position.y
						: tallestPoint;
			}
		}
	});

	// input handling/lateral move system
	world.addSystem((w, t) => {
		if (t.tick % 2 === 1) {
			const fallingTetrominoes = w.query(PositionComponent, TetrominoComponent);
			const currentInputCommand = inputCommands[i % inputCommands.length];
			i++;

			if (currentInputCommand === '>') {
				for (const [_e, fallingTetrominoPosition] of fallingTetrominoes) {
					fallingTetrominoPosition.move(Direction.EAST);
				}
			} else if (currentInputCommand === '<') {
				for (const [_e, fallingTetrominoPosition] of fallingTetrominoes) {
					fallingTetrominoPosition.move(Direction.WEST);
				}
			}
		}
	});

	await world.run();

	return -tallestPoint;
};

await task(p1, packageJson.aoc, 'example.1.txt'); // 0 ~0ms
