import { Direction } from '../direction/index.js';
import { Vec2 } from './vec2.class.js';

/**
 * R12, L32...
 * TODO: put this into the constructor of VEC2
 */
export class Vector {
	public direction!: Direction;
	public amount = 1;

	public constructor(s: string) {
		switch (s[0]) {
			case 'R': {
				this.direction = Direction.EAST;
				break;
			}
			case 'L': {
				this.direction = Direction.WEST;
				break;
			}
			case 'U': {
				this.direction = Direction.NORTH;
				break;
			}
			case 'D': {
				this.direction = Direction.SOUTH;
				break;
			}
		}
		this.amount = Number(s.slice(1));
	}
}

export const flattenVectors = (v: Vector[]): { c: Vec2; steps: number }[] => {
	return v.reduce(
		(acc, n) => {
			for (let d = 0; d < n.amount; d++) {
				acc.curs.pos.addMut(n.direction);
				acc.curs.step += 1;
				acc.res.push({
					c: new Vec2(acc.curs.pos),
					steps: acc.curs.step,
				});
			}
			return acc;
		},
		{
			res: [] as { c: Vec2; steps: number }[],
			curs: { pos: new Vec2(0, 0), step: 0 },
		},
	).res;
};
