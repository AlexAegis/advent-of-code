import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 4, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner('example')).to.equal(4455);
	});

	it('Should be:', async () => {
		expect(await runner()).to.equal(10491);
	});
});
