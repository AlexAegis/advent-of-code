import { describe, expect, it } from 'vitest';
import { runner } from './p1.js';

describe(`2018 - Day 11 - Part One`, () => {
	it(`should solve the input`, async () => {
		expect(await runner('8561')).to.equal('21,37 (30)');
	});

	it(`should solve the example`, async () => {
		expect(await runner('12345')).to.equal('237,84 (30)');
	});
});
