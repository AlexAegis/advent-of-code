import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root/reader.function';
import { year, day } from '..';

describe(`${year} - Day ${day} - Part Two`, () => {
	it('Should be 55250 for the input:', async function() {
		expect(runner(await reader(year, day)())).to.equal(55250);
	});

	it('Should be 10 for the example:', async () => {
		expect(runner(await reader(year, day, 'example.txt')())).to.equal(10);
	});
});
