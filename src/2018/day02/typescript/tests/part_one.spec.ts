import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root/reader.function';

describe('2018 - Day 2 - Part One', () => {
	it('Should be that the example resolves to 12:', async () => {
		expect(await runner(await reader(2018, 2, 'example.txt')())).to.equal(12);
	});
	it('Should be that the input resolves to 5456:', async () => {
		expect(await runner(await reader(2018, 2, 'input.txt')())).to.equal(5456);
	});
});
