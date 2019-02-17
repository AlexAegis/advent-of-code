import { Block } from './block.class';
import { Creature } from '../creature/creature.class';

export class Ground extends Block {
	public occupant: Creature;

	constructor() {
		super('.');
	}

	toString() {
		return this.occupant ? this.occupant.toString() : super.toString();
	}
}
