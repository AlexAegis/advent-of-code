import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root/reader.function';

describe('2018 Day 3, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner(await reader(2018, 3, 'example.txt')())).to.equal(3);
	});

	it('Should be:', async () => {
		expect(await runner(await reader(2018, 3, 'input.txt')())).to.equal(382);
	});
});
