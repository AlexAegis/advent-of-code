import { BoundingBox, type Vec2, type Vec2Like } from '@alexaegis/advent-of-code-lib';
import { AsciiDisplayComponent } from '../../components/prebuilt/ascii-display.component.js';
import { StaticPositionComponent } from '../../components/prebuilt/position.component.js';
import { Component, GridWorld } from '../../index.js';
import type { Entity } from '../entity.class.js';

export class FloorMarkerComponent extends Component {}

export const spawnFloor = (world: GridWorld, at: Vec2, size: Vec2Like): Entity =>
	world.spawn(
		new FloorMarkerComponent(),
		new StaticPositionComponent(at, -1),
		AsciiDisplayComponent.fromMatrix(
			BoundingBox.fromSize(size).createBlankMatrix(() => `░`),
			{
				defaultBackgroundColor: 'green',
				defaultForegroundColor: 'brightGreen',
			}
		)
	);
