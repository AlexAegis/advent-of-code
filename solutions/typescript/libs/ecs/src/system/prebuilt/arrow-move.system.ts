import { Direction } from '@alexaegis/advent-of-code-lib';
import { PositionComponent } from '../../components/prebuilt/position.component.js';
import { BasicController } from '../../controller/controller.system.js';
import type { Entity, GridWorld } from '../../index.js';

export const addArrowMoveSystem = (world: GridWorld, entity: Entity): void => {
	if (world.io) {
		const controller = new BasicController(world.io, entity, {
			UP: (target) => {
				const position = target.getComponent(PositionComponent);
				position?.move(Direction.NORTH);
			},
			LEFT: (target) => {
				const position = target.getComponent(PositionComponent);
				position?.move(Direction.WEST);
			},
			DOWN: (target) => {
				const position = target.getComponent(PositionComponent);
				position?.move(Direction.SOUTH);
			},
			RIGHT: (target) => {
				const position = target.getComponent(PositionComponent);
				position?.move(Direction.EAST);
			},
		});

		world.addSystem(controller);
	}
};
