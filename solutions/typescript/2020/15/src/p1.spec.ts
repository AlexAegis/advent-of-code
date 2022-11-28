import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2020 - Day 15 - Part One', () => {
	it('should solve for the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(1015);
	});

	it('should solve for the first example', async () => {
		expect(await runner('0,3,6')).to.equal(436);
	});

	it('should solve for the second example', async () => {
		expect(await runner('1,3,2')).to.equal(1);
	});

	it('should solve for the third example', async () => {
		expect(await runner('2,1,3')).to.equal(10);
	});

	it('should solve for the fourth example', async () => {
		expect(await runner('1,2,3')).to.equal(27);
	});

	it('should solve for the fifth example', async () => {
		expect(await runner('2,3,1')).to.equal(78);
	});

	it('should solve for the sixth example', async () => {
		expect(await runner('3,2,1')).to.equal(438);
	});

	it('should solve for the seventh example', async () => {
		expect(await runner('3,1,2')).to.equal(1836);
	});
});
