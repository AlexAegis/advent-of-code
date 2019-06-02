import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root/reader.function';
import { year, day } from '..';

describe(`${year} - Day ${day} - Part Two`, () => {
	it('Should be megsdlpulxvinkatfoyzxcbvq for the input:', async () => {
		expect(await runner(await reader(year, day)())).to.equal('megsdlpulxvinkatfoyzxcbvq');
	});

	it('Should be abcde for the example:', async () => {
		expect(await runner(await reader(year, day, 'example.txt')())).to.equal('abcde');
	});
});
