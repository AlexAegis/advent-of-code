import { Vec3 } from '@alexaegis/advent-of-code-lib/model';

export class Moon {
	public constructor(
		public pos: Vec3,
		public vel: Vec3 = new Vec3(0, 0, 0),
	) {}

	public potetialEnergy(): number {
		return Math.abs(this.pos.x) + Math.abs(this.pos.y) + Math.abs(this.pos.z);
	}

	public kineticEnergy(): number {
		return Math.abs(this.vel.x) + Math.abs(this.vel.y) + Math.abs(this.vel.z);
	}

	public totalEnergy(): number {
		return this.potetialEnergy() * this.kineticEnergy();
	}

	public step(plane?: 'x' | 'y' | 'z'): this {
		if (plane) {
			this.pos[plane] += this.vel[plane];
		} else {
			this.pos.addMut(this.vel);
		}
		return this;
	}

	public toString(): string {
		return this.pos.toString() + ';' + this.vel.toString();
	}
}
