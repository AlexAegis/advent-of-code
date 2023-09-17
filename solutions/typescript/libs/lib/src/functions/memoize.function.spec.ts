import { describe, expect, it } from 'vitest';
import { memoize } from './memoize.function.js';

describe('Memoize', () => {
	it('should call the original function only once', () => {
		let callCount = 0;
		const add = (a: number, b: number): number => {
			callCount++;
			return a + b;
		};
		const memoizedAdd = memoize(add);
		expect(memoizedAdd(1, 2)).toEqual(3);
		expect(memoizedAdd(1, 2)).toEqual(3);
		expect(callCount).toEqual(1);
	});
});
