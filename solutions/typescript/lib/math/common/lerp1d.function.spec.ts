import { expect } from 'chai';
import { lerp1D } from './lerp1d.function';

describe('LERP 1D', () => {
	it('should return numbers from 2 to 6 when generating a range with boundaries', async () => {
		expect(lerp1D(2, 6)).to.deep.equal([2, 3, 4, 5, 6]);
	});

	it('should return numbers from 3 to 5 when generating a range without boundaries', async () => {
		expect(lerp1D(2, 6, { excludeStart: true, excludeEnd: true })).to.deep.equal([3, 4, 5]);
	});
});
