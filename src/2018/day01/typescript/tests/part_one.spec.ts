import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root/reader.function';
import { year, day } from '..';

describe(`${year} - Day ${day} - Part One`, () => {
	it('Should be that that the input resolves to 408', async () => {
		expect(runner(await reader(year, day)())).to.equal(408);
	});

	it('Should be that that the example resolves to 4', async () => {
		expect(runner(await reader(year, day, 'example.txt')())).to.equal(4);
	});
});
