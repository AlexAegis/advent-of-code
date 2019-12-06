import { expect } from 'chai';
import { numLength } from './num-length.function';

describe(`Number length`, () => {
	it(`should work with numbers larger than 1`, async () => {
		expect(numLength(123)).to.equal(3);
		expect(numLength(7653)).to.equal(4);
		expect(numLength(85476847)).to.equal(8);
	});

	it(`should work with 1`, async () => {
		expect(numLength(1)).to.equal(1);
	});

	it(`should work with 0`, async () => {
		expect(numLength(0)).to.equal(0);
	});

	it(`should work with negative numbers`, async () => {
		expect(numLength(-34312)).to.equal(5);
	});
});
