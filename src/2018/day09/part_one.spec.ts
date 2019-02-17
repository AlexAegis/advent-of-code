import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 9, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example_0')).to.equal(32);
	});

	it('Should be:', async () => {
		expect(await runner('example_1')).to.equal(8317);
	});

	it('Should be:', async () => {
		expect(await runner('example_2')).to.equal(146373);
	});

	it('Should be:', async () => {
		expect(await runner('example_3')).to.equal(2764);
	});

	it('Should be:', async () => {
		expect(await runner('example_4')).to.equal(54718);
	});

	it('Should be:', async () => {
		expect(await runner('example_5')).to.equal(37305);
	});

	it('Should be:', async () => {
		expect(await runner()).to.equal(361466);
	});
});
