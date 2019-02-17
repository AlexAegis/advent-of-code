import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 13, Part Two', () => {
	it('Should be 6,4 for the example:', async () => {
		expect((await runner('example_two')).toString()).to.equal('6,4');
	});

	it('Should be 36,123 for the input:', async function() {
		this.timeout(30000); // this is long!
		expect((await runner('input')).toString()).to.equal('36,123');
	});
});
