import { runner } from './task';
import { expect } from 'chai';

describe('Day 10, Part One and Two', () => {
	it('Should be:', async () => {
		// Output text is not parsed
		expect('HI').to.equal('HI');
	});

	it('Should be:', async () => {
		expect(await runner('example')).to.equal(3);
	});

	it('Should be:', async () => {
		// Output text is not parsed
		expect('KBJHEZCB').to.equal('KBJHEZCB');
	});

	it('Should be:', async () => {
		expect(await runner()).to.equal(10369);
	});
});
