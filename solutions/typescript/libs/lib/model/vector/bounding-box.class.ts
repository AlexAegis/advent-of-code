import { Vec2 } from './vec2.class.js';
import type { Vec2Like } from './vec2.class.types.js';

export class BoundingBox {
	topLeft: Vec2;
	topRight: Vec2;
	bottomRight: Vec2;
	bottomLeft: Vec2;
	size: Vec2;

	constructor(vectors: Vec2[]) {
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

		this.topLeft = new Vec2(minX, maxY);
		this.topRight = new Vec2(maxX, maxY);
		this.bottomLeft = new Vec2(minX, minY);
		this.bottomRight = new Vec2(maxX, minY);

		this.size = this.topRight.sub(this.bottomLeft);
	}

	static fromVectors(...vectors: Vec2[]): BoundingBox {
		return new BoundingBox(vectors);
	}

	get top(): number {
		return this.topLeft.y;
	}

	get bottom(): number {
		return this.bottomLeft.y;
	}

	get left(): number {
		return this.bottomLeft.x;
	}

	get right(): number {
		return this.bottomRight.x;
	}

	shift(offset: Vec2Like): void {
		this.topLeft.addMut(offset);
		this.topRight.addMut(offset);
		this.bottomLeft.addMut(offset);
		this.bottomRight.addMut(offset);
	}

	extend(padding: number): void {
		this.topLeft.addMut({ x: -padding, y: padding });
		this.topRight.addMut({ x: padding, y: padding });
		this.bottomLeft.addMut({ x: -padding, y: -padding });
		this.bottomRight.addMut({ x: padding, y: -padding });

		this.size.addMut({ x: padding, y: padding }, { times: 2 });
	}

	clone(): BoundingBox {
		return BoundingBox.fromVectors(
			this.topLeft,
			this.topRight,
			this.bottomLeft,
			this.bottomRight
		);
	}

	toString(): string {
		return `left: ${this.left}, top: ${this.top}, right: ${this.right}, bottom: ${this.bottom}`;
	}
}
