import { split, task, Vec2 } from '@alexaegis/advent-of-code-lib';
import {
	AsciiDisplayComponent,
	GridWorld,
	PositionComponent,
	spawnCompass,
	spawnWall,
} from '@alexaegis/ecs';
import packageJson from '../package.json' assert { type: 'json' };

const lineTetronimo = '####';

export const spawnTetronimo = (world: GridWorld): void => {
	world.spawn(
		new PositionComponent(new Vec2(2, 2)),
		AsciiDisplayComponent.fromString(lineTetronimo)
	);
};

export const p1 = async (input: string): Promise<number> => {
	const inputCommands = split(input)[0].split('');
	console.log('lines', inputCommands);

	// 7 wide
	const world = new GridWorld({ executorHaltCondition: 'none', executorSpeed: 5, io: 'console' });
	// spawnTetronimo(world);
	spawnWall(world, new Vec2(-3, 0), new Vec2(3, 0)); // Bottom
	spawnWall(world, new Vec2(-3, 0), new Vec2(-3, -Infinity)); // Left
	spawnWall(world, new Vec2(3, 0), new Vec2(3, -Infinity)); // Right
	spawnCompass(world);
	world.centerCameraOnEntities();
	await world.run();

	return 0;
};

await task(p1, packageJson.aoc, 'example.1.txt'); // 0 ~0ms
