import { Rail } from './rail.type';
import { Coord } from './coord.class';
import { Cart } from './cart.class';

export class Mine {
	rail: Map<string, Rail> = new Map();
	carts: Array<Cart> = [];
	crashes: Array<Coord> = [];
	height: number;
	width: number;
	public print(tick: number | undefined = undefined): void {
		console.log(`${tick}.`);
		for (let y = 0; y < this.height; y++) {
			let line: string = '';
			for (let x = 0; x < this.width; x++) {
				const coord: Coord = new Coord(x, y);
				const rail = this.rail.get(coord.toString());
				const carts: Array<Cart> = this.carts.filter(cart => cart.position.toString() === coord.toString());
				const crashes: Array<Coord> = this.crashes.filter(c => c.toString() === coord.toString());
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
