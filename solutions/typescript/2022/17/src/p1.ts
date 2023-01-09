import { split, task, Vec2 } from '@alexaegis/advent-of-code-lib';
import {
	AsciiDisplayComponent,
	ColliderComponent,
	GridWorld,
	PositionComponent,
	spawnFloor,
	spawnWall,
} from '@alexaegis/ecs';
import packageJson from '../package.json' assert { type: 'json' };

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

export const allTetrominos = {
	horizontalLineTetromino,
	crossTetromino,
	reverseLTetromino,
	verticalTetromino,
	squareTetromino,
};

export const spawnTetromino = (world: GridWorld, display: string): void => {
	const asciiDisplayComponent = AsciiDisplayComponent.fromString(display);
	world.spawn(
		new PositionComponent(new Vec2(2, 2)),
		asciiDisplayComponent,
		ColliderComponent.fromRender(asciiDisplayComponent.sprite)
	);
};

export const p1 = async (input: string): Promise<number> => {
	const inputCommands = split(input)[0].split('');
	console.log('lines', inputCommands);

	// 7 wide
	const world = new GridWorld({ executorHaltCondition: 'none', executorSpeed: 5, io: 'console' });
	// spawnTetronimo(world);

	const baseLine = 0;
	spawnFloor(world, new Vec2(-3, baseLine), new Vec2(3, baseLine - 4));
	spawnWall(world, new Vec2(-3, baseLine), new Vec2(3, baseLine)); // Bottom
	spawnWall(world, new Vec2(-3, baseLine), new Vec2(-3, -Infinity)); // Left
	spawnWall(world, new Vec2(3, baseLine), new Vec2(3, -Infinity)); // Right
	// spawnCompass(world);
	world.centerCameraOnEntities();

	await world.run();

	return 0;
};

await task(p1, packageJson.aoc, 'example.1.txt'); // 0 ~0ms
