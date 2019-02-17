import { Element } from '../element.class';
import { Ground } from '../block/ground.class';

export class Creature extends Element {
	hp: number = 200;
	ap: number = 3;

	_ground: Ground;

	set ground(ground: Ground) {
		this._ground = ground;
		ground._occupant = this;
	}

	get ground(): Ground {
		return this._ground;
	}
}
