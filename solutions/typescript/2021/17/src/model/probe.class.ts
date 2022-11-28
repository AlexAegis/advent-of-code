import type { BoundingBox } from '@alexaegis/advent-of-code-lib/model';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';

export class Probe {
	position = Vec2.ORIGIN.clone();

	constructor(public velocity = Vec2.ORIGIN.clone()) {}

	public step(): Vec2 {
		this.position.addMut(this.velocity);
		// Drag
		if (this.velocity.x > 0) {
			this.velocity.x = this.velocity.x - 1;
		} else if (this.velocity.x < 0) {
			this.velocity.x = this.velocity.x + 1;
		}
		// Gravity
		this.velocity.y = this.velocity.y - 1;
		return this.position.clone();
	}

	public isWithin(boundingBox: BoundingBox): boolean {
		return this.position.isWithin(boundingBox);
	}

	public isPastPoint(point: Vec2): boolean {
		return this.position.x > point.x || this.position.y < point.y;
	}
}
