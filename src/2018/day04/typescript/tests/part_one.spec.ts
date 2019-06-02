import { expect } from 'chai';
import { reader } from '@root/reader.function';
import { runner } from '../part_one';

describe('2018 - Day 4 - Part One', () => {
	it('Should be:', async () => {
		expect(await runner(await reader(2018, 4, 'example.txt')())).to.equal(240);
	});
	it('Should be:', async () => {
		expect(await runner(await reader(2018, 4, 'input.txt')())).to.equal(106710);
	});
});
