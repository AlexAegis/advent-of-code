import { Direction, Vec2, type DirectionMarker } from '@alexaegis/advent-of-code-lib/model';
import type { Mine } from './mine.class.js';

export class Cart {
	public direction: Direction;
	public turnsAtIntersection = 0;
	constructor(public position: Vec2, directionMarker: DirectionMarker) {
		this.direction = Direction.fromMarker(directionMarker);
	}

	public static compare(a: Cart, b: Cart): number {
		return Vec2.compareRowFirst(a.position, b.position);
	}

	public step(mine: Mine): Vec2 | undefined {
		this.position = this.position.clone().addMut(this.direction);
		const rail = mine.rail.get(this.position.toString());
		if (rail === '+') {
			switch (this.turnsAtIntersection % 3) {
				case 0:
					this.direction = this.direction.left();
					break;
				case 2:
					this.direction = this.direction.right();
					break;
			}
			this.turnsAtIntersection++;
		} else if (rail) {
			if (this.direction.isVertical()) {
				if (rail === '\\') {
					this.direction = this.direction.left();
				} else if (rail === '/') {
					this.direction = this.direction.right();
				}
			} else if (this.direction.isHorizonal()) {
				if (rail === '\\') {
					this.direction = this.direction.right();
				} else if (rail === '/') {
					this.direction = this.direction.left();
				}
			}
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
