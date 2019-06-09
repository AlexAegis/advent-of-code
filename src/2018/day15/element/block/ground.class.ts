import { Creature } from '../creature/creature.class';
import { Block } from './block.class';

export class Ground extends Block {
	_occupant: Creature | undefined;

	constructor() {
		super('.');
	}

	set occupant(occupant: Creature | undefined) {
		this._occupant = occupant;
		if (occupant) {
			occupant._ground = this;
		}
	}

	get occupant(): Creature | undefined {
		return this._occupant;
	}

	get weight(): number {
		return this.occupant ? Infinity : 0;
	}

	toString() {
		return this.occupant ? this.occupant.toString() : super.toString();
	}
}
