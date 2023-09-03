import { describe, expect, it } from 'vitest';
import { numAt, numAtMath } from './num-at.function.js';

describe('Number at', () => {
	it('should work with numbers longer than the position', () => {
		expect(numAt(123, 1)).to.equal(2);
		expect(numAt(7653, 3)).to.equal(3);
		expect(numAt(85_476_847, 0)).to.equal(8);
	});

	it('should work with the position being negative', () => {
		expect(numAt(123, -1)).to.equal(0);
		expect(numAt(7653, -2)).to.equal(0);
	});
});

describe('Number at (Math)', () => {
	it('should work with numbers longer than the position', () => {
		expect(numAtMath(123, 1)).to.equal(2);
		expect(numAtMath(7653, 3)).to.equal(3);
		expect(numAtMath(85_476_847, 0)).to.equal(8);
	});

	it('should work with the position being negative', () => {
		expect(numAtMath(123, -1)).to.equal(0);
		expect(numAtMath(7653, -2)).to.equal(0);
	});
});
