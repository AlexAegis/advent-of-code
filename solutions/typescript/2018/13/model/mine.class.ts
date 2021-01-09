import { Vec2 } from '@lib/model';
import { ToString } from '@lib/model/to-string.interface';
import { Cart } from './cart.class';

export type Rail = ('/' | '\\' | '-' | '|' | '+') & string;

export class Mine implements ToString {
	public rail: Map<string, Rail> = new Map();
	public carts: Cart[] = [];
	public crashes: Vec2[] = [];
	public height = 0;
	public width = 0;
	public toString(): string {
		let mine = '';
		for (let y = 0; y < this.height; y++) {
			let line = '';
			for (let x = 0; x < this.width; x++) {
				const vec = new Vec2(x, y);
				const rail = this.rail.get(vec.toString());
				const carts = this.carts.filter((cart) => cart.position.equals(vec));
				const crashes = this.crashes.filter((c) => c.equals(vec));
				if (carts.length > 1 || crashes.length > 1) {
					line += 'X';
				} else if (carts.length === 1) {
					line += carts[0].direction.marker;
				} else if (rail) {
					line += rail;
				} else {
					line += ' ';
				}
			}
			mine += line + '\n';
		}
		return mine;
	}
}
