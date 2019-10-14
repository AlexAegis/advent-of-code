export class Coord {
	public static get ORIGO(): Coord {
		return new Coord(0, 0);
	}
	public x!: number;
	public y!: number;

	public constructor(coord: Coord);
	public constructor(x: number, y: number);
	public constructor(x: number | Coord, y?: number) {
		if (typeof x === 'object' && x instanceof Coord) {
			this.x = x.x;
			this.y = x.y;
		}
		if (typeof x === 'number' && typeof y === 'number') {
			this.x = x;
			this.y = y;
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

	public toString(): string {
		return `${this.x},${this.y}`;
	}
}
