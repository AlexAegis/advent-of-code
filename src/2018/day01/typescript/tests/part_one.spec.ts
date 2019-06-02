import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root/reader.function';

describe('Day 1, Part One', () => {
	it('Should be that that the input resolves to 408', async () => {
		expect(runner(await reader(2018, 1, 'input.txt')())).to.equal(408);
	});

	it('Should be that that the example resolves to 4', async () => {
		expect(runner(await reader(2018, 1, 'example.txt')())).to.equal(4);
	});
});
