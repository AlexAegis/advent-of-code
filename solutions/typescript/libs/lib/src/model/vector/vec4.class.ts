import { NUM } from '../../regex/index.js';
import type { Vec3Like } from './vec3.class.js';

export interface Vec4Like extends Vec3Like {
	w: number;
}

export class Vec4 implements Vec4Like {
	public static ORIGIN = new Vec4(0, 0, 0, 0);

	public x!: number;
	public y!: number;
	public z!: number;
	public w!: number;

	public constructor(coord: Vec4Like | string);
	public constructor(x: number, y: number, z: number, q: number);
	public constructor(x: number | string | Vec4Like, y?: number, z?: number, q?: number) {
		if (typeof x === 'object' && x instanceof Vec4) {
			this.x = x.x;
			this.y = x.y;
			this.z = x.z;
			this.w = x.w;
		} else if (
			typeof x === 'number' &&
			typeof y === 'number' &&
			typeof z === 'number' &&
			typeof q === 'number'
		) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.w = q;
		} else if (typeof x === 'string') {
			[this.x, this.y, this.z, this.w] = (x.match(NUM) ?? []).map((s) =>
				Number.parseInt(s, 10),
			) as [number, number, number, number];
		}
	}

	public add(coord: Vec4Like, times = 1): Vec4 {
		return new Vec4(
			this.x + coord.x * times,
			this.y + coord.y * times,
			this.z + coord.z * times,
			this.w + coord.w * times,
		);
	}

	public addMut(coord: Vec4Like, times = 1): this {
		this.x += coord.x * times;
		this.y += coord.y * times;
		this.z += coord.z * times;
		this.w += coord.w * times;
		return this;
	}
	/*
	public sub(o: Vec3, times = 1): Vec3 {
		return new Vec3(this.x - o.x * times, this.y - o.y * times, this.z - o.z * times);
	}

	public subMut(o: Vec3, times = 1): Vec3 {
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
			Math.pow(o.x - this.x, 2) + Math.pow(o.y - this.y, 2) + Math.pow(o.z - this.z, 2)
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
			.map(
				(o) =>
					[...this.reach(o, false, true)]
						.filter((l) => f.find((fi) => fi.equals(l)))
						.sort((a, b) => this.dist(a) - this.dist(b))
						.shift() as Vec3
			)
			.filter((a) => !!a)
			.reduce((acc, n) => {
				if (!acc.find((a) => a.equals(n))) {
					acc.push(n);
				}
				return acc;
			}, [] as Vec3[]);
	}*/

	public equals(o: this | undefined): boolean {
		return (
			o !== undefined && this.x === o.x && this.y === o.y && this.z === o.z && this.w === o.w
		);
	}

	public toString(): string {
		return `${this.x},${this.y},${this.z},${this.w}`;
	}

	public clone(): Vec4 {
		return new Vec4(this);
	}
}
