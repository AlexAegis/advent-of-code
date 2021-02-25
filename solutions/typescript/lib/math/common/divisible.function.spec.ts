import { expect } from 'chai';
import { divisible } from './divisible.function';

describe('Divisible', () => {
	it('should return true if divisible', async () => {
		expect(divisible(4, 2)).to.be.true;
	});

	it('should return false if not divisible', async () => {
		expect(divisible(4, 3)).to.be.false;
	});
});
