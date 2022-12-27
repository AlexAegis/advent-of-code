import { describe, expect, it } from 'vitest';
import { BoundingBox } from './bounding-box.class.js';
import { Vec2 } from './vec2.class.js';

describe('BoundingBox', () => {
	describe('create methods', () => {
		it('can be created from a set of vectors', () => {
			const boundingBox = BoundingBox.fromVectors({ x: -1, y: -2 }, { x: 1, y: 2 });
			expect(boundingBox).toBeDefined();
			expect(boundingBox.left).toBe(-1);
			expect(boundingBox.top).toBe(-2); // Top is the smallest Y value
			expect(boundingBox.bottom).toBe(2); // Bottom is the largest Y value
			expect(boundingBox.right).toBe(1);
		});

		it('can be created from single number', () => {
			const boundingBox = BoundingBox.fromLength(2);
			expect(boundingBox).toBeDefined();
			expect(boundingBox.left).toBe(0);
			expect(boundingBox.top).toBe(0); // Top is the smallest Y value
			expect(boundingBox.bottom).toBe(2); // Bottom is the largest Y value
			expect(boundingBox.right).toBe(2);
		});

		it('can be created from a matrix number', () => {
			const boundingBox = BoundingBox.fromMatrix([
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
			]);
			expect(boundingBox).toBeDefined();
			expect(boundingBox.left).toBe(0);
			expect(boundingBox.top).toBe(0); // Top is the smallest Y value
			expect(boundingBox.bottom).toBe(4); // Bottom is the largest Y value
			expect(boundingBox.right).toBe(3);
		});
	});

	describe('edges', () => {
		const boundingBox = BoundingBox.fromVectors(new Vec2(2, 2), new Vec2(4, 4));
		it('should be able to retreive the top edge from left to right', () => {
			const edge = boundingBox.getTopEdge();
			expect(edge.length).toBe(3);
			expect(edge[0].x).toBe(2);
			expect(edge[1].x).toBe(3);
			expect(edge[2].x).toBe(4);

			expect(edge[0].y).toBe(2);
			expect(edge[1].y).toBe(2);
			expect(edge[2].y).toBe(2);
		});

		it('should be able to retreive the right edge from top to bottom', () => {
			const edge = boundingBox.getRightEdge();
			expect(edge.length).toBe(3);
			expect(edge[0].x).toBe(4);
			expect(edge[1].x).toBe(4);
			expect(edge[2].x).toBe(4);

			expect(edge[0].y).toBe(2);
			expect(edge[1].y).toBe(3);
			expect(edge[2].y).toBe(4);
		});

		it('should be able to retreive the bottom edge, from right to left because it is clockwise', () => {
			const edge = boundingBox.getBottomEdge();
			expect(edge.length).toBe(3);
			expect(edge[0].x).toBe(4);
			expect(edge[1].x).toBe(3);
			expect(edge[2].x).toBe(2);

			expect(edge[0].y).toBe(4);
			expect(edge[1].y).toBe(4);
			expect(edge[2].y).toBe(4);
		});

		it('should be able to retreive the right edge from bottom to top', () => {
			const edge = boundingBox.getLeftEdge();
			expect(edge.length).toBe(3);
			expect(edge[0].x).toBe(2);
			expect(edge[1].x).toBe(2);
			expect(edge[2].x).toBe(2);

			expect(edge[0].y).toBe(4);
			expect(edge[1].y).toBe(3);
			expect(edge[2].y).toBe(2);
		});
	});
});
