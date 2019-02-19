import { expect } from 'chai';
import { AVL } from './avl.class';

describe('AVL Tree', () => {
	it('should be constructable', () => {
		let tree = new AVL.Tree();
		expect(tree).to.be.ok;
	});
});
