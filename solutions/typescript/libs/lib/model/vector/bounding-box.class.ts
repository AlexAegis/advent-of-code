import { Interval, max } from '../../index.js';
import { Vec2 } from './vec2.class.js';
import type { Vec2Like } from './vec2.class.types.js';

/**
 * It consists of two closed intervals from left to right and bottom to top
 *
 * TODO: Investigate if Y flipping is needed
 */
export class BoundingBox {
	/**
	 * from left to right
	 */
	horizontal: Interval = Interval.EMPTY;

	/**
	 * From bottom to top
	 */
	vertical: Interval = Interval.EMPTY;

	private _size: Vec2 = Vec2.ORIGIN;
	private _center: Vec2 = Vec2.ORIGIN;
	private _topLeft: Vec2 = Vec2.ORIGIN;
	private _topRight: Vec2 = Vec2.ORIGIN;
	private _bottomLeft: Vec2 = Vec2.ORIGIN;
	private _bottomRight: Vec2 = Vec2.ORIGIN;

	constructor(vectors: Vec2Like[]) {
		this.calc(vectors);
	}

	private calc(vectors: Vec2Like[]): void {
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

		this.horizontal = Interval.closed(minX, maxX);
		this.vertical = Interval.closed(minY, maxY);

		this.recalc();
	}

	/**
	 * If after an operation the corners could be left in an incorrect state,
	 * this recalculates the boundary based on the most significant corners.
	 */
	private recalc(): void {
		this._topLeft = new Vec2(this.left, this.top);
		this._topRight = new Vec2(this.right, this.top);
		this._bottomLeft = new Vec2(this.left, this.bottom);
		this._bottomRight = new Vec2(this.right, this.bottom);

		if (
			Math.abs(this.left) === Infinity ||
			Math.abs(this.right) === Infinity ||
			Math.abs(this.bottom) === Infinity ||
			Math.abs(this.top) === Infinity
		) {
			this._center = new Vec2(Infinity, Infinity);
			this._size = new Vec2(Infinity, Infinity);
		} else {
			this._size = this.topRight.sub(this.bottomLeft);
			this._center = new Vec2(
				this.left + Math.floor(this.width / 2),
				this.bottom + Math.floor(this.height / 2)
			);
		}
	}

	*rows(): Generator<number> {
		for (let y = this.bottom; y <= this.top; y++) {
			yield y;
		}
	}

	*walkCells(resolution = 1): Generator<Vec2> {
		for (let y = this.bottom; y <= this.top; y += resolution) {
			for (let x = this.left; x <= this.right; x += resolution) {
				yield new Vec2(x, y);
			}
		}
	}

	createBlankMatrix(): undefined[][];
	createBlankMatrix<T>(map: (position: Vec2) => T): T[][];
	createBlankMatrix<T>(map?: (position: Vec2) => T): (T | undefined)[][] {
		return Array.from({ length: this.height }, (_e, y) =>
			Array.from({ length: this.width }, (_e, x) => map?.(new Vec2(x, y)) ?? undefined)
		);
	}

	get center(): Readonly<Vec2> {
		return this._center;
	}

	get size(): Vec2 {
		return this._size;
	}

	get topLeft(): Vec2 {
		return this._topLeft;
	}

	get topRight(): Vec2 {
		return this._topRight;
	}

	get bottomLeft(): Vec2 {
		return this._bottomLeft;
	}

	get bottomRight(): Vec2 {
		return this._bottomRight;
	}

	intersects(other: BoundingBox): boolean {
		return (
			Interval.intersects(this.horizontal, other.horizontal) &&
			Interval.intersects(this.vertical, other.vertical)
		);
	}

	static fromVectors(...vectors: Vec2Like[]): BoundingBox {
		return new BoundingBox(vectors);
	}

	static fromSize(size: Vec2Like): BoundingBox {
		return new BoundingBox([Vec2.ORIGIN, size]);
	}

	static fromMatrix<M>(matrix: M[][]): BoundingBox {
		const anchors = [Vec2.ORIGIN, Vec2.ORIGIN];
		if (matrix.length) {
			const width = matrix.map((row) => row.length).reduce(max);
			anchors[1] = new Vec2(width, matrix.length);
		}
		return new BoundingBox(anchors);
	}

	get top(): number {
		return this.vertical.high;
	}

	get bottom(): number {
		return this.vertical.low;
	}

	get left(): number {
		return this.horizontal.low;
	}

	get right(): number {
		return this.horizontal.high;
	}

	get height(): number {
		return this.vertical.length;
	}

	get width(): number {
		return this.horizontal.length;
	}

	contains(vec: Vec2Like): boolean {
		return Vec2.isWithin(vec, this);
	}

	/**
	 * Applies an offset vector to all points of the boundary
	 * @param offset
	 */
	offset(offset: Vec2Like): BoundingBox {
		this.horizontal.moveBy(offset.x);
		this.vertical.moveBy(offset.y);
		this.recalc();
		return this;
	}

	moveTopLeftTo(to: Vec2Like): BoundingBox {
		this.horizontal.moveLowTo(to.x);
		this.vertical.moveLowTo(to.y);
		this.recalc();
		return this;
	}

	moveTopRightTo(to: Vec2Like): BoundingBox {
		this.horizontal.moveHighTo(to.x);
		this.vertical.moveLowTo(to.y);
		this.recalc();
		return this;
	}

	moveBottomLeftTo(to: Vec2Like): BoundingBox {
		this.horizontal.moveLowTo(to.x);
		this.vertical.moveHighTo(to.y);
		this.recalc();
		return this;
	}

	moveBottomRightTo(to: Vec2Like): BoundingBox {
		this.horizontal.moveHighTo(to.x);
		this.vertical.moveHighTo(to.y);
		this.recalc();
		return this;
	}

	/**
	 * Extends or shrinks the box on all corners, the center does not change
	 *
	 * @param padding
	 */
	pad(padding: number): void {
		this.horizontal.low -= padding;
		this.horizontal.high += padding;
		this.vertical.low -= padding;
		this.vertical.high += padding;

		this.recalc();
	}

	extend(vectors: Vec2Like[]): BoundingBox {
		this.calc([this.topLeft, this.bottomRight, ...vectors]);
		return this;
	}

	clone(): BoundingBox {
		return BoundingBox.fromVectors(this.topLeft, this.bottomRight);
	}

	toString(): string {
		return `{ horizontal: ${this.horizontal.toString()}, vertical: ${this.vertical.toString()} }`;
	}
}
