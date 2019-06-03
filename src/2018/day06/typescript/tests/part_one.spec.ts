import { runner } from '../part_one';
import { expect } from 'chai';
import { year, day } from '..';
import { reader } from '@root/reader.function';

describe(`${year} - Day ${day} - Part One`, () => {
	it('should the input resolve to 3006', async () => {
		expect(await runner(await reader(year, day)())).to.equal(3006);
	});

	it('should the example resolve to 17', async () => {
		expect(await runner(await reader(year, day, 'example.txt')())).to.equal(17);
	});
});
