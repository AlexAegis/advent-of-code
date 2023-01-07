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
	const [first, second] = Vec2.sort([from, to]);
	const normalizedTo = second.sub(first);
	const box = BoundingBox.fromVectors(Vec2.ORIGIN, normalizedTo);
	return world.spawn(
		new WallMarkerComponent(),
		new StaticPositionComponent(first, 0),
		AsciiDisplayComponent.fromString(`#`, box),
		ColliderComponent.fromBoundingBoxes(box)
	);
};
