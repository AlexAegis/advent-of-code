import { expect } from 'chai';
import { peek } from './peek.function';

describe('peek', () => {
	it('should return the last value', () => {
		const array = [0, 1, 2, 3, 4, 5, 6];

		expect(peek(array)).to.equal(6);
	});

	it('should return undefined for an empty array', () => {
		expect(peek([])).to.equal(undefined);
	});
});
