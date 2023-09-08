import { BoundingBox, Vec2 } from '@alexaegis/advent-of-code-lib';
import {
	AsciiDisplayComponent,
	ColliderComponent,
	Component,
	StaticPositionComponent,
} from '../../components/index.js';
import type { GridWorld } from '../../world/grid-world.class.js';
import type { Entity } from '../entity.class.js';

export class WallMarkerComponent extends Component {}

export const spawnWall = (world: GridWorld, from: Vec2, to: Vec2): Entity => {
	const worldBox = BoundingBox.fromVectors([from, to]);
	const localBox = worldBox.clone().normalize();
	return world.spawn(
		new WallMarkerComponent(),
		new StaticPositionComponent(worldBox.anchor, 0),
		AsciiDisplayComponent.fromString('#', {
			size: localBox,
			defaultBackgroundColor: 'black',
			defaultForegroundColor: 'gray',
		}),
		ColliderComponent.fromBoundingBoxes(localBox),
	);
};
