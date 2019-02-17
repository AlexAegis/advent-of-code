import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 12, Part One', () => {
	it('Should be 3230:', async () => {
		expect(await runner()).to.equal(3230);
	});

	it('Should be 325 when running against the example:', async () => {
		expect(await runner('example')).to.equal(325);
	});
});
