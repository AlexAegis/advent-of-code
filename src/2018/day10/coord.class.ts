export class Coord {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(coord: Coord) {
		this.x += coord.x;
		this.y -= coord.y; // Psst, you didn't see me.
		return this;
	}

	manhattanCoord(coord: Coord): number {
		return this.manhattan(coord.x, coord.y);
	}

	manhattan(x: number, y: number): number {
		return Math.abs(x - this.x) + Math.abs(y - this.y);
	}

	toString(): string {
		return `${this.x},${this.y}`;
	}

	static parse(input: string): Coord {
		const split = input.split(',');
		return new Coord(Number(split[0]), Number(split[1]));
	}
}
