import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root/reader.function';
import { year, day } from '..';

describe(`${year} - Day ${day} - Part One`, () => {
	it('Should be:', async () => {
		expect(await runner(await reader(year, day, 'example.txt')())).to.equal(10);
	});

	it('Should be:', async () => {
		expect(await runner(await reader(year, day, 'input.txt')())).to.equal(9202);
	});
});
