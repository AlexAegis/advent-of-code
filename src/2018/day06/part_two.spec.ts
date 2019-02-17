import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 6, Part Two', () => {
	it('should be that the example resolves to 16', async () => {
		expect(await runner('example')).to.equal(16);
	});

	it('should be that the input resolves to 42998', async () => {
		expect(await runner('input')).to.equal(42998);
	});
});
