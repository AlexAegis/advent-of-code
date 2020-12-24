import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';
import { runner as graphRunner } from './part_one.graph';

describe('2020 - Day 24 - Part One', () => {
	it('should solve for the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(479);
	});

	it('should solve for the first example', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(10);
	});

	describe('Graph', () => {
		it('should solve for the input', async () => {
			expect(await graphRunner((await read(year, day)()).input)).to.equal(479);
		});

		it('should solve for the first example', async () => {
			expect(await graphRunner((await read(year, day, 'example.1.txt')()).input)).to.equal(
				10
			);
		});
	});
});
