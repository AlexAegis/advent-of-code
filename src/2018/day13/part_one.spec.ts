import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 13, Part One', () => {
	it('Should be 7,3 for the example:', async () => {
		expect((await runner('example')).toString()).to.equal('7,3');
	});

	it('Should be 2,0 for the example:', async () => {
		expect((await runner('example_two')).toString()).to.equal('2,0');
	});

	it('Should be 28,107 for the input:', async () => {
		expect((await runner('input')).toString()).to.equal('28,107');
	});
});
