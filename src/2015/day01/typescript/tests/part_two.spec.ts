import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root';
import { year, day, results } from '..';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(await runner((await reader(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the first example resolves to 1', async () => {
		expect(await runner(')')).to.equal(1);
	});

	it('should be that that the second example resolves to 5', async () => {
		expect(await runner('()())')).to.equal(5);
	});
});
