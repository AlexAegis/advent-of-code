import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 1, Part Two', () => {
	it('Should be:', async function() {
		expect(await runner()).to.equal(55250);
	});

	it('Should be that the example resolves to :', async () => {
		expect(await runner('example')).to.equal(10);
	});
});
