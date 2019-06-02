import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root/reader.function';

describe('2018 Day 3, Part One', () => {
	it('Should be:', async () => {
		expect(await runner(await reader(2018, 3, 'example.txt')())).to.equal(4);
	});

	it('Should be:', async () => {
		expect(await runner(await reader(2018, 3, 'input.txt')())).to.equal(116920);
	});
});
