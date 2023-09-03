import { task } from '@alexaegis/advent-of-code-lib';
import { StaticPositionComponent } from '@alexaegis/ecs';
import packageJson from '../package.json';
import {
	createSandWorld,
	SandKindComponent,
	SandSpawnerKindComponent,
} from './sand-world.class.js';

export const p1 = async (input: string): Promise<number> => {
	const world = createSandWorld(input);

	const treshhold = world.getVisibleEntityBoundingBox().bottom + 1;
	// Despawn and turn off the spawner when a sand entity reaches beyond the
	// last wall entity
	world.addSystem((world) => {
		let didSomething = false;

		for (const [sandEntity, positionComponent] of world.query(
			StaticPositionComponent,
			SandKindComponent,
		)) {
			if (positionComponent.position.y >= treshhold) {
				sandEntity.despawn();
				const [, sandspawnerData] = world.queryOne(SandSpawnerKindComponent);
				sandspawnerData.enabled = false;
				didSomething = false;
			}
		}
		return didSomething;
	});

	world.centerCameraOnEntities();

	await world.run();

	return world.query(SandKindComponent).length;
};

await task(p1, packageJson.aoc); // 665 ~109.35ms (example 24)
