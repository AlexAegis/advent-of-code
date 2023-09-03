import { describe, expect, it } from 'vitest';
import { p1 } from './p1.js';

describe('2018 - Day 11 - Part One', () => {
	it('should solve the input', () => {
		expect(p1('8561')).to.equal('21,37 (30)');
	});

	it('should solve the example', () => {
		expect(p1('12345')).to.equal('237,84 (30)');
	});
});
