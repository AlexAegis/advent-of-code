import { describe, expect, it, vi } from 'vitest';
import { pairwise } from './pairwise.function.js';

describe('pairwise', () => {
	it('should emit pairs', () => {
		const data = [0, 1, 2, 3, 4, 5, 6];

		const spy = vi.fn<[number, number], undefined>();

		pairwise(data, spy);

		expect(spy).toHaveBeenNthCalledWith(1, 0, 1);
		expect(spy).toHaveBeenNthCalledWith(2, 1, 2);
		expect(spy).toHaveBeenNthCalledWith(3, 2, 3);
		expect(spy).toHaveBeenNthCalledWith(4, 3, 4);
		expect(spy).toHaveBeenNthCalledWith(5, 4, 5);
		expect(spy).toHaveBeenNthCalledWith(6, 5, 6);
	});
});
