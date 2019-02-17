import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 4, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).to.equal(240);
	});
	it('Should be:', async () => {
		expect(await runner()).to.equal(106710);
	});
});
