export class Coord {
	constructor(public x: number, public y: number) {}

	add(coord: Coord): Coord {
		this.x += coord.x;
		this.y += coord.y;
		return this;
	}

	toString(): string {
		return `${this.x},${this.y}`;
	}
}
