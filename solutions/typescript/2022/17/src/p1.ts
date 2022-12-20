import { split, task, Vec2 } from '@alexaegis/advent-of-code-lib';
import {
	AsciiDisplayComponent,
	GridWorld,
	PositionComponent,
	StaticPositionComponent,
} from '@alexaegis/ecs';
import packageJson from '../package.json' assert { type: 'json' };

const lineTetronimo = '####';

const spawnTetronimo = (world: GridWorld): void => {
	world.spawn(new PositionComponent(new Vec2(2, 2)), new AsciiDisplayComponent(lineTetronimo));
};

const spawnWall = (world: GridWorld, from: Vec2, to: Vec2): void => {
	for (const p of from.reach(to)) {
		world.spawn(new StaticPositionComponent(p), new AsciiDisplayComponent('+'));
	}
};

export const p1 = (input: string): number => {
	const inputCommands = split(input)[0].split('');
	console.log('lines', inputCommands);

	// 7 wide
	const world = new GridWorld();
	spawnTetronimo(world);
	spawnWall(world, new Vec2(-3, 0), new Vec2(3, 0)); // Bottom
	spawnWall(world, new Vec2(-3, 0), new Vec2(-3, 8)); // Left
	spawnWall(world, new Vec2(3, 0), new Vec2(3, 8)); // Right

	world.tick();
	world.print();
	return 0;
};

await task(p1, packageJson.aoc, 'example.1.txt'); // 0 ~0ms
