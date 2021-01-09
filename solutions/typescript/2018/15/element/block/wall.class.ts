import { Block } from './block.class';

export class Wall extends Block {
	constructor() {
		super('#');
		this._weight = Infinity;
	}
}
