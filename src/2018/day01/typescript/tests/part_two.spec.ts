import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root/reader.function';

describe('Day 1, Part Two', () => {
	it('Should be:', async function() {
		expect(runner(await reader(2018, 1, 'input.txt')())).to.equal(55250);
	});

	it('Should be that the example resolves to :', async () => {
		expect(runner(await reader(2018, 1, 'example.txt')())).to.equal(10);
	});
});
