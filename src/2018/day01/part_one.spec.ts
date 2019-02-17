import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 1, Part One', () => {
	it('Should be that that the input resolves to 408', async () => {
		expect(await runner()).to.equal(408);
	});

	it('Should be that that the example resolves to 4', async () => {
		expect(await runner('example')).to.equal(4);
	});
});
