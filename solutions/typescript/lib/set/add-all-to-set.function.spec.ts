import { expect } from 'chai';
import { addAllToSet } from './add-all-to-set.function';

describe('addAllToSet', () => {
	it('should create a set that has all the elements', () => {
		const set = addAllToSet([1, 1, 2, 3]);
		expect(set.size).to.equal(3);
	});
});
