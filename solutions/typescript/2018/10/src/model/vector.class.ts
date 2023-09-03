import { type } from 'arktype';
import { Coord } from './coord.class.js';
export class Vector {
	static inputType = type(['string', 'string', 'string', 'string']);
	public constructor(
		public position: Coord,
		public velocity: Coord,
	) {}

	static parse(input: string): Vector {
		const split = Vector.inputType.assert(input.split(/[<>]/));
		return new Vector(Coord.parse(split[1]), Coord.parse(split[3]));
	}

	public move(): Coord {
		return this.position.add(this.velocity);
	}

	public toString(): string {
		return `<${this.position.toString()}> , <${this.velocity.toString()}>`;
	}
}
