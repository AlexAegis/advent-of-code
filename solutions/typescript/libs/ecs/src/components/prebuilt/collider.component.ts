import { BoundingBox, Vec2, type Vec2Like } from '@alexaegis/advent-of-code-lib';
import type { Sprite } from '../../renderer/sprite.class.js';
import { SpatialComponent } from '../spatial-component.class.js';

export class ColliderComponent extends SpatialComponent {
	constructor(public readonly colliders: BoundingBox[]) {
		super();
	}

	static unit = ColliderComponent.fromBoundingBoxes(BoundingBox.fromLength(0));

	static fromRender(
		sprite: Sprite,
		tileCollides = (char: string) => char !== ' ' && char !== '.',
	): ColliderComponent {
		const boundingBoxes = [];
		if (sprite.boundingBox.every((x, y) => tileCollides(sprite.getTileAt(x, y)?.char ?? ' '))) {
			boundingBoxes.push(sprite.boundingBox);
		} else {
			// ? Not the best optimization, but fine enough for now, at least it's accurate
			for (let y = 0; y < sprite.render.length; y++) {
				const renderRow = sprite.render[y];
				if (renderRow) {
					if (renderRow.every((tile) => tileCollides(tile.char ?? ' '))) {
						boundingBoxes.push(
							BoundingBox.fromVectors([
								new Vec2(0, y),
								new Vec2(renderRow.length - 1, y),
							]),
						);
					} else {
						for (let x = 0; x < renderRow.length; x++) {
							const tile = renderRow[x];
							if (tileCollides(tile?.char ?? ' ')) {
								boundingBoxes.push(BoundingBox.fromVectors([new Vec2(x, y)]));
							}
						}
					}
				}
			}
		}

		return new ColliderComponent(boundingBoxes);
	}

	static fromBoundingBoxes(...colliders: BoundingBox[]): ColliderComponent {
		return new ColliderComponent(colliders);
	}

	area(position: Vec2): BoundingBox[] {
		return this.colliders.map((collider) => collider.clone().offset(position));
	}

	intersectsWithPoint(point: Vec2Like): boolean {
		return this.colliders.some((collider) => collider.contains(point));
	}

	intersectsWithBoundingBox(box: BoundingBox): boolean {
		return this.colliders.some((collider) => collider.intersects(box));
	}
}
