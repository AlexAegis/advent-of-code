import { expect } from 'chai';
import { reader } from '@root/reader.function';
import { runner } from '../part_one';
import { year, day } from '..';

describe(`${year} - Day ${day} - Part One`, () => {
	it('Should be 106710 for the input:', async () => {
		expect(await runner(await reader(year, day)())).to.equal(106710);
	});

	it('Should be 240 for the example:', async () => {
		expect(await runner(await reader(year, day, 'example.txt')())).to.equal(240);
	});
});
