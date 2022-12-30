import { Direction } from '@alexaegis/advent-of-code-lib';
import { PositionComponent } from '../../components/prebuilt/position.component.js';
import { BasicController } from '../../controller/controller.system.js';
import type { Entity, GridWorld } from '../../index.js';

export const addWasdMoveSystem = (world: GridWorld, entity: Entity): void => {
	if (world.io) {
		const controller = new BasicController(world.io, entity, {
			w: (target) => {
				const position = target.getComponent(PositionComponent);
				position?.move(Direction.NORTH);
			},
			a: (target) => {
				const position = target.getComponent(PositionComponent);
				position?.move(Direction.WEST);
			},
			s: (target) => {
				const position = target.getComponent(PositionComponent);
				position?.move(Direction.SOUTH);
			},
			d: (target) => {
				const position = target.getComponent(PositionComponent);
				position?.move(Direction.EAST);
			},
		});

		world.addSystem(controller);
	}
};
