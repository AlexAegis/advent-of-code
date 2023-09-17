import { describe, expect, it } from 'vitest';
import { addAllToSet } from './add-all-to-set.function.js';

describe('addAllToSet', () => {
	it('should create a set that has all the elements', () => {
		const set = addAllToSet([1, 1, 2, 3]);
		expect(set.size).toEqual(3);
	});
});
