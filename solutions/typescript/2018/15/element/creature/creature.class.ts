import { Ground } from '../block/ground.class';
import { Element } from '../element.class';

export class Creature extends Element {
	hp = 200;
	ap = 3;

	_ground: Ground;

	set ground(ground: Ground) {
		this._ground = ground;
		ground._occupant = this;
	}

	get ground(): Ground {
		return this._ground;
	}
}
