import { describe, expect, it } from 'vitest';
import { Vec2 } from '../../model/vector/vec2.class.js';
import { ManhattanCircle } from './manhattan-circle.class.js';

describe('ManhattanCircle', () => {
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

			expect(c1c2i?.[0].equals(c1c2ia)).to.be.true;
			expect(c1c2i?.[1].equals(c1c2ib)).to.be.true;
		});

		it('should be able to retrieve the intersections of c1 asnd c3', () => {
			const c1c3i = c1.intersect(c3);
			expect(c1c3i?.length).toBe(2);

			expect(c1c3i?.[0].equals(c1c3ia)).to.be.true;
			expect(c1c3i?.[1].equals(c1c3ib)).to.be.true;
		});

		it('should get the same result backwards too', () => {
			const c1c2i = c1.intersect(c2);
			expect(c1c2i?.length).toBe(2);
			const c2c1i = c2.intersect(c1);
			expect(c1c2i?.length).toBe(2);

			const c1c3i = c1.intersect(c3);
			expect(c1c3i?.length).toBe(2);
			const c3c1i = c1.intersect(c3);
			expect(c1c3i?.length).toBe(2);

			expect(c1c2i?.[0].equals(c1c2ia)).to.be.true;
			expect(c1c2i?.[1].equals(c1c2ib)).to.be.true;
			expect(c2c1i?.[1].equals(c1c2ia)).to.be.true;
			expect(c2c1i?.[0].equals(c1c2ib)).to.be.true;

			expect(c1c3i?.[0].equals(c1c3ia)).to.be.true;
			expect(c1c3i?.[1].equals(c1c3ib)).to.be.true;
			expect(c3c1i?.[1].equals(c1c3ia)).to.be.true;
			expect(c3c1i?.[0].equals(c1c3ib)).to.be.true;
		});
	});
});
