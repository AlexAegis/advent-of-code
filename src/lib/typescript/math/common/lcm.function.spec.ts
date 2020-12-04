import { expect } from 'chai';
import { lcm } from './lcm.function';

describe(`Least common multiple`, () => {
	it(`should return 120 with 120 and -20`, async () => {
		expect(lcm(120, -20)).to.equal(120);
	});

	it(`should return 3 with 3, 3`, async () => {
		expect(lcm(3, 3)).to.equal(3);
	});
});
