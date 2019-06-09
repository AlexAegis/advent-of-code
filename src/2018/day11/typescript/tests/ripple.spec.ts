import { expect } from 'chai';
import { ripple } from '../functions/ripple.function';

describe('Day 11, ripple', () => {
	it('Should be only 40 of them:', () => {
		expect(ripple(5, 3, 4).length).to.equal(40);
	});
});
