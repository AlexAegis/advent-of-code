import { Vec2 } from '@alexaegis/advent-of-code-lib';
import { PositionComponent } from '../../components/prebuilt/position.component.js';
import { addArrowMoveSystem, CameraComponent, type GridWorld } from '../../index.js';
import type { Entity } from '../entity.class.js';

export const spawnCamera = (world: GridWorld, movable = true): Entity => {
	const cameraComponent = new CameraComponent();
	const cameraEntity = world.spawn(cameraComponent, new PositionComponent(Vec2.ORIGIN.clone()));
	if (movable) {
		addArrowMoveSystem(world, cameraEntity);
	}

	return cameraEntity;
};
