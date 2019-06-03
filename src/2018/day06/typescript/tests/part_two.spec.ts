import { runner } from '../part_two';
import { expect } from 'chai';
import { year, day } from '..';
import { reader } from '@root/reader.function';

describe(`${year} - Day ${day} - Part Two`, () => {
	it('should be that the input resolves to 42998', async () => {
		expect(await runner(await reader(year, day)())).to.equal(42998);
	});

	it('should be that the example resolves to 16', async () => {
		expect(await runner(await reader(year, day, 'example.txt')())).to.equal(16);
	});
});
