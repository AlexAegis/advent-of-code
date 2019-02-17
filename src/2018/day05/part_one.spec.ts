import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 5, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).to.equal(10);
	});

	it('Should be:', async () => {
		expect(await runner()).to.equal(9202);
	});
});
