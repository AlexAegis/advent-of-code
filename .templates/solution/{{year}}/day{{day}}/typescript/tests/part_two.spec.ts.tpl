import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import packageJson from '../package.json' assert { type: 'json' };
import packageJson from '../package.json' assert { type: 'json' };
import { day, results, year } from '..';
import { runner } from '../part_two';

describe('${year} - Day ${day} - Part Two', () => {
	it('should solve for the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(runner(input.input)).to.equal(Infinity);
	});

	it('should be that that the first example resolves to 0', async () => {
		expect(await runner('0')).to.equal(0);
	});
});
