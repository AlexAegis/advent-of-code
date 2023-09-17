import { describe, expect, it } from 'vitest';
import { findEndOfPair } from './find-end-of-pair.function.js';

describe('findEndOfPair', () => {
	const a = '(123)';
	const b = 'a(12(t())3)e';
	it('should find the end of a pair at the end', () => {
		expect(findEndOfPair([...a], ['(', ')'], 0)).toEqual(4);
	});

	it('should find the end of a pair when they are nested', () => {
		expect(findEndOfPair([...b], ['(', ')'], 1)).toEqual(10);
	});

	it('should throw an error if the starting index does not point to the opening pair', () => {
		expect(() => findEndOfPair([...b], ['(', ')'], 0)).to.throw();
	});

	it('should return undefined if there are no pairs', () => {
		expect(findEndOfPair(['('], ['(', ')'], 0)).toEqual(undefined);
	});
});
