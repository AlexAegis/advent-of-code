import { gcd } from '@lib/functions';

export class Coord {
	public static get ORIGO(): Coord {
		return new Coord(0, 0);
	}

	public x!: number;
	public y!: number;

	public constructor(coord: Coord | string);
	public constructor(x: number, y: number);
	public constructor(x: number | string | Coord, y?: number) {
		if (typeof x === 'object' && x instanceof Coord) {
			this.x = x.x;
			this.y = x.y;
		} else if (typeof x === 'number' && typeof y === 'number') {
			this.x = x;
			this.y = y;
		} else if (typeof x === 'string') {
			[this.x, this.y] = x.split(',').map(s => Number(s));
		}
	}

	public add(coord: Coord, times: number = 1): Coord {
		return new Coord(this.x + coord.x * times, this.y + coord.y * times);
	}

	public addMut(coord: Coord, times: number = 1): Coord {
		this.x += coord.x * times;
		this.y += coord.y * times;
		return this;
	}

	public manhattan(coord: Coord): number;
	public manhattan(x: number, y: number): number;
	public manhattan(x: number | Coord, y?: number): number {
		if (typeof x === 'number' && typeof y === 'number') {
			return Math.abs(x - this.x) + Math.abs(y - this.y);
		} else if (typeof x === 'object') {
			return this.manhattan(x.x, x.y);
		} else {
			return 0;
		}
	}

	public dist(o: Coord): number {
		return Math.sqrt(Math.pow(o.x - this.x, 2) + Math.pow(o.y - this.y, 2));
	}

	public sub(o: Coord): Coord {
		return new Coord(this.x - o.x, this.y - o.y);
	}

	public subMut(o: Coord): Coord {
		this.x -= o.x;
		this.y -= o.y;
		return this;
	}

	public stepVec(to: Coord): Coord {
		const dx = to.x - this.x;
		const dy = to.y - this.y;
		let g = gcd(dx, dy);
		const step = new Coord(dx / g, dy / g);
		while (g !== 1) {
			g = gcd(step.x, step.y);
			step.x /= g;
			step.x /= g;
		}
		return step;
	}

	public *reach(o: Coord, yieldStart = false, yieldEnd = false): IterableIterator<Coord> {
		const stepVec = this.stepVec(o);
		const current = new Coord(this).addMut(stepVec);
		if (yieldStart) {
			yield new Coord(this);
		}
		while (!current.equals(o)) {
			yield new Coord(current);
			current.addMut(stepVec);
		}
		if (yieldEnd) {
			yield new Coord(current);
		}
	}

	public los(f: Coord[]): Coord[] {
		return f
			.filter(fo => !fo.equals(this))
			.map(
				o =>
					[...this.reach(o, false, true)]
						.filter(l => f.find(fi => fi.equals(l)))
						.sort((a, b) => this.dist(a) - this.dist(b))
						.shift() as Coord
			)
			.filter(a => !!a)
			.reduce((acc, n) => {
				if (!acc.find(a => a.equals(n))) {
					acc.push(n);
				}
				return acc;
			}, [] as Coord[]);
	}

	public equals(o: Coord): boolean {
		return o && this.x === o.x && this.y === o.y;
	}

	public angle(o: Coord): number {
		return (Math.atan2(o.y - this.y, o.x - this.x) * 180) / Math.PI;
	}

	public toString(): string {
		return `${this.x},${this.y}`;
	}
}
