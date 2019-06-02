import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root/reader.function';
import { year, day } from '..';

describe(`${year} - Day ${day} - Part Two`, () => {
	it('Should be 10491 for the input:', async () => {
		expect(await runner(await reader(year, day)())).to.equal(10491);
	});

	it('Should be 4455 for the example:', async () => {
		expect(await runner(await reader(year, day, 'example.txt')())).to.equal(4455);
	});
});
