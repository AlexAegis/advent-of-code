import { task } from '@alexaegis/advent-of-code-lib';
import { StaticPositionComponent } from '@alexaegis/ecs';
import packageJson from '../package.json' assert { type: 'json' };
import { createSandWorld, SandKindComponent } from './sand-world.class.js';

export const p2 = (input: string): number => {
	const world = createSandWorld(input);

	while (!world.systemsSettled) {
		world.tick();
	}

	return world.query(StaticPositionComponent, SandKindComponent).length;
};

await task(p2, packageJson.aoc, 'example.1.txt'); // 25434 ~0ms
