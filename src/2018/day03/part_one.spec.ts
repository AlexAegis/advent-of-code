import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 3, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).to.equal(4);
	});

	it('Should be:', async () => {
		expect(await runner()).to.equal(116920);
	});
});
