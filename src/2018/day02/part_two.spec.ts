import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 2, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner('example')).to.equal('abcde');
	});

	it('Should be:', async () => {
		expect(await runner()).to.equal('megsdlpulxvinkatfoyzxcbvq');
	});
});
