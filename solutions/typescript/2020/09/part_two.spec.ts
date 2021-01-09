import { read } from '@lib';
import { expect } from 'chai';
import { Args, day, year } from '.';
import { runner } from './part_two';

describe('2020 - Day 9 - Part Two', () => {
	it('should solve the input', async () => {
		const { input, args } = await read<Args>(year, day)();
		expect(await runner(input, args)).to.equal(28509180);
	});

	it('should solve the first example', async () => {
		const { input, args } = await read<Args>(year, day, 'example.1.txt')();
		expect(await runner(input, args)).to.equal(62);
	});
});
