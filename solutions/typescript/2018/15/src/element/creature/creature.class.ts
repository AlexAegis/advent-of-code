import type { Ground } from '../block/ground.class.js';
import { Element } from '../element.class.js';

export class Creature extends Element {
	hp = 200;
	ap = 3;

	_ground!: Ground;

	set ground(ground: Ground) {
		this._ground = ground;
		ground._occupant = this;
	}

	get ground(): Ground {
		return this._ground;
	}
}
