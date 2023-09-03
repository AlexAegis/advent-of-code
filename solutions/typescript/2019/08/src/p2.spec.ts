import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2019 - Day 8 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		// 'LGYHB'
		expect(p2(resources.input)).to.equal(
			'\n#`````##``#```##``#`###``\n#````#``#`#```##``#`#``#`\n#````#`````#`#`####`###``\n#````#`##```#``#``#`#``#`\n#````#``#```#``#``#`#``#`\n####``###```#``#``#`###``\n',
		);
	});
});
