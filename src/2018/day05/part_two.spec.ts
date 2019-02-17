import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 5, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner('example')).to.equal(4);
	});

	it('Should be:', async () => {
		expect(await runner()).to.equal(6394);
	});
});
