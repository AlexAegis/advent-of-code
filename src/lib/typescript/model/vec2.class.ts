import { gcd } from '@lib/functions/gcd.function';
import { NUM } from '@lib/regex/number.regex';

export interface Vec2Like {
	x: number;
	y: number;
}

export interface Area {
	cornerA: Vec2Like;
	cornerB: Vec2Like;
}

export class Vec2 implements Vec2Like {
	public static ORIGIN = new Vec2(0, 0);

	/**
	 * ? Duplicated constructor signatures until https://github.com/microsoft/TypeScript/issues/14107
	 */
	public constructor(coord: Vec2Like | string);
	public constructor(x: number, y: number);
	public constructor(x: number | string | Vec2Like, y?: number);
	public constructor(x: number | string | Vec2Like, y?: number) {
		if (typeof x === 'object' && x instanceof Vec2) {
			this.x = x.x;
			this.y = x.y;
		} else if (typeof x === 'number' && typeof y === 'number') {
			this.x = x;
			this.y = y;
		} else if (typeof x === 'string') {
			[this.x, this.y] = (x.match(NUM) || []).map((s) => parseInt(s, 10));
		}
	}

	public x!: number;
	public y!: number;

	public static compare(a: Vec2, b: Vec2): number {
		return a.x === b.x ? a.y - b.y : a.x - b.x;
	}

	public static isWithin(v: Vec2Like, area: Area): boolean {
		return (
			Math.min(area.cornerA.x, area.cornerB.x) <= v.x &&
			v.x <= Math.max(area.cornerA.x, area.cornerB.x) &&
			Math.min(area.cornerA.y, area.cornerB.y) <= v.y &&
			v.y <= Math.max(area.cornerA.y, area.cornerB.y)
		);
	}

	public clamp(area: Area): Vec2 {
		const xMax = Math.max(area.cornerA.x, area.cornerB.x);
		const yMax = Math.max(area.cornerA.y, area.cornerB.y);
		const xMin = Math.min(area.cornerA.x, area.cornerB.x);
		const yMin = Math.min(area.cornerA.y, area.cornerB.y);

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
		options: { times?: number; limit?: Area; onLimit?: 'clamp' | 'cancel' } = {
			times: 1,
			onLimit: 'cancel',
		}
	): Vec2 {
		return this.clone().addMut(coord, options);
	}

	public addMut(
		coord: Vec2Like,
		options?: { times?: number; limit?: Area; clampOnLimit?: boolean }
	): Vec2 {
		const originalX = this.x;
		const originalY = this.y;

		this.x += coord.x * (options?.times ?? 1);
		this.y += coord.y * (options?.times ?? 1);

		if (options?.limit && !Vec2.isWithin(this, options.limit)) {
			if (options.clampOnLimit) {
				this.clamp(options.limit);
			} else {
				this.x = originalX;
				this.y = originalY;
			}
		}

		return this;
	}

	public sub(o: Vec2, times = 1): Vec2 {
		return new Vec2(this.x - o.x * times, this.y - o.y * times);
	}

	public subMut(o: Vec2, times = 1): Vec2 {
		this.x -= o.x * times;
		this.y -= o.y * times;
		return this;
	}

	public manhattan(coord: Vec2Like): number;
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

	public stepVec(to: Vec2Like): Vec2Like {
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

	public toString(): string {
		return `${this.x},${this.y}`;
	}

	public clone(): Vec2 {
		return new Vec2(this);
	}
}
