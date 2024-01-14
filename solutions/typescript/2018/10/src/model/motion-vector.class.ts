import { Vec2, type Vec2String } from '@alexaegis/advent-of-code-lib';
import { type } from 'arktype';

export class MotionVector {
	static inputType = type(['string', 'string', 'string', 'string', 'string']);
	public constructor(
		public position: Vec2,
		public velocity: Vec2,
	) {}

	static parse(input: string): MotionVector {
		const split = MotionVector.inputType.assert(input.split(/[<>]/));
		return new MotionVector(new Vec2(split[1] as Vec2String), new Vec2(split[3] as Vec2String));
	}

	public move(): Vec2 {
		return this.position.addMut(this.velocity);
	}

	public toString(): string {
		return `<${this.position.toString()}> , <${this.velocity.toString()}>`;
	}
}
