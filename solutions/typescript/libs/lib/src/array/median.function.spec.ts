import { describe, expect, it } from 'vitest';
import { median } from './median.function.js';

describe('median', () => {
	it('should return get the middle one from an odd length array', () => {
		const array = [0, 1, 2];
		expect(median(array)).toEqual(1);
	});

	it('should return the average of the middle two elments from even elements', () => {
		const array = [0, 1, 2, 3];
		expect(median(array)).toEqual(1.5);
	});
});
