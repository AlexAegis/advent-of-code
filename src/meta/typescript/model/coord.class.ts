export class Coord {
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

	public add(coord: Coord): Coord {
		this.x += coord.x;
		this.y += coord.y;
		return this;
	}

	public toString(): string {
		return `${this.x},${this.y}`;
	}
}
