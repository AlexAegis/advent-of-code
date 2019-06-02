import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root/reader.function';
import { year, day } from '..';

describe(`${year} - Day ${day} - Part One`, () => {
	it('Should be that the input resolves to 5456:', async () => {
		expect(await runner(await reader(year, day)())).to.equal(5456);
	});

	it('Should be that the example resolves to 12:', async () => {
		expect(await runner(await reader(year, day, 'example.txt')())).to.equal(12);
	});
});
