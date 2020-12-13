import { read } from '@lib';
import { expect } from 'chai';
import { Args, day, year } from '.';
import { hasComponents, runner } from './part_one';

describe('2020 - Day 9 - Part One', () => {
	const preamble = Array.from({ length: 25 }, (_, i) => i + 1);

	it('should solve the input', async () => {
		const { input, args } = await read<Args>(year, day)();
		expect(await runner(input, args)).to.equal(217430975);
	});

	it('should find a pair in the preamble that adds to 26', () =>
		expect(hasComponents(26, preamble)).to.be.true);

	it('should find a pair in the preamble that adds to 49', () =>
		expect(hasComponents(49, preamble)).to.be.true);

	it('should not find a pair in the preamble that adds to 100', () =>
		expect(hasComponents(100, preamble)).to.be.false);

	it('should not find a pair in the preamble that adds to 50', () =>
		expect(hasComponents(50, preamble)).to.be.false);

	it('should solve for the first example', async () => {
		const { input, args } = await read<Args>(year, day, 'example.1.txt')();
		expect(await runner(input, args)).to.equal(127);
	});
});
