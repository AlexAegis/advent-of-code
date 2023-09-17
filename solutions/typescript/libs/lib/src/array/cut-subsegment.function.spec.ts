import { describe, expect, it } from 'vitest';
import { cutSubSegment } from './cut-subsegment.function.js';

describe('cutSubSegment', () => {
	it('should leave behind everything else but the matched part', () => {
		const arr = [...'(123)'];
		expect(cutSubSegment(arr, ['(', ')'], 0)?.join('')).toEqual('123');
		expect(arr.join('')).toEqual('');
	});

	it('should find the end of a pair when they are nested', () => {
		const arr = [...'a(12(t())3)e'];
		expect(cutSubSegment(arr, ['(', ')'], 1)?.join('')).toEqual('12(t())3');
		expect(arr.join('')).toEqual('ae');
	});
});
