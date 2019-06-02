import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root/reader.function';

describe('2015 Day 1, Part One', () => {
	it('Should be that that the input resolves to 74', async () => {
		expect(await runner(await reader(2015, 1, 'input.txt')())).to.equal(74);
	});

	it('Should be that that both the first examples resolves to 0', async () => {
		expect(await runner('(())')).to.equal(0);
		expect(await runner('()()')).to.equal(0);
	});

	it('Should be that that both the second and the third examples resolves to 3', async () => {
		expect(await runner('(((')).to.equal(3);
		expect(await runner('(()(()(')).to.equal(3);
		expect(await runner('))(((((')).to.equal(3);
	});

	it('Should be that that both the fourth examples resolves to -1', async () => {
		expect(await runner('())')).to.equal(-1);
		expect(await runner('))(')).to.equal(-1);
	});

	it('Should be that that both the fith examples resolves to -3', async () => {
		expect(await runner(')))')).to.equal(-3);
		expect(await runner(')())())')).to.equal(-3);
	});
});
