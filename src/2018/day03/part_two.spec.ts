import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 3, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner('example')).to.equal(3);
	});

	it('Should be:', async () => {
		expect(await runner()).to.equal(382);
	});
});
