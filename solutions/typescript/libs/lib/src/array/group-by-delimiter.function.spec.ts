import { describe, expect, it } from 'vitest';
import { groupByDelimiter } from './group-by-delimiter.function.js';

describe('groupByDelimiter', () => {
	it('should group by whitespaces by default for a string array', () => {
		const input = ['a', 'b', '', 'c', 'd', '', 'e'];
		const result = groupByDelimiter(input);
		expect(result.length).toBe(3);
		expect(result.flat().length).toBe(input.filter((value) => !!value).length);
	});

	it('should only have one group if there are no falsy values', () => {
		const input = ['a', 'b'];
		const result = groupByDelimiter(input);
		expect(result.length).toBe(1);
		expect(result.flat().length).toBe(input.filter((value) => !!value).length);
	});

	it('should group by arbitrary values too', () => {
		const customDelimiter = 'delimiter';
		const input = ['a', 'b', customDelimiter, 'd', 'e'];
		const result = groupByDelimiter(input, (t) => t === customDelimiter);
		expect(result.length).toBe(2);
		expect(result.flat().length).toBe(
			input.filter((value) => value !== customDelimiter).length,
		);
	});
});
