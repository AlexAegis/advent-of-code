import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root/reader.function';

describe('2018 - Day 2 - Part Two', () => {
	it('Should be:', async () => {
		expect(await runner(await reader(2018, 2, 'example.txt')())).to.equal('abcde');
	});

	it('Should be:', async () => {
		expect(await runner(await reader(2018, 2, 'input.txt')())).to.equal('megsdlpulxvinkatfoyzxcbvq');
	});
});
