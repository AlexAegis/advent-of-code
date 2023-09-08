import { gcd } from '../../math/index.js';
import { NUM } from '../../regex/index.js';
import type { Vec2Like } from './vec2.class.types.js';

export interface Vec3Like extends Vec2Like {
	z: number;
}

export class Vec3 implements Vec3Like {
	public static ORIGIN = new Vec3(0, 0, 0);

	public x!: number;
	public y!: number;
	public z!: number;

	public constructor(coord: Vec3Like | string);
	public constructor(x: number, y: number, z: number);
	public constructor(x: number | string | Vec2Like, y?: number, z?: number) {
		if (typeof x === 'object' && x instanceof Vec3) {
			this.x = x.x;
			this.y = x.y;
			this.z = x.z;
		} else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
			this.x = x;
			this.y = y;
			this.z = z;
		} else if (typeof x === 'string') {
			[this.x, this.y, this.z] = (x.match(NUM) ?? []).map((s) => Number.parseInt(s, 10)) as [
				number,
				number,
				number,
			];
		}
	}

	public add(coord: Vec3Like, times = 1): Vec3 {
		return new Vec3(
			this.x + coord.x * times,
			this.y + coord.y * times,
			this.z + coord.z * times,
		);
	}

	public addMut(coord: Vec3, times = 1): this {
		this.x += coord.x * times;
		this.y += coord.y * times;
		this.z += coord.z * times;
		return this;
	}

	public sub(o: Vec3, times = 1): Vec3 {
		return new Vec3(this.x - o.x * times, this.y - o.y * times, this.z - o.z * times);
	}

	public subMut(o: Vec3, times = 1): this {
		this.x -= o.x * times;
		this.y -= o.y * times;
		this.z -= o.z * times;
		return this;
	}

	public manhattan(coord: Vec3Like): number;
	public manhattan(x: number, y: number, z: number): number;
	public manhattan(x: number | Vec3Like, y?: number, z?: number): number {
		if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
			return Math.abs(x - this.x) + Math.abs(y - this.y) + Math.abs(z - this.z);
		} else if (typeof x === 'object') {
			return this.manhattan(x.x, x.y, x.z);
		} else {
			return 0;
		}
	}

	public dist(o: Vec3): number {
		return Math.sqrt(
			Math.pow(o.x - this.x, 2) + Math.pow(o.y - this.y, 2) + Math.pow(o.z - this.z, 2),
		);
	}

	public stepVec(to: Vec3): Vec3 {
		const dx = to.x - this.x;
		const dy = to.y - this.y;
		const dz = to.z - this.z;
		let g = gcd(gcd(dx, dy), dz);
		const step = new Vec3(dx / g, dy / g, dz / g);
		while (g !== 1) {
			g = gcd(gcd(step.x, step.y), step.z);
			step.x /= g;
			step.y /= g;
			step.z /= g;
		}
		return step;
	}

	public *reach(o: Vec3, yieldStart = false, yieldEnd = false): IterableIterator<Vec3> {
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

	public los(f: Vec3[]): Vec3[] {
		return f
			.filter((fo) => !fo.equals(this))
			.map((o) =>
				[...this.reach(o, false, true)]
					.filter((l) => f.find((fi) => fi.equals(l)))
					.sort((a, b) => this.dist(a) - this.dist(b))
					.shift(),
			)
			.filter((a): a is Vec3 => !!a)
			.reduce<Vec3[]>((acc, n) => {
				if (!acc.some((a) => a.equals(n))) {
					acc.push(n);
				}
				return acc;
			}, []);
	}

	public equals(o: Vec3 | undefined): boolean {
		return o !== undefined && this.x === o.x && this.y === o.y && this.z === o.z;
	}

	public toString(): string {
		return `${this.x},${this.y},${this.z}`;
	}

	public clone(): Vec3 {
		return new Vec3(this);
	}
}
