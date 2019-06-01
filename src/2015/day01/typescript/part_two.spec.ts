import { runner } from './part_two';
import { expect } from 'chai';
import { reader } from './reader.function';

describe('2015 Day 1, Part Two', () => {
	it('Should be that that the input resolves to 1795', async () => {
		expect(await runner(await reader())).to.equal(1795);
	});

	it('Should be that that the first example resolves to 1', async () => {
		expect(await runner(')')).to.equal(1);
	});

	it('Should be that that the second example resolves to 5', async () => {
		expect(await runner('()())')).to.equal(5);
	});
});
