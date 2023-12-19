import { describe, expect, it } from 'vitest';
import { memoizeDeprecated } from './memoize.function.js';

describe('Memoize', () => {
	it('should call the original function only once', () => {
		let callCount = 0;
		const add = (a: number, b: number): number => {
			callCount++;
			return a + b;
		};
		const memoizedAdd = memoizeDeprecated(add);
		expect(memoizedAdd(1, 2)).toEqual(3);
		expect(memoizedAdd(1, 2)).toEqual(3);
		expect(callCount).toEqual(1);
	});
});
