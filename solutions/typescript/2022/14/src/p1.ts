import { task } from '@alexaegis/advent-of-code-lib';
import { StaticPositionComponent } from '@alexaegis/ecs';
import packageJson from '../package.json' assert { type: 'json' };
import {
	createSandWorld,
	SandKindComponent,
	SandSpawnerKindComponent,
} from './sand-world.class.js';

export const p1 = (input: string): number => {
	const world = createSandWorld(input);

	const treshhold = world.entityBoundingBox.topRight.y + 1;

	// Despawn and turn off the spawner when a sand entity reaches beyond the
	// last wall entity
	world.addSystem((world) => {
		let didSomething = false;

		for (const [sandEntity, positionComponent] of world.query(
			StaticPositionComponent,
			SandKindComponent
		)) {
			if (positionComponent.position.y === treshhold) {
				sandEntity.despawn();
				const [_e, sandspawnerData] = world.queryOne(SandSpawnerKindComponent);
				sandspawnerData.enabled = false;
				didSomething = true;
			}
		}
		return didSomething;
	});

	while (!world.systemsSettled) {
		world.tick();
	}

	return world.query(StaticPositionComponent, SandKindComponent).length;
};

await task(p1, packageJson.aoc); // 665 ~0ms (example 24)
