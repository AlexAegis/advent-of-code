import { BoundingBox, Vec2, type Vec2Like } from '@alexaegis/advent-of-code-lib';
import { AsciiDisplayComponent } from '../../components/prebuilt/ascii-display.component.js';
import { StaticPositionComponent } from '../../components/prebuilt/position.component.js';
import { Component, GridWorld } from '../../index.js';
import type { Entity } from '../entity.class.js';

export class FloorMarkerComponent extends Component {}

export const spawnFloor = (world: GridWorld, from: Vec2, to: Vec2Like): Entity => {
	const worldBox = BoundingBox.fromVectors([from, to]);
	const localBox = worldBox.clone().normalize();

	return world.spawn(
		new FloorMarkerComponent(),
		new StaticPositionComponent(worldBox.anchor, -1),
		AsciiDisplayComponent.fromMatrix(
			localBox.createBlankMatrix(() => '░'),
			{
				defaultBackgroundColor: 'green',
				defaultForegroundColor: 'brightGreen',
			},
		),
	);
};
