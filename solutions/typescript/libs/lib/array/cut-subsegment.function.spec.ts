import { describe, expect, it } from 'vitest';
import { cutSubSegment } from './cut-subsegment.function.js';

describe('cutSubSegment', () => {
	it('should leave behind everything else but the matched part', () => {
		const arr = '(123)'.split('');
		expect(cutSubSegment(arr, ['(', ')'], 0)?.join('')).to.equal('123');
		expect(arr.join('')).to.equal('');
	});

	it('should find the end of a pair when they are nested', () => {
		const arr = 'a(12(t())3)e'.split('');
		expect(cutSubSegment(arr, ['(', ')'], 1)?.join('')).to.equal('12(t())3');
		expect(arr.join('')).to.equal('ae');
	});
});
