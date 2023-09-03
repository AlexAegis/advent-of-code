import type { Creature } from '../creature/creature.class.js';
import { Block } from './block.class.js';

export class Ground extends Block {
	_occupant: Creature | undefined;

	constructor() {
		super('.');
	}

	set occupant(occupant: Creature | undefined) {
		this._occupant = occupant;
		if (occupant) {
			occupant.ground = this;
		}
	}

	get occupant(): Creature | undefined {
		return this._occupant;
	}

	get weight(): number {
		return this.occupant ? Number.POSITIVE_INFINITY : 0;
	}

	override toString(): string {
		return this.occupant ? this.occupant.toString() : super.toString();
	}
}
