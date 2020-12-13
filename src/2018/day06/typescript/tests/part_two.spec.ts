import { read } from '@lib';
import { expect } from 'chai';
import { Args, day, results, year } from '..';
import { runner } from '../part_two';

describe('2018 - Day 6 - Part Two', () => {
	it('should solve the input', async () => {
		const { input, args } = await read<Args>(year, day)();
		expect(await runner(input, args)).to.equal(results.two.input);
	});

	it('should resolve to ${results.two.example} when using the example', async () => {
		const { input, args } = await read<Args>(year, day, 'example.txt')();
		expect(await runner(input, args)).to.equal(results.two.example);
	});
});
