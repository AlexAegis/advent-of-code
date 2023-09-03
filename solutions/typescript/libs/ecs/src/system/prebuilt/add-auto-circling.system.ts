import { Direction } from '@alexaegis/advent-of-code-lib';
import { PositionComponent } from '../../components/prebuilt/position.component.js';
import type { Entity } from '../../entity/entity.class.js';
import type { GridWorld } from '../../world/grid-world.class.js';

export const addAutocirclingSystem = (world: GridWorld, entity: Entity): void => {
	let currentDirection = Direction.EAST;
	world.addSystem((_world, time) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const position = entity.getComponent(PositionComponent)!;
		position.move(currentDirection);
		if (time.tick % 3 === 0) {
			currentDirection = currentDirection.right();
		}

		return undefined;
	});
};
