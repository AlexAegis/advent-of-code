import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root/reader.function';

describe('2018 - Day 4 - Part Two', () => {
	it('Should be:', async () => {
		expect(await runner(await reader(2018, 4, 'example.txt')())).to.equal(4455);
	});

	it('Should be:', async () => {
		expect(await runner(await reader(2018, 4, 'input.txt')())).to.equal(10491);
	});
});
