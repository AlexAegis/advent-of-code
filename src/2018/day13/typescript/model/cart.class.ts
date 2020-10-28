import { Coord } from './coord.class';
import { DirectionMarker } from './direction-marker.type';
import { Direction } from './direction.class';
import { Mine } from './mine.class';

export class Cart {
	public direction: Direction;
	public turnsAtIntersection = 0;
	constructor(public position: Coord, directionMarker: DirectionMarker) {
		this.direction = new Direction(directionMarker);
	}

	public step(mine: Mine): Coord | undefined {
		this.position = this.position.add(this.direction.value);
		const rail = mine.rail.get(this.position.toString());
		if (rail === '+') {
			switch (this.turnsAtIntersection % 3) {
				case 0:
					this.direction.turnLeft();
					break;
				case 2:
					this.direction.turnRight();
					break;
			}
			this.turnsAtIntersection++;
		} else if (rail) {
			this.direction.turn(rail);
		}
		return this.isCrashed(mine) ? this.position : undefined;
	}

	isCrashed(mine: Mine): boolean {
		const crashing = mine.carts.filter(
			(cart) => cart.position.toString() === this.position.toString()
		);
		if (crashing.length > 1) {
			mine.carts = mine.carts.filter(
				(cart) => cart.position.toString() !== this.position.toString()
			);
		}
		return crashing.length > 1;
	}
}
