import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 2, Part One', () => {
	it('Should be that the example resolves to 12:', async () => {
		expect(await runner('example')).to.equal(12);
	});
	it('Should be that the input resolves to 5456:', async () => {
		expect(await runner()).to.equal(5456);
	});
});
