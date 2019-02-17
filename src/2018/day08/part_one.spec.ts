import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 8, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).to.equal(138);
	});
	it('Should be:', async () => {
		expect(await runner()).to.equal(47112);
	});
});
