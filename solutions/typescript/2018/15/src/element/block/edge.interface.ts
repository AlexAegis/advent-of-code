import type { Element } from '../element.class.js';
import type { Block } from './block.class.js';

export interface Edge extends Element {
	from: Block;
	to: Block;
}
