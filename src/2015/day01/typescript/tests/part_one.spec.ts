import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root';
import { year, day, results } from '..';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await reader(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that both the first examples resolves to 0', async () => {
		expect(await runner('(())')).to.equal(0);
		expect(await runner('()()')).to.equal(0);
	});

	it('should be that that both the second and the third examples resolves to 3', async () => {
		expect(await runner('(((')).to.equal(3);
		expect(await runner('(()(()(')).to.equal(3);
		expect(await runner('))(((((')).to.equal(3);
	});

	it('should be that that both the fourth examples resolves to -1', async () => {
		expect(await runner('())')).to.equal(-1);
		expect(await runner('))(')).to.equal(-1);
	});

	it('should be that that both the fith examples resolves to -3', async () => {
		expect(await runner(')))')).to.equal(-3);
		expect(await runner(')())())')).to.equal(-3);
	});
});
