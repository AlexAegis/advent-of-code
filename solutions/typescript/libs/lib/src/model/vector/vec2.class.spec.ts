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

	describe('addMut', () => {
		it('should add a vector to another', () => {
			const target = new Vec2(1, 1);
			const delta = new Vec2(2, 3);
			const expectedResult = new Vec2(3, 4);
			target.addMut(delta);
			expect(target).toEqual(expectedResult);
		});

		it('should add a vector to another many times', () => {
			const target = new Vec2(1, 1);
			const delta = new Vec2(2, 3);
			const expectedResult = new Vec2(9, 13);
			target.addMut(delta, { times: 4 });
			expect(target).toEqual(expectedResult);
		});

		it('should add a vector to another multiple times while it should', () => {
			const target = new Vec2(1, 1);
			const delta = new Vec2(2, 3);
			const expectedResult = new Vec2(9, 13);
			target.addMut(delta, {
				times: (_v, i) => i < 4,
			});
			expect(target).toEqual(expectedResult);
		});

		it('should add a vector to another multiple times while it can', () => {
			const target = new Vec2(1, 1);
			const delta = new Vec2(2, 3);
			const expectedResult = new Vec2(5, 7);
			target.addMut(delta, {
				times: (v, _i) => v.x < 7,
			});
			expect(target).toEqual(expectedResult);
		});

		it('should not add a vector to another multiple times if it cant', () => {
			const target = new Vec2(1, 1);
			const delta = new Vec2(2, 3);
			const expectedResult = new Vec2(1, 1);
			target.addMut(delta, {
				times: (v, _i) => v.x < 1,
			});
			expect(target).toEqual(expectedResult);
		});
	});
});
