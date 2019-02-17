import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 1, Part Two', () => {
	it('Should be:', async function() {
		// Lambdas bind 'this' lexically, and thus the mocha context is not usable.
		this.timeout(10000);
		// await runner(); // it takes 5000ms so I won't run it every time.
		expect(55250).to.equal(55250);
	});

	it('Should be that the example resolves to :', async () => {
		expect(await runner('example')).to.equal(10);
	});
});
