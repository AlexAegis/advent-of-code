import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';
import { runner as arrayRunner } from './part_one.array';

describe('2020 - Day 23 - Part One', () => {
	it('should solve for the input', async () => {
		const input = (await read(year, day)()).input;
		expect(runner()(input)).to.equal(74698532);
	});

	it('should solve example 1', async () => {
		const input = (await read(year, day, 'example.1.txt')()).input;
		expect(runner(10)(input)).to.equal(92658374);
	});

	it('should solve example 2', async () => {
		const input = (await read(year, day, 'example.1.txt')()).input;
		expect(runner()(input)).to.equal(67384529);
	});

	describe('Array', () => {
		it('should solve for the input', async () => {
			const input = (await read(year, day)()).input;
			expect(arrayRunner()(input)).to.equal(74698532);
		});

		it('should solve example 1', async () => {
			const input = (await read(year, day, 'example.1.txt')()).input;
			expect(arrayRunner(10)(input)).to.equal(92658374);
		});

		it('should solve example 2', async () => {
			const input = (await read(year, day, 'example.1.txt')()).input;
			expect(arrayRunner()(input)).to.equal(67384529);
		});
	});
});
