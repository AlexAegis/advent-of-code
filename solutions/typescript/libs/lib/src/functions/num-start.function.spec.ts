import { describe, expect, it } from 'vitest';
import { numStart } from './num-start.function.js';

describe('Number start', () => {
	it('should work with numbers larger than the sliced part', () => {
		expect(numStart(12_354_267, 5)).to.equal(12_354);
		expect(numStart(7653, 2)).to.equal(76);
		expect(numStart(85_476_847, 1)).to.equal(8);
		expect(numStart(85_476_847, 0)).to.equal(0);
	});

	it('should work with numbers smaller than the sliced part', () => {
		expect(numStart(12_354_267, 8)).to.equal(12_354_267);
		expect(numStart(7653, 4)).to.equal(7653);
		expect(numStart(85_476_847, 8)).to.equal(85_476_847);
	});

	it('should work with numbers exactly as long as the sliced part', () => {
		expect(numStart(12, 5)).to.equal(12_000);
		expect(numStart(7653, 5)).to.equal(76_530);
		expect(numStart(85, 7)).to.equal(8_500_000);
	});

	it('should work with 0', () => {
		expect(numStart(12_354_267, 0)).to.equal(0);
	});
});
