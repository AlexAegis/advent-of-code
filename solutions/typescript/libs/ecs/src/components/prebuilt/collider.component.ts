import { BoundingBox, Vec2, Vec2Like } from '@alexaegis/advent-of-code-lib';
import type { Sprite } from '../../renderer/sprite.class.js';
import { SpatialComponent } from '../spatial-component.class.js';

export class ColliderComponent extends SpatialComponent {
	constructor(public readonly colliders: BoundingBox[]) {
		super();
	}

	static unit = ColliderComponent.fromBoundingBoxes(BoundingBox.fromLength(0));

	static fromRender(
		sprite: Sprite,
		_cellCollides: (tile: string) => boolean = (tile) => tile !== ' ' && tile !== '.'
	): ColliderComponent {
		// const boundingBoxes = [];
		// if (sprite.boundingBox.every((x, y) => cellCollides(sprite.getCellAt(x, y) ?? ' '))) {
		// 	boundingBoxes.push(sprite.boundingBox);
		// } else {
		// 	// ? Not the best optimization, but fine enough for now, at least it's accurate
		// 	for (let y = 0; y < sprite.render.length; y++) {
		// 		const renderRow = sprite.render[y];
		// 		if (renderRow.every(cellCollides)) {
		// 			boundingBoxes.push(
		// 				BoundingBox.fromVectors(new Vec2(0, y), new Vec2(renderRow.length, y))
		// 			);
		// 		} else {
		// 			for (let x = 0; x < renderRow.length; x++) {
		// 				const cell = renderRow[y];
		// 				if (cellCollides(cell)) {
		// 					boundingBoxes.push(BoundingBox.fromVectors(new Vec2(x, y)));
		// 				}
		// 			}
		// 		}
		// 	}
		// }

		return new ColliderComponent([sprite.boundingBox]);
	}

	static fromBoundingBoxes(...colliders: BoundingBox[]): ColliderComponent {
		return new ColliderComponent(colliders);
	}

	area(at: Vec2): BoundingBox[] {
		return this.colliders.map((collider) => collider.clone().moveAnchorTo(at));
	}

	intersectsWithPoint(point: Vec2Like): boolean {
		return this.colliders.some((collider) => collider.contains(point));
	}

	intersectsWithBoundingBox(box: BoundingBox): boolean {
		return this.colliders.some((collider) => collider.intersects(box));
	}
}
