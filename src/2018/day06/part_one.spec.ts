import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 6, Part One', () => {
	it('should the example resolve to 17', async () => {
		expect(await runner('example')).to.equal(17);
	});

	it('should the input resolve to 3006', async () => {
		expect(await runner()).to.equal(3006);
	});
});
