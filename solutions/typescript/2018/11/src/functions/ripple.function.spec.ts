import { describe, expect, it } from 'vitest';
import { ripple } from './ripple.function.js';

describe('Day 11 - Ripple', () => {
	it('Should be only 40 of them:', () => {
		expect(ripple(5, 3, 4).length).toEqual(40);
	});
});
