import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 11, Part One', () => {
	it('Should be at 21,37 with a value of 30:', async () => {
		expect(await runner()).to.equal('21,37 (30)');
	});
});
