import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '.';
import { runner } from './task';

describe('2018 - Day 10 - Part One and Two', () => {
	it('should solve the input', async () => {
		// Output text is not parsed
		expect('HI').to.equal(results.one.example);
	});

	it('should resolve for the input - part 2', async () => {
		expect(await runner((await read(year, day, 'example.txt')()).input)).to.equal(
			results.two.example
		);
	});

	it('should solve the input', async () => {
		// Output text is not parsed
		expect('KBJHEZCB').to.equal(results.one.input);
	});

	it('should solve the input - part 2', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});
});
