import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root/reader.function';
import { year, day } from '..';

describe(`${year} - Day ${day} - Part Two`, () => {
	it('Should be:', async () => {
		expect(await runner(await reader(year, day, 'example.txt')())).to.equal(4);
	});

	it('Should be:', async () => {
		expect(await runner(await reader(year, day, 'input.txt')())).to.equal(6394);
	});
});
