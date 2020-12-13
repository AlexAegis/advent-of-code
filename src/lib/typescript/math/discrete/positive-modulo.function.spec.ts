import { expect } from 'chai';
import { posMod, posModBigInt } from './positive-modulo.function';

describe(`Positive Modulo`, () => {
	it(`should return 2 with 2 and 4`, async () => {
		expect(posMod(2, 4)).to.equal(2);
		expect(posModBigInt(2n, 4n)).to.equal(2n);
	});

	it(`should return 1 with -3 and 4`, async () => {
		expect(posMod(-3, 4)).to.equal(1);
		expect(posModBigInt(-3n, 4n)).to.equal(1n);
	});
});
