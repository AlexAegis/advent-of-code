export class Coord {
	public constructor(public x: number, public y: number) {}

	static parse(input: string): Coord {
		const split = input.split(',');
		return new Coord(Number(split[0]), Number(split[1]));
	}

	public add(coord: Coord): Coord {
		this.x += coord.x;
		this.y += coord.y;
		return this;
	}

	public sub(coord: Coord): Coord {
		this.x -= coord.x;
		this.y -= coord.y;
		return this;
	}

	public toString(): string {
		return `${this.x},${this.y}`;
	}
}
