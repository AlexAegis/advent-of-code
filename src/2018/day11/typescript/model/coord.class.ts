export class Coord implements Iterable<Coord> {
	static dirs: Coord[] = [
		new Coord(0, 0),
		new Coord(0, 1),
		new Coord(0, 2),
		new Coord(1, 0),
		new Coord(1, 1),
		new Coord(1, 2),
		new Coord(2, 0),
		new Coord(2, 1),
		new Coord(2, 2),
	];

	constructor(public x: number, public y: number) {}

	add(coord: Coord): Coord {
		this.x += coord.x;
		this.y += coord.y;
		return this;
	}

	*[Symbol.iterator](): IterableIterator<Coord> {
		for (const dir of Coord.dirs) {
			yield new Coord(this.x, this.y).add(dir);
		}
	}

	toString(): string {
		return `${this.x},${this.y}`;
	}
}
