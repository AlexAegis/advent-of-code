import { describe, expect, it } from 'vitest';
import { lerp1D } from './lerp1d.function.js';

describe('LERP 1D', () => {
	it('should return numbers from 2 to 6 when generating a range with boundaries', () => {
		expect(lerp1D(2, 6)).to.deep.equal([2, 3, 4, 5, 6]);
	});

	it('should return numbers from 3 to 5 when generating a range without boundaries', () => {
		expect(lerp1D(2, 6, { excludeStart: true, excludeEnd: true })).to.deep.equal([3, 4, 5]);
	});
});
