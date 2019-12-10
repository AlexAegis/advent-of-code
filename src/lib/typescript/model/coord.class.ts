function lcm(x: number, y: number) {
	return !x || !y ? 0 : Math.abs((x * y) / gcd(x, y));
}

function gcd(x: number, y: number) {
	x = Math.abs(x);
	y = Math.abs(y);
	while (y) {
		const t = y;
		y = x % y;
		x = t;
	}
	return x;
}

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

	public stepVec(o: Coord): Coord {
		const dx = o.x - this.x;
		const dy = o.y - this.y;
		let g = gcd(dx, dy);
		const step = new Coord(dx / g, dy / g);
		while (g !== 1) {
			g = gcd(step.x, step.y);
			step.x /= g;
			step.x /= g;
		}
		return step;
	}
	public *reach(o: Coord, first = false, last = false): IterableIterator<Coord> {
		const stepVec = this.stepVec(o);
		const current = new Coord(this).add(stepVec);
		// console.log(this.toString(), o.toString(), current.toString());
		if (first) {
			yield new Coord(this);
		}
		while (!current.equal(o)) {
			// console.log(current.toString());
			yield new Coord(current);
			current.add(stepVec);
		}
		if (last) {
			yield new Coord(current);
		}
	}

	public los(f: Coord[]): Coord[] {
		const asdf = f
			.filter(fo => !fo.equal(this))
			.map(o => [...this.reach(o)].filter(l => f.find(fi => fi.equal(l)))[0])
			.filter(a => !!a)
			.reduce((acc, n) => {
				if (!acc.find(a => a.equal(n))) {
					acc.push(n);
				}
				return acc;
			}, [] as Coord[]);
		// console.log(asdf.map(s => s.toString()).join('; '));
		return asdf;
	}

	public los2(f: Coord[]): Coord[] {
		return f
			.filter(fo => !fo.equal(this))
			.map(
				o =>
					[...this.reach(o, false, true)]
						.filter(l => f.find(fi => fi.equal(l)))
						.sort((a, b) => this.dist(a) - this.dist(b))
						.shift() as Coord
			)
			.filter(a => !!a)
			.reduce((acc, n) => {
				if (!acc.find(a => a.equal(n))) {
					acc.push(n);
				}
				return acc;
			}, [] as Coord[]);
	}
	public equal(o: Coord): boolean {
		return o && this.x === o.x && this.y === o.y;
	}

	public toString(): string {
		return `${this.x},${this.y}`;
	}
}
/*
const a = new Coord(0, 1);
const b = new Coord(0, 4);

const r = [...b.reach(a)];
console.log(r.map(l => l.toString()));*/

const inf =
	'1,0; 4,0; 5,0; 7,0; 8,0; 9,0; 13,0; 14,0; 15,0; 16,0; 17,0; 18,0; 19,0; 0,1; 1,1; 3,1; 4,1; 5,1; 6,1; 7,1; 8,1; 9,1; 10,1; 11,1; 12,1; 13,1; 14,1; 17,1; 18,1; 1,2; 3,2; 4,2; 5,2; 6,2; 7,2; 8,2; 10,2; 12,2; 13,2; 14,2; 15,2; 16,2; 17,2; 19,2; 1,3; 2,3; 3,3; 5,3; 7,3; 8,3; 9,3; 10,3; 13,3; 14,3; 15,3; 18,3; 0,4; 1,4; 3,4; 4,4; 6,4; 7,4; 9,4; 12,4; 14,4; 15,4; 16,4; 18,4; 19,4; 2,5; 4,5; 5,5; 6,5; 12,5; 14,5; 16,5; 17,5; 18,5; 19,5; 0,6; 1,6; 2,6; 3,6; 5,6; 6,6; 7,6; 8,6; 9,6; 10,6; 12,6; 13,6; 14,6; 15,6; 16,6; 17,6; 19,6; 0,7; 2,7; 3,7; 4,7; 16,7; 18,7; 19,7; 0,8; 1,8; 3,8; 4,8; 5,8; 14,8; 15,8; 17,8; 18,8; 19,8; 0,9; 1,9; 2,9; 4,9; 6,9; 16,9; 17,9; 2,10; 3,10; 4,10; 6,10; 13,10; 16,10; 17,10; 18,10; 19,10; 0,11; 1,11; 2,11; 3,11; 16,11; 19,11; 1,12; 2,12; 3,12; 4,12; 5,12; 14,12; 17,12; 18,12; 19,12; 0,13; 16,13; 0,14; 2,14; 3,14; 4,14; 5,14; 8,14; 14,14; 16,14; 17,14; 18,14; 19,14; 1,15; 2,15; 3,15; 4,15; 16,15; 18,15; 19,15; 4,16; 7,16; 16,16; 18,16; 19,16; 1,17; 3,17; 6,17; 8,17; 10,17; 11,17; 12,17; 13,17; 14,17; 15,17; 17,17; 18,17; 19,17; 0,18; 2,18; 4,18; 7,18; 8,18; 9,18; 10,18; 12,18; 13,18; 14,18; 15,18; 17,18; 18,18; 19,18; 0,19; 1,19; 2,19; 4,19; 5,19; 7,19; 8,19; 9,19; 10,19; 12,19; 13,19; 15,19; 18,19; 19,19';

const start = new Coord(11, 13);
const hmm = inf.split('; ').map(s => new Coord(s));
console.log(hmm.length, hmm.map(s => s.toString()).join('; '));
const sorted = start.los2(hmm);
// 	.map(c => ({ c, angle: (Math.atan2(c.y - start.y, c.x - start.x) * 180) / Math.PI }))
// 	.sort((a, b) => a.angle - b.angle);

console.log(sorted.length, sorted.map(s => s.toString()).join('; '));
