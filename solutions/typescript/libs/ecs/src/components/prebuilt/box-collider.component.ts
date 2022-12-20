import { BoundingBox, Vec2, Vec2Like } from '@alexaegis/advent-of-code-lib';
import type { Sprite } from '../../renderer/sprite.class.js';
import { Component } from '../component.class.js';

export class BoxColliderComponent extends Component {
	constructor(private readonly colliders: BoundingBox[]) {
		super();
	}

	fromRender(
		render: Sprite,
		cellCollides: (tile: string) => boolean = (tile) => tile !== ' ' && tile !== '.'
	): BoxColliderComponent {
		const boundingBoxes = [];
		if (render.matrix.every((row) => row.every(cellCollides))) {
			boundingBoxes.push(render.boundingBox);
		} else {
			// ? Not the best optimization, but fine enough for now, at least it's accurate
			for (let y = 0; y < render.matrix.length; y++) {
				const renderRow = render.matrix[y];
				if (renderRow.every(cellCollides)) {
					boundingBoxes.push(
						new BoundingBox([new Vec2(0, y), new Vec2(renderRow.length, y)])
					);
				} else {
					for (let x = 0; x < renderRow.length; x++) {
						const cell = renderRow[y];
						if (cellCollides(cell)) {
							boundingBoxes.push(new BoundingBox([new Vec2(x, y)]));
						}
					}
				}
			}
		}

		return new BoxColliderComponent(boundingBoxes);
	}

	fromBoundingBoxes(...colliders: BoundingBox[]): BoxColliderComponent {
		return new BoxColliderComponent(colliders);
	}

	intersectsWithPoint(point: Vec2Like): boolean {
		return this.colliders.some((collider) => collider.contains(point));
	}

	intersectsWithBoundingBox(box: BoundingBox): boolean {
		return this.colliders.some((collider) => collider.intersects(box));
	}
}
