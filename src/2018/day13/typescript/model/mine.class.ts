import { Cart } from './cart.class';
import { Coord } from './coord.class';
import { Rail } from './rail.type';

export class Mine {
	public rail: Map<string, Rail> = new Map();
	public carts: Cart[] = [];
	public crashes: Coord[] = [];
	public height = 0;
	public width = 0;
	public print(tick?: number | undefined): void {
		console.log(`${tick}.`);
		for (let y = 0; y < this.height; y++) {
			let line = '';
			for (let x = 0; x < this.width; x++) {
				const coord: Coord = new Coord(x, y);
				const rail = this.rail.get(coord.toString());
				const carts: Cart[] = this.carts.filter(
					(cart) => cart.position.toString() === coord.toString()
				);
				const crashes: Coord[] = this.crashes.filter(
					(c) => c.toString() === coord.toString()
				);
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
			console.log(line);
		}
	}
}
