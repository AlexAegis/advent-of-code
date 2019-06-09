import { Element } from '../element.class';
import { Block } from './block.class';

export interface Vertice extends Element {
	from: Block;
	to: Block;
}
