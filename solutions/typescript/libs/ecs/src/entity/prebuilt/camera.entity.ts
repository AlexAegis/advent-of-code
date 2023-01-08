import { Vec2 } from '@alexaegis/advent-of-code-lib';
import type { CameraOptions } from '../../components/prebuilt/camera.component.options.js';
import { PositionComponent } from '../../components/prebuilt/position.component.js';
import { addArrowMoveSystem, CameraComponent, type GridWorld } from '../../index.js';
import { addCameraFollowSystem } from '../../system/prebuilt/camera-follow.system.js';
import type { Entity } from '../entity.class.js';

export const spawnCamera = (world: GridWorld, cameraOptions?: CameraOptions): Entity => {
	const cameraComponent = new CameraComponent(cameraOptions);
	const cameraEntity = world.spawn(cameraComponent, new PositionComponent(Vec2.ORIGIN.clone()));

	if (cameraOptions?.movable) {
		addArrowMoveSystem(world, cameraEntity);
		addCameraFollowSystem(world);
	}

	return cameraEntity;
};
