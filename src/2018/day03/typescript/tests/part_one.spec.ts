import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root/reader.function';
import { year, day } from '..';

describe(`${year} - Day ${day} - Part One`, () => {
	it('Should be 116920 for the input:', async () => {
		expect(await runner(await reader(year, day)())).to.equal(116920);
	});

	it('Should be 4 for the example:', async () => {
		expect(await runner(await reader(year, day, 'example.txt')())).to.equal(4);
	});
});
