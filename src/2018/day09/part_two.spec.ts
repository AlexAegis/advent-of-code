import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 9, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner()).to.equal(2945918550);
	});
});
