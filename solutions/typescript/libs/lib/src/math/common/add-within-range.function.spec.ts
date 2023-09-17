import { describe, expect, it } from 'vitest';
import { addWithinRange } from './add-within-range.function.js';

describe('Add Withing Range', () => {
	it('should return 2 when adding 4 to 8 within a range from 1 to 10', () => {
		expect(addWithinRange(8, 4, 9)).toEqual(2);
	});

	it('should return 6 when adding 4 to 6 within a range from 4 to 8', () => {
		expect(addWithinRange(6, 4, 4, 7)).toEqual(6);
	});
});
