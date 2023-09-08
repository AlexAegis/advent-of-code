import { Direction, Interval, max } from '../../index.js';
import { Vec2 } from './vec2.class.js';
import type { Vec2Like } from './vec2.class.types.js';

export type BoundingBoxCorner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

/**
 * TODO: Rename to Area
 *
 * It consists of two closed intervals from left to right and bottom to top
 *
 * It uses a screen coordinate system where 0,0 is at the top left, and Y
 * grows downwards. This means top is the smallest Y value and bottom is the
 * largest
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
	private _finiteAnchorCorner: Vec2 = Vec2.ORIGIN;
	private _finiteAnchorCornerName: BoundingBoxCorner | undefined = undefined;

	constructor(horizontal: Interval, vertical: Interval) {
		this.horizontal = horizontal;
		this.vertical = vertical;
		this.deriveFromIntervals();
	}

	/**
	 * Combines multiple boundingBoxes together
	 */
	static combine(boxes: BoundingBox[]): BoundingBox {
		return BoundingBox.fromVectors(boxes.flatMap((box) => [box.topLeft, box.bottomRight]));
	}

	combine(...other: BoundingBox[]): BoundingBox {
		return BoundingBox.combine([this, ...other]);
	}

	static getBoxIntervalsFromVectors(vectors: Vec2Like[]): {
		vertical: Interval;
		horizontal: Interval;
	} {
		let minX = Number.POSITIVE_INFINITY;
		let minY = Number.POSITIVE_INFINITY;
		let maxX = Number.NEGATIVE_INFINITY;
		let maxY = Number.NEGATIVE_INFINITY;
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

		return {
			horizontal: Interval.closed(minX, maxX),
			vertical: Interval.closed(minY, maxY),
		};
	}

	/**
	 * The normal state of a box is when it's anchor is at the origin.
	 */
	normalize(): this {
		return this.moveAnchorTo(Vec2.ORIGIN);
	}

	/**
	 * The order of anchors from most significant to least significant.
	 */
	anchors(): [Vec2, Vec2, Vec2, Vec2] {
		return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
	}

	/**
	 * Returns a finite point that can act as an anchor. It searches for a
	 * finite corner clockwise starting from topLeft. If neither are fully
	 * finite it finds the first partially infinite point. If all corners are
	 * fully infinite then the origin point will be returned instead.
	 */
	private findFirstFiniteAnchor(): Vec2 {
		return (
			this.anchors().find((anchor) => anchor.isFinite()) ??
			this.anchors().find((anchor) => anchor.isFinite(true)) ??
			Vec2.ORIGIN
		);
	}

	findCornerName(corner: Vec2): BoundingBoxCorner | undefined {
		if (this._topLeft.equals(corner)) {
			return 'topLeft';
		} else if (this._topRight.equals(corner)) {
			return 'topRight';
		} else if (this._bottomLeft.equals(corner)) {
			return 'bottomLeft';
		} else if (this._bottomRight.equals(corner)) {
			return 'bottomRight';
		} else {
			return undefined;
		}
	}

	private reinitializeFromVectors(vectors: Vec2Like[]): void {
		const { horizontal, vertical } = BoundingBox.getBoxIntervalsFromVectors(vectors);
		this.horizontal = horizontal;
		this.vertical = vertical;
		this.deriveFromIntervals();
	}

	/**
	 * If after an operation the corners could be left in an incorrect state,
	 * this recalculates the boundary based on the most significant corners.
	 */
	private deriveFromIntervals(): void {
		this._topLeft = new Vec2(this.left, this.top);
		this._topRight = new Vec2(this.right, this.top);
		this._bottomLeft = new Vec2(this.left, this.bottom);
		this._bottomRight = new Vec2(this.right, this.bottom);

		this._finiteAnchorCorner = this.findFirstFiniteAnchor();
		this._finiteAnchorCornerName = this.findCornerName(this._finiteAnchorCorner);

		if (
			Math.abs(this.left) === Number.POSITIVE_INFINITY ||
			Math.abs(this.right) === Number.POSITIVE_INFINITY ||
			Math.abs(this.bottom) === Number.POSITIVE_INFINITY ||
			Math.abs(this.top) === Number.POSITIVE_INFINITY
		) {
			this._center = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
			this._size = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
		} else {
			this._size = new Vec2(this.horizontal.length, this.vertical.length);
			this._center = new Vec2(
				this.left + Math.floor(this.width / 2),
				this.top + Math.floor(this.height / 2),
			);
		}
	}

	get anchor(): Vec2 {
		return this._finiteAnchorCorner;
	}

	get anchorName(): BoundingBoxCorner | undefined {
		return this._finiteAnchorCornerName;
	}

	resizeFromTopleft(size: Vec2Like): void {
		this.reinitializeFromVectors([this.topLeft, this.topLeft.add(size)]);
	}

	*rows(): Generator<number> {
		for (let y = this.bottom; y <= this.top; y++) {
			yield y;
		}
	}

	forEach(callback: (x: number, y: number) => void, resolution = 1): void {
		if (this.isFinite()) {
			for (let y = this.top; y <= this.bottom; y += resolution) {
				for (let x = this.left; x <= this.right; x += resolution) {
					callback(x, y);
				}
			}
		}
	}

	map<T>(mapFn: (x: number, y: number) => T): T[] {
		if (this.isFinite()) {
			const result: T[] = [];
			for (let y = this.top; y <= this.bottom; y += 1) {
				for (let x = this.left; x <= this.right; x += 1) {
					result.push(mapFn(x, y));
				}
			}
			return result;
		} else {
			return [];
		}
	}

	every(predicate: (x: number, y: number) => boolean): boolean {
		if (this.isFinite()) {
			let result = true;
			for (let y = this.top; y <= this.bottom; y += 1) {
				for (let x = this.left; x <= this.right; x += 1) {
					result = result && predicate(x, y);
				}
			}
			return result;
		} else {
			return false;
		}
	}

	some(predicate: (x: number, y: number) => boolean): boolean {
		if (this.isFinite()) {
			for (let y = this.top; y <= this.bottom; y += 1) {
				for (let x = this.left; x <= this.right; x += 1) {
					if (predicate(x, y)) {
						return true;
					}
				}
			}
		}

		return false;
	}

	*walkCells(resolution = 1): Generator<Vec2> {
		if (this.isFinite()) {
			for (let y = this.top; y <= this.bottom; y += resolution) {
				for (let x = this.left; x <= this.right; x += resolution) {
					yield new Vec2(x, y);
				}
			}
		}
	}

	isFinite(): boolean {
		return (
			Number.isFinite(this.top) &&
			Number.isFinite(this.right) &&
			Number.isFinite(this.bottom) &&
			Number.isFinite(this.left)
		);
	}

	/**
	 * Returns another, finite boundingBox based on this one. If this is finite,
	 * the result is the clone of this box. If not, it tries to construct one
	 * based on the finite anchor points.
	 *
	 * - If no anchor points are finite it returns undefined.
	 * - If only one is finite then it returns a bounding box of size one at
	 *   that point.
	 * - If two points are finite, a line-like box is returned at the finite
	 *   edge
	 *
	 * Optionally Infiniteness can be truncated to get a boundingBox.
	 *
	 * If the side of the truncating box that is being used is also Inifinite,
	 * it will be ignored.
	 */
	asFinite(truncateWith?: BoundingBox): BoundingBox {
		// Todo, check finiteness more granularly, it's enough that opposite sides are different
		if (truncateWith?.isFinite()) {
			const intersection = this.intersection(truncateWith);
			if (intersection) {
				return intersection;
			}
		}

		return this.isFinite()
			? this.clone()
			: BoundingBox.fromVectors(
					[this.topLeft, this.topRight, this.bottomLeft, this.bottomRight].filter(
						(anchor) => anchor.isFinite(),
					),
			  );
	}

	createBlankMatrix(): undefined[][];
	createBlankMatrix<T>(map: (position: Vec2) => T): T[][];
	createBlankMatrix<T>(map?: (position: Vec2) => T): (T | undefined)[][] {
		if (this.isFinite()) {
			return Array.from({ length: this.height }, (_e, y) =>
				Array.from({ length: this.width }, (_e, x) => map?.(new Vec2(x, y)) ?? undefined),
			);
		} else {
			// Else only compile the first row
			let row: (T | undefined)[] = [];
			if (this.topLeft.isFinite() && this.topRight.isFinite()) {
				row = this.horizontal.map((x) => map?.(new Vec2(x, this.top)) ?? undefined);
			} else if (this.bottomLeft.isFinite() && this.bottomRight.isFinite()) {
				row = this.horizontal.map((x) => map?.(new Vec2(x, this.bottom)) ?? undefined);
			} else if (this.bottomLeft.isFinite() && this.topLeft.isFinite()) {
				row = this.vertical.map((y) => map?.(new Vec2(this.left, y)) ?? undefined);
			} else if (this.bottomRight.isFinite() && this.topRight.isFinite()) {
				row = this.vertical.map((y) => map?.(new Vec2(this.right, y)) ?? undefined);
			}
			return [row];
		}
	}

	renderIntoVectors(): Vec2[] {
		return [...this.walkCells()];
	}

	centerOn(on: Vec2): void {
		this.moveTopLeftTo(on.sub(this.center));
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

	intersection(other: BoundingBox): BoundingBox | undefined {
		const horizontalIntersection = this.horizontal.intersection(other.horizontal);
		const verticalIntersection = this.vertical.intersection(other.vertical);
		return horizontalIntersection && verticalIntersection
			? new BoundingBox(horizontalIntersection, verticalIntersection)
			: undefined;
	}
	/*
	subtract(other: BoundingBox): BoundingBox[] {

	}

	difference(other: BoundingBox): {
		from: BoundingBox[];
		to: BoundingBox[];
		intersection: BoundingBox | undefined;
	} {
		const intersection = this.intersection(other);

		if (intersection) {


			return {
				from: [],
				to: [],
				intersection,
			};
		} else {
			return { from: [this], to: [other], intersection: undefined };
		}
	}*/

	intersects(other: BoundingBox): boolean {
		return (
			Interval.intersects(this.horizontal, other.horizontal) &&
			Interval.intersects(this.vertical, other.vertical)
		);
	}

	static fromVectors(vectors: Vec2Like[]): BoundingBox {
		const { horizontal, vertical } = BoundingBox.getBoxIntervalsFromVectors(vectors);
		return new BoundingBox(horizontal, vertical);
	}

	static fromSize(size: Vec2Like): BoundingBox {
		const { horizontal, vertical } = BoundingBox.getBoxIntervalsFromVectors([
			Vec2.ORIGIN,
			size,
		]);
		return new BoundingBox(horizontal, vertical);
	}

	static fromLength(length: number): BoundingBox {
		const { horizontal, vertical } = BoundingBox.getBoxIntervalsFromVectors([
			Vec2.ORIGIN,
			new Vec2(length, length),
		]);
		return new BoundingBox(horizontal, vertical);
	}

	static fromMatrix<M>(matrix: M[][]): BoundingBox {
		const anchors = [Vec2.ORIGIN, Vec2.ORIGIN];
		if (matrix.length > 0) {
			const width = matrix.map((row) => row.length).reduce(max);
			anchors[1] = new Vec2(width - 1, matrix.length - 1);
		}
		const { horizontal, vertical } = BoundingBox.getBoxIntervalsFromVectors(anchors);
		return new BoundingBox(horizontal, vertical);
	}

	clampInto(position: Vec2): Vec2 {
		if (this.contains(position)) {
			return position;
		} else {
			const x = this.horizontal.clampInto(position.x);
			const y = this.vertical.clampInto(position.y);
			return new Vec2(x, y);
		}
	}

	get top(): number {
		return this.vertical.low;
	}

	get bottom(): number {
		return this.vertical.high;
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

	contains(vec: Vec2Like): boolean;
	contains(x: number, y: number): boolean;
	contains(x: Vec2Like | number, y?: number): boolean {
		return typeof x === 'object'
			? Vec2.isWithin(x, this)
			: this.horizontal.contains(x) && y !== undefined && this.vertical.contains(y);
	}

	/**
	 * Applies an offset vector to all points of the boundary
	 * @param offset
	 */
	offset(offset: Vec2Like): this {
		this.horizontal.moveBy(offset.x);
		this.vertical.moveBy(offset.y);
		this.deriveFromIntervals();
		return this;
	}

	moveAnchorTo(to: Vec2Like): this {
		return this._finiteAnchorCornerName
			? this.moveCornerTo(this._finiteAnchorCornerName, to)
			: this;
	}

	moveCornerTo(corner: BoundingBoxCorner, to: Vec2Like): this {
		switch (corner) {
			case 'topLeft': {
				return this.moveTopLeftTo(to);
			}
			case 'topRight': {
				return this.moveTopRightTo(to);
			}
			case 'bottomRight': {
				return this.moveBottomRightTo(to);
			}
			case 'bottomLeft': {
				return this.moveBottomLeftTo(to);
			}
			default: {
				throw new Error(`Not a valid corner! ${String(corner)}`);
			}
		}
	}

	moveTopLeftTo(to: Vec2Like): this {
		this.horizontal.moveLowTo(to.x);
		this.vertical.moveLowTo(to.y);
		this.deriveFromIntervals();
		return this;
	}

	moveTopRightTo(to: Vec2Like): this {
		this.horizontal.moveHighTo(to.x);
		this.vertical.moveLowTo(to.y);
		this.deriveFromIntervals();
		return this;
	}

	moveBottomLeftTo(to: Vec2Like): this {
		this.horizontal.moveLowTo(to.x);
		this.vertical.moveHighTo(to.y);
		this.deriveFromIntervals();
		return this;
	}

	moveBottomRightTo(to: Vec2Like): this {
		this.horizontal.moveHighTo(to.x);
		this.vertical.moveHighTo(to.y);
		this.deriveFromIntervals();
		return this;
	}

	/**
	 * Extends or shrinks the box on all corners, the center does not change
	 */
	pad(horizontalPadding: number, verticalPadding = horizontalPadding): void {
		this.horizontal.pad(horizontalPadding);
		this.vertical.pad(verticalPadding);
		this.deriveFromIntervals();
	}

	extend(vectors: Vec2Like[]): this {
		this.reinitializeFromVectors([this.topLeft, this.bottomRight, ...vectors]);
		return this;
	}

	getEdge(direction: Direction): Vec2[] {
		if (direction.equals(Direction.NORTH)) {
			return this.getTopEdge();
		} else if (direction.equals(Direction.SOUTH)) {
			return this.getBottomEdge();
		} else if (direction.equals(Direction.WEST)) {
			return this.getLeftEdge();
		} else if (direction.equals(Direction.EAST)) {
			return this.getRightEdge();
		} else {
			throw new Error('Non-valid direction');
		}
	}

	getTopEdge(): Vec2[] {
		return this.horizontal.collectValues().map((n) => new Vec2(n, this.top));
	}
	getRightEdge(): Vec2[] {
		return this.vertical.collectValues().map((n) => new Vec2(this.right, n));
	}

	getBottomEdge(): Vec2[] {
		return this.horizontal
			.collectValues()
			.map((n) => new Vec2(n, this.bottom))
			.reverse();
	}

	getLeftEdge(): Vec2[] {
		return this.vertical
			.collectValues()
			.map((n) => new Vec2(this.left, n))
			.reverse();
	}

	clone(): BoundingBox {
		return BoundingBox.fromVectors([this.topLeft, this.bottomRight]);
	}

	toString(): string {
		return `{ horizontal: ${this.horizontal.toString()}, vertical: ${this.vertical.toString()} }`;
	}
}
