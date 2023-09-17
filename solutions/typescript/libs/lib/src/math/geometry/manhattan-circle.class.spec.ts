import { describe, expect, it } from 'vitest';
import { Vec2 } from '../../model/vector/vec2.class.js';
import { ManhattanCircle } from './manhattan-circle.class.js';

describe('ManhattanCircle', () => {
	describe('rowAt', () => {
		it('should return an interval spanning edge to edge, both within range', () => {
			const c = new ManhattanCircle(new Vec2(0, 0), 3);
			expect(c.rowAt(-5).length).toBe(0);
			expect(c.rowAt(-4).length).toBe(0);
			expect(c.rowAt(-3).length).toBe(1);
			expect(c.rowAt(-2).length).toBe(3);
			expect(c.rowAt(-1).length).toBe(5);
			expect(c.rowAt(0).length).toBe(7);
			expect(c.rowAt(1).length).toBe(5);
			expect(c.rowAt(2).length).toBe(3);
			expect(c.rowAt(3).length).toBe(1);
			expect(c.rowAt(4).length).toBe(0);
			expect(c.rowAt(5).length).toBe(0);
		});
	});

	describe('heightAt', () => {
		it('should return an interval spanning edge to edge, both within range', () => {
			const c = new ManhattanCircle(new Vec2(0, 0), 3);
			expect(c.heightAt(-5).length).toBe(0);
			expect(c.heightAt(-4).length).toBe(0);
			expect(c.heightAt(-3).length).toBe(1);
			expect(c.heightAt(-2).length).toBe(3);
			expect(c.heightAt(-1).length).toBe(5);
			expect(c.heightAt(0).length).toBe(7);
			expect(c.heightAt(1).length).toBe(5);
			expect(c.heightAt(2).length).toBe(3);
			expect(c.heightAt(3).length).toBe(1);
			expect(c.heightAt(4).length).toBe(0);
			expect(c.heightAt(5).length).toBe(0);
		});
	});

	describe('intersections', () => {
		const c1 = new ManhattanCircle(new Vec2(0, 0), 4);
		const c2 = new ManhattanCircle(new Vec2(4, 1), 3);
		const c3 = new ManhattanCircle(new Vec2(4, 0), 2);

		const c1c2ia = new Vec2(2, 2);
		const c1c2ib = new Vec2(3, -1);

		const c1c3ia = new Vec2(3, 1);
		const c1c3ib = new Vec2(3, -1);

		it('should be able to retrieve the intersections of 2 circles', () => {
			const c1c2i = c1.intersect(c2);
			expect(c1c2i?.length).toBe(2);

			expect(c1c2i?.[0].equals(c1c2ia)).toEqual(true);
			expect(c1c2i?.[1].equals(c1c2ib)).toEqual(true);
		});

		it('should be able to retrieve the intersections in a horizontal arrangement', () => {
			const c1c2i = c1.intersect(c2);
			expect(c1c2i?.length).toBe(2);
			const c2c1i = c2.intersect(c1);
			expect(c1c2i?.length).toBe(2);

			expect(c1c2i).toContainEqual(c1c2ia);
			expect(c1c2i).toContainEqual(c1c2ib);
			expect(c2c1i).toContainEqual(c1c2ia);
			expect(c2c1i).toContainEqual(c1c2ib);
		});

		it('should be able to retrieve the intersections in a horizontal arrangement for two other circles', () => {
			const c1c3i = c1.intersect(c3);
			expect(c1c3i?.length).toBe(2);
			const c3c1i = c3.intersect(c1);
			expect(c1c3i?.length).toBe(2);

			expect(c1c3i).toContainEqual(c1c3ia);
			expect(c1c3i).toContainEqual(c1c3ib);
			expect(c3c1i).toContainEqual(c1c3ia);
			expect(c3c1i).toContainEqual(c1c3ib);
		});

		it('should get intersections when one circle has two points in the other', () => {
			const c4 = new ManhattanCircle(new Vec2(2, 2), 2);

			const c1c4i = c1.intersect(c4);
			expect(c1c4i?.length).toBe(2);
			const c4c1i = c4.intersect(c1);
			expect(c4c1i?.length).toBe(2);

			const c1c4ia = new Vec2(1, 3);
			const c1c4ib = new Vec2(3, 1);

			expect(c1c4i).toContainEqual(c1c4ia);
			expect(c1c4i).toContainEqual(c1c4ib);
			expect(c4c1i).toContainEqual(c1c4ia);
			expect(c4c1i).toContainEqual(c1c4ib);
		});

		it('should get intersections when they are intersecting in a vertical arrangement', () => {
			const c5 = new ManhattanCircle(new Vec2(-11, 4), 3);
			const c6 = new ManhattanCircle(new Vec2(-11, 7), 2);

			const c5c6i = c5.intersect(c6);
			expect(c5c6i?.length).toBe(2);
			const c6c5i = c6.intersect(c5);
			expect(c6c5i?.length).toBe(2);

			const c5c6ia = new Vec2(-12, 6);
			const c5c6ib = new Vec2(-10, 6);

			expect(c5c6i).toContainEqual(c5c6ia);
			expect(c5c6i).toContainEqual(c5c6ib);
			expect(c6c5i).toContainEqual(c5c6ia);
			expect(c6c5i).toContainEqual(c5c6ib);
		});

		describe('when one circle has two points in the other one', () => {
			it('should get intersections when one circle has two points in the other 2 SW', () => {
				const cb = new ManhattanCircle(new Vec2(-11, -6), 4);
				const cs = new ManhattanCircle(new Vec2(-13, -8), 2);

				const cbcsi = cb.intersect(cs);
				expect(cbcsi?.length).toBe(2);
				const cscbi = cs.intersect(cb);
				expect(cscbi?.length).toBe(2);

				const cbcsia = new Vec2(-14, -7);
				const cbcsib = new Vec2(-12, -9);

				expect(cbcsi).toContainEqual(cbcsia);
				expect(cbcsi).toContainEqual(cbcsib);
				expect(cscbi).toContainEqual(cbcsia);
				expect(cscbi).toContainEqual(cbcsib);
			});

			it('should get intersections when one circle has two points in the other 2 NW', () => {
				const cb = new ManhattanCircle(new Vec2(-11, -6), 4);
				const cs = new ManhattanCircle(new Vec2(-13, -4), 2);

				const cbcsi = cb.intersect(cs);
				expect(cbcsi?.length).toBe(2);
				const cscbi = cs.intersect(cb);
				expect(cscbi?.length).toBe(2);

				const cbcsia = new Vec2(-14, -5);
				const cbcsib = new Vec2(-12, -3);

				expect(cbcsi).toContainEqual(cbcsia);
				expect(cbcsi).toContainEqual(cbcsib);
				expect(cscbi).toContainEqual(cbcsia);
				expect(cscbi).toContainEqual(cbcsib);
			});

			it('should get intersections when one circle has two points in the other 2 NE', () => {
				const cb = new ManhattanCircle(new Vec2(-11, -6), 4);
				const cs = new ManhattanCircle(new Vec2(-9, -4), 2);

				const cbcsi = cb.intersect(cs);
				expect(cbcsi?.length).toBe(2);
				const cscbi = cs.intersect(cb);
				expect(cscbi?.length).toBe(2);

				const cbcsia = new Vec2(-8, -5);
				const cbcsib = new Vec2(-10, -3);

				expect(cbcsi).toContainEqual(cbcsia);
				expect(cbcsi).toContainEqual(cbcsib);
				expect(cscbi).toContainEqual(cbcsia);
				expect(cscbi).toContainEqual(cbcsib);
			});

			it('should get intersections when one circle has two points in the other 2 SE', () => {
				const cb = new ManhattanCircle(new Vec2(-11, -6), 4);
				const cs = new ManhattanCircle(new Vec2(-9, -8), 2);

				const cbcsi = cb.intersect(cs);
				expect(cbcsi?.length).toBe(2);
				const cscbi = cs.intersect(cb);
				expect(cscbi?.length).toBe(2);

				const cbcsia = new Vec2(-8, -7);
				const cbcsib = new Vec2(-10, -9);

				expect(cbcsi).toContainEqual(cbcsia);
				expect(cbcsi).toContainEqual(cbcsib);
				expect(cscbi).toContainEqual(cbcsia);
				expect(cscbi).toContainEqual(cbcsib);
			});
		});

		describe('when there are no intersections', () => {
			it('should not find an intersection when the circles are not intersecting', () => {
				const c7 = new ManhattanCircle(new Vec2(0, 0), 4);
				const c8 = new ManhattanCircle(new Vec2(10, 0), 2);
				const c7c8i = c7.intersect(c8);
				expect(c7c8i).toBeUndefined();
				const c8c7i = c8.intersect(c7);
				expect(c8c7i).toBeUndefined();
			});

			it('should not find an intersection when the circles are completely within eachother', () => {
				const c7 = new ManhattanCircle(new Vec2(0, 0), 4);
				const c8 = new ManhattanCircle(new Vec2(0, 0), 2);
				const c7c8i = c7.intersect(c8);
				expect(c7c8i).toBeUndefined();
				const c8c7i = c8.intersect(c7);
				expect(c8c7i).toBeUndefined();
			});
		});
	});
});
