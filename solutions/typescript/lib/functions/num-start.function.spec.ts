import { describe, expect, it } from 'vitest';
import { numStart } from './num-start.function';

describe('Number start', () => {
	it('should work with numbers larger than the sliced part', async () => {
		expect(numStart(12354267, 5)).to.equal(12354);
		expect(numStart(7653, 2)).to.equal(76);
		expect(numStart(85476847, 1)).to.equal(8);
		expect(numStart(85476847, 0)).to.equal(0);
	});

	it('should work with numbers smaller than the sliced part', async () => {
		expect(numStart(12354267, 8)).to.equal(12354267);
		expect(numStart(7653, 4)).to.equal(7653);
		expect(numStart(85476847, 8)).to.equal(85476847);
	});

	it('should work with numbers exactly as long as the sliced part', async () => {
		expect(numStart(12, 5)).to.equal(12000);
		expect(numStart(7653, 5)).to.equal(76530);
		expect(numStart(85, 7)).to.equal(8500000);
	});

	it('should work with 0', async () => {
		expect(numStart(12354267, 0)).to.equal(0);
	});
});
