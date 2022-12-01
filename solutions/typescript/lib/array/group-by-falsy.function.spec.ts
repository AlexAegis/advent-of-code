import { describe, expect, it } from 'vitest';
import { groupByFalsy } from './group-by-falsy.function.js';

describe('groupByFalsy', () => {
	it('should group by whitespace for a string array', () => {
		const input = ['a', 'b', '', 'c', 'd', '', 'e'];
		const result = groupByFalsy(input);
		expect(result.length).toBe(3);
		expect(result.flat().length).toBe(input.filter((value) => !!value).length);
	});

	it('should only have one group if there are no falsy values', () => {
		const input = ['a', 'b'];
		const result = groupByFalsy(input);
		expect(result.length).toBe(1);
		expect(result.flat().length).toBe(input.filter((value) => !!value).length);
	});
});
