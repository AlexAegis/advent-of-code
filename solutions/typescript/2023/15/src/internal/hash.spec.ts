import { describe, expect, it } from 'vitest';
import { hash } from './hash.js';

describe('hash', () => {
	it('should, return for the string hash', () => {
		expect(hash('HASH')).toEqual(52);
	});
});
