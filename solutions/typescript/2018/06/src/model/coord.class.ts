export class Coord {
	public constructor(public x: number, public y: number) {}

	public add(coord: Coord): Coord {
		this.x += coord.x;
		this.y -= coord.y; // TODO: Psst, you didn't see me.
		return this;
	}

	public manhattanCoord(coord: Coord): number {
		return this.manhattan(coord.x, coord.y);
	}

	public manhattan(x: number, y: number): number {
		return Math.abs(x - this.x) + Math.abs(y - this.y);
	}

	public toString(): string {
		return `${this.x},${this.y}`;
	}
}
