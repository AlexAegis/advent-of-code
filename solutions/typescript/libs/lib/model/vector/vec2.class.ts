import { gcd } from '../../math/common/gcd.function.js';
import { NUM } from '../../regex/index.js';
import { DirectionArrowSymbol } from '../direction/direction-arrow-symbol.enum.js';
import { DirectionCardinalGeographicLetter } from '../direction/direction-cardinal-geographic-letter.enum.js';
import { DirectionCardinalLiteralLetter } from '../direction/direction-cardinal-literal-letter.enum.js';
import { DirectionMarker, isDirectionMarker } from '../direction/direction-marker.type.js';
import type { BoundingBox } from './bounding-box.class.js';
import type { Vec2Like, Vec2String } from './vec2.class.types.js';

export class Vec2 implements Vec2Like {
	public static ORIGIN = Object.freeze(new Vec2(0, 0));

	/**
	 * ? Duplicated constructor signatures until https://github.com/microsoft/TypeScript/issues/14107
	 */
	public constructor(marker: DirectionMarker);
	public constructor(vec2: Vec2Like | Vec2String);
	public constructor(x: number, y: number);
	public constructor(x: number | Vec2String | Vec2Like | DirectionMarker, y?: number);
	public constructor(x: number | Vec2String | Vec2Like | DirectionMarker, y?: number) {
		if (typeof x === 'object') {
			this.x = x.x;
			this.y = x.y;
		} else if (typeof x === 'number' && typeof y === 'number') {
			this.x = x;
			this.y = y;
		} else if (typeof x === 'string') {
			// cannot reuse the Direction class due to circular imports
			if (isDirectionMarker(x)) {
				switch (x) {
					case DirectionArrowSymbol.NORTH:
					case DirectionCardinalLiteralLetter.NORTH:
					case DirectionCardinalGeographicLetter.NORTH:
						this.x = 0;
						this.y = 1;
						break;
					case DirectionArrowSymbol.EAST:
					case DirectionCardinalLiteralLetter.EAST:
					case DirectionCardinalGeographicLetter.EAST:
						this.x = 1;
						this.y = 0;
						break;
					case DirectionArrowSymbol.SOUTH:
					case DirectionCardinalLiteralLetter.SOUTH:
					case DirectionCardinalGeographicLetter.SOUTH:
						this.x = 0;
						this.y = -1;
						break;
					case DirectionArrowSymbol.WEST:
					case DirectionCardinalLiteralLetter.WEST:
					case DirectionCardinalGeographicLetter.WEST:
						this.x = -1;
						this.y = 0;
						break;
				}
			} else {
				[this.x, this.y] = (x.match(NUM) || []).map((s) => parseInt(s, 10));
			}
		}
	}

	public x!: number;
	public y!: number;

	public static compareColumnFirst(a: Vec2, b: Vec2): number {
		return a.x === b.x ? a.y - b.y : a.x - b.x;
	}

	/**
	 * Negative if b is before
	 */
	public static compareRowFirst(a: Vec2, b: Vec2): number {
		return a.y === b.y ? a.x - b.x : a.y - b.y;
	}

	public compareColumnFirst(o: Vec2): number {
		return Vec2.compareColumnFirst(this, o);
	}

	public compareRowFirst(o: Vec2): number {
		return Vec2.compareRowFirst(this, o);
	}

	public static isWithin(v: Vec2Like, area: BoundingBox): boolean {
		// TODO: use intervals
		return (
			Math.min(area.topLeft.x, area.bottomRight.x) <= v.x &&
			v.x <= Math.max(area.topLeft.x, area.bottomRight.x) &&
			Math.min(area.topLeft.y, area.bottomRight.y) <= v.y &&
			v.y <= Math.max(area.topLeft.y, area.bottomRight.y)
		);
	}

	public isWithin(area: BoundingBox): boolean {
		return Vec2.isWithin(this, area);
	}

	public clamp(area: BoundingBox): Vec2 {
		// TODO: use intervals, it does not respect openness
		const xMax = Math.max(area.topLeft.x, area.bottomRight.x);
		const yMax = Math.max(area.topLeft.y, area.bottomRight.y);
		const xMin = Math.min(area.topLeft.x, area.bottomRight.x);
		const yMin = Math.min(area.topLeft.y, area.bottomRight.y);

		if (this.x > xMax) {
			this.x = xMax;
		} else if (this.x < xMin) {
			this.x = xMin;
		}

		if (this.y > yMax) {
			this.y = yMax;
		} else if (this.y < yMin) {
			this.y = yMin;
		}

		return this;
	}

	public add(
		coord: Vec2Like,
		options?: {
			times?: number;
			limit?: BoundingBox | ((v: Vec2Like) => boolean);
		}
	): Vec2 {
		return this.clone().addMut(coord, options);
	}

	*generateVectorsAroundInManhattanRadius(radius: number): Generator<Vec2> {
		if (radius === 0) {
			yield this;
			return;
		}

		const leftEdge = this.x - radius;
		const rightEdge = this.x + radius;

		yield new Vec2(leftEdge, this.y); // left
		yield new Vec2(rightEdge, this.y); // right
		yield new Vec2(this.x, this.y + radius); // top
		yield new Vec2(this.x, this.y - radius); // bottom

		// all edges at once
		for (let i = leftEdge + 1; i < this.x; i++) {
			const yDiff = i - leftEdge;
			yield new Vec2(leftEdge + i, this.y + yDiff);
			yield new Vec2(leftEdge + i, this.y - yDiff);
			yield new Vec2(rightEdge - i, this.y + yDiff);
			yield new Vec2(rightEdge - i, this.y - yDiff);
		}
	}

	public addMut(
		v: Vec2Like,
		options?: {
			times?: number;
			limit?: BoundingBox | ((v: Vec2Like) => boolean);
			flipX?: boolean;
			flipY?: boolean;
		}
	): Vec2 {
		const originalX = this.x;
		const originalY = this.y;
		const diffX = v.x * (options?.times ?? 1);
		const diffY = v.y * (options?.times ?? 1);

		this.x += options?.flipX ? -diffX : diffX;
		this.y += options?.flipY ? -diffY : diffY;

		if (
			options?.limit &&
			(typeof options.limit === 'function'
				? options.limit(this)
				: !Vec2.isWithin(this, options.limit))
		) {
			this.x = originalX;
			this.y = originalY;
		}

		return this;
	}

	public sub(o: Vec2Like, times = 1): Vec2 {
		return new Vec2(this.x - o.x * times, this.y - o.y * times);
	}

	public subMut(o: Vec2Like, times = 1): Vec2 {
		this.x -= o.x * times;
		this.y -= o.y * times;
		return this;
	}

	public manhattan(vec2: Vec2Like): number;
	public manhattan(x: number, y: number): number;
	public manhattan(x: number | Vec2Like, y?: number): number {
		if (typeof x === 'number' && typeof y === 'number') {
			return Math.abs(x - this.x) + Math.abs(y - this.y);
		} else if (typeof x === 'object') {
			return this.manhattan(x.x, x.y);
		} else {
			return 0;
		}
	}

	public dist(o: Vec2Like): number {
		return Math.sqrt(Math.pow(o.x - this.x, 2) + Math.pow(o.y - this.y, 2));
	}

	public stepVec(to: Vec2Like): Vec2 {
		const dx = to.x - this.x;
		const dy = to.y - this.y;
		let g = gcd(dx, dy);
		const step = new Vec2(dx / g, dy / g);
		while (g !== 1) {
			g = gcd(step.x, step.y);
			step.x /= g;
			step.y /= g;
		}
		return step;
	}

	public isInt(): boolean {
		return Math.floor(this.x) === this.x && Math.floor(this.y) === this.y;
	}

	public floor(): Vec2 {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}

	public ceil(): Vec2 {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	}

	/**
	 * TODO: remove duplicate method
	 * @param o
	 * @returns
	 */
	public subtract(o: Vec2Like): Vec2 {
		const dx = o.x - this.x;
		const dy = o.y - this.y;
		return new Vec2(dx, dy);
	}

	public subtractMut(o: Vec2Like): Vec2 {
		this.x = o.x - this.x;
		this.y = o.y - this.y;
		return this;
	}

	public negateMut(): Vec2 {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	public negate(): Vec2 {
		return new Vec2(-this.x, -this.y);
	}

	public *reach(o: Vec2Like, yieldStart = false, yieldEnd = false): IterableIterator<Vec2> {
		const stepVec = this.stepVec(o);
		const current = this.add(stepVec);
		if (yieldStart) {
			yield this.clone();
		}
		while (!current.equals(o)) {
			yield current.clone();
			current.addMut(stepVec);
		}
		if (yieldEnd) {
			yield current.clone();
		}
	}

	public los(f: Vec2[]): Vec2[] {
		return f
			.filter((fo) => !fo.equals(this))
			.map(
				(o) =>
					[...this.reach(o, false, true)]
						.filter((l) => f.find((fi) => fi.equals(l)))
						.sort((a, b) => this.dist(a) - this.dist(b))
						.shift() as Vec2
			)
			.filter((a) => !!a)
			.reduce((acc, n) => {
				if (!acc.find((a) => a.equals(n))) {
					acc.push(n);
				}
				return acc;
			}, [] as Vec2[]);
	}

	public equals(o: Vec2Like): boolean {
		return o && this.x === o.x && this.y === o.y;
	}

	public angle(o: Vec2Like): number {
		return (Math.atan2(o.y - this.y, o.x - this.x) * 180) / Math.PI;
	}

	public toString(): Vec2String {
		return Vec2.toString(this);
	}

	public static toString(v: Vec2Like | Vec2String): Vec2String {
		return typeof v === 'string' ? v : `${v.x},${v.y}`;
	}

	public clone(): Vec2 {
		return new Vec2(this);
	}

	public rotateLeft(times = 1, around: Vec2 = Vec2.ORIGIN): Vec2 {
		this.subMut(around);
		for (let i = 0; i < times; i++) {
			const x = this.x;
			this.x = -this.y;
			this.y = x;
			this.addMut(around);
		}
		return this;
	}

	public rotateRight(times = 1, around: Vec2 = Vec2.ORIGIN): Vec2 {
		this.subMut(around);
		for (let i = 0; i < times; i++) {
			const y = this.y;
			this.y = -this.x;
			this.x = y;
			this.addMut(around);
		}
		return this;
	}

	public isNeighbour(o: Vec2Like): boolean {
		return Math.abs(this.x - o.x) <= 1 && Math.abs(this.y - o.y) <= 1;
	}

	public normalizeMut(): Vec2 {
		this.x = Math.max(Math.min(this.x, 1), -1);
		this.y = Math.max(Math.min(this.y, 1), -1);
		return this;
	}

	public set(o: Vec2Like): Vec2 {
		this.x = o.x;
		this.y = o.y;
		return this;
	}

	public applyChange(fn: (n: number) => number): Vec2 {
		this.x = fn(this.x);
		this.y = fn(this.y);
		return this;
	}
}