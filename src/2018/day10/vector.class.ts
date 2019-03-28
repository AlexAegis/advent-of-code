import { Coord } from './coord.class';

export class Vector {
	constructor(public position: Coord, public velocity: Coord) {}

	move = () => this.position.add(this.velocity);

	toString(): string {
		return `<${this.position.toString()}> , <${this.velocity.toString()}>`;
	}

	static parse(input: string): Vector {
		const split = input.split(/[<>]/);
		return new Vector(Coord.parse(split[1]), Coord.parse(split[3]));
	}
}
