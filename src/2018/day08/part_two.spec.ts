import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 8, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner('example')).to.equal(66);
	});
	it('Should be:', async () => {
		expect(await runner()).to.equal(28237);
	});
});
