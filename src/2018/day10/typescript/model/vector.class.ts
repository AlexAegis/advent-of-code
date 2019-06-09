import { Coord } from './coord.class';

export class Vector {
	public constructor(public position: Coord, public velocity: Coord) {}

	static parse(input: string): Vector {
		const split = input.split(/[<>]/);
		return new Vector(Coord.parse(split[1]), Coord.parse(split[3]));
	}

	public move(): Coord {
		return this.position.add(this.velocity);
	}

	public toString(): string {
		return `<${this.position.toString()}> , <${this.velocity.toString()}>`;
	}
}
