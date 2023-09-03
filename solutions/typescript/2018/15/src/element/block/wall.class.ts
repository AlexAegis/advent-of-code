import { Block } from './block.class.js';

export class Wall extends Block {
	constructor() {
		super('#');
		this._weight = Number.POSITIVE_INFINITY;
	}
}
