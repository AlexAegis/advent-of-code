export class Coord {
	constructor(public x: number, public y: number) {}

	add(coord: Coord) {
		this.x += coord.x;
		this.y += coord.y;
		return this;
	}

	sub(coord: Coord) {
		this.x -= coord.x;
		this.y -= coord.y;
		return this;
	}

	toString(): string {
		return `${this.x},${this.y}`;
	}

	static parse(input: string): Coord {
		const split = input.split(',');
		return new Coord(Number(split[0]), Number(split[1]));
	}
}
