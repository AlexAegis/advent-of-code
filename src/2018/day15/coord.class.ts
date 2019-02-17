export class Coord {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(coord: Coord) {
		this.x += coord.x;
		this.y += coord.y;
		return this;
	}

	toString(): string {
		return `${this.x},${this.y}`;
	}
}
