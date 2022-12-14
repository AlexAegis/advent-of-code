import { Vec2 } from './vec2.class.js';
import type { Vec2Like } from './vec2.class.types.js';

export class BoundingBox {
	topLeft: Vec2;
	bottomRight: Vec2;
	size: Vec2;

	constructor(...vectors: Vec2[]) {
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;
		for (const vec of vectors) {
			if (vec.x < minX) {
				minX = vec.x;
			}
			if (vec.y < minY) {
				minY = vec.y;
			}
			if (vec.x > maxX) {
				maxX = vec.x;
			}
			if (vec.y > maxY) {
				maxY = vec.y;
			}
		}

		this.topLeft = new Vec2(minX, minY);
		this.bottomRight = new Vec2(maxX, maxY);
		this.size = this.bottomRight.sub(this.topLeft);
	}

	shift(offset: Vec2Like): void {
		this.topLeft.addMut(offset);
		this.bottomRight.addMut(offset);
	}

	extend(padding: number): void {
		this.topLeft.subMut({ x: padding, y: padding });
		this.bottomRight.addMut({ x: padding, y: padding });
		this.size.addMut({ x: padding, y: padding }, { times: 2 });
	}

	padding(padding: Vec2Like) {
		return new BoundingBox(this.topLeft.sub(padding), this.bottomRight.add(padding));
	}
}
