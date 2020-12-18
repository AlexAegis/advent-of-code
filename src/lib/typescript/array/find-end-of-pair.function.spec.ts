import { expect } from 'chai';
import { findEndOfPair } from './find-end-of-pair.function';

describe('findEndOfPair', () => {
	const a = '(123)';
	const b = 'a(12(t())3)e';
	it('should find the end of a pair at the end', () => {
		expect(findEndOfPair(a.split(''), ['(', ')'], 0)).to.equal(4);
	});

	it('should find the end of a pair when they are nested', () => {
		expect(findEndOfPair(b.split(''), ['(', ')'], 1)).to.equal(10);
	});

	it('should throw an error if the starting index does not point to the opening pair', () => {
		expect(() => findEndOfPair(b.split(''), ['(', ')'], 0)).to.throw();
	});

	it('should return undefined if there are no pairs', () => {
		expect(findEndOfPair(['('], ['(', ')'], 0)).to.equal(undefined);
	});
});
