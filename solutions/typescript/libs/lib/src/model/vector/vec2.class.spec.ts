import { describe, expect, it } from 'vitest';
import { Vec2 } from './vec2.class.js';

describe('Vec2', () => {
	describe('isFinite', () => {
		it('should be finite when both x and y is finite', () => {
			expect(new Vec2(1, 2).isFinite()).toBeTruthy();
		});

		it('should not be finite when either x and y is not finite', () => {
			expect(new Vec2(1, Number.POSITIVE_INFINITY).isFinite()).toBeFalsy();
		});

		describe('partial isFinite', () => {
			it('should be finite if y is not finite but the check is partial', () => {
				expect(new Vec2(1, Number.POSITIVE_INFINITY).isFinite(true)).toBeTruthy();
			});

			it('should not be finite if both neither is finite even if the check is partial', () => {
				expect(
					new Vec2(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY).isFinite(true),
				).toBeFalsy();
			});

			it('should be finite if y is not finite but only x is checked', () => {
				expect(new Vec2(1, Number.POSITIVE_INFINITY).isFinite('x')).toBeTruthy();
			});

			it('should not be finite if y is not finite when only y is checked', () => {
				expect(new Vec2(1, Number.POSITIVE_INFINITY).isFinite('y')).toBeFalsy();
			});
		});
	});
});
