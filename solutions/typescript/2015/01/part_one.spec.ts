import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2015 - Day 1 - Part One', () => {
	it('should solve the input', async () => {
		expect(runner((await read(year, day)()).input)).to.equal(74);
	});

	it('should be that that both the first examples resolves to 0', () => {
		expect(runner('(())')).to.equal(0);
		expect(runner('()()')).to.equal(0);
	});

	it('should be that that both the second and the third examples resolves to 3', () => {
		expect(runner('(((')).to.equal(3);
		expect(runner('(()(()(')).to.equal(3);
		expect(runner('))(((((')).to.equal(3);
	});

	it('should be that that both the fourth examples resolves to -1', () => {
		expect(runner('())')).to.equal(-1);
		expect(runner('))(')).to.equal(-1);
	});

	it('should be that that both the fith examples resolves to -3', () => {
		expect(runner(')))')).to.equal(-3);
		expect(runner(')())())')).to.equal(-3);
	});
});
