import {
	arrayContains,
	BoundingBox,
	Vec2,
	Vec2Like,
	Vec2String,
} from '@alexaegis/advent-of-code-lib';
import type { Sprite } from '../../renderer/sprite.class.js';
import { Component } from '../component.class.js';

export class CellColliderComponent extends Component {
	constructor(public readonly colliders: Vec2[]) {
		super();
	}

	static unit = CellColliderComponent.fromBoundingBoxes(BoundingBox.fromLength(0));

	static fromRender(
		render: Sprite,
		cellCollides: (tile: string) => boolean = (tile) => tile !== ' ' && tile !== '.'
	): CellColliderComponent {
		const colliders: Vec2[] = [];

		render.forEach((position, cell) => {
			if (cellCollides(cell)) {
				colliders.push(position);
			}
		});

		return new CellColliderComponent(colliders);
	}

	static fromBoundingBoxes(...colliderBoxes: BoundingBox[]): CellColliderComponent {
		return new CellColliderComponent(
			colliderBoxes.flatMap((colliderBox) => colliderBox.renderIntoVectors())
		);
	}

	collidesWith(point: Vec2Like | Vec2String): boolean {
		return arrayContains(this.colliders, point);
	}
}
