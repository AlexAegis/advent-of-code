import { Vec2 } from '@alexaegis/advent-of-code-lib';
import { AsciiDisplayComponent } from '../../components/prebuilt/ascii-display.component.js';
import { PositionComponent } from '../../components/prebuilt/position.component.js';
import { addWasdMoveSystem, ColliderComponent, Component, type GridWorld } from '../../index.js';
import type { Entity } from '../entity.class.js';

export class PlayerMarkerComponent extends Component {}

export const spawnPlayer = (
	world: GridWorld,
	startingPosition: Vec2 = Vec2.ORIGIN.clone()
): Entity => {
	const playerEntity = world.spawn(
		new PlayerMarkerComponent(),
		new PositionComponent(startingPosition),
		AsciiDisplayComponent.fromString('ඞ', { defaultForegroundColor: 'white' }),
		ColliderComponent.unit
	);

	addWasdMoveSystem(world, playerEntity);

	return playerEntity;
};
