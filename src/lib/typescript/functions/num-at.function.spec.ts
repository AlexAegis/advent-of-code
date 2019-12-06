import { expect } from 'chai';
import { numAt } from './num-at.function';

describe(`Number at`, () => {
	it(`should work with numbers longer than the position`, async () => {
		expect(numAt(123, 1)).to.equal(2);
		expect(numAt(7653, 3)).to.equal(3);
		expect(numAt(85476847, 0)).to.equal(8);
	});

	it(`should work with the position being negative`, async () => {
		expect(numAt(123, -1)).to.equal(0);
		expect(numAt(7653, -2)).to.equal(0);
	});
});
