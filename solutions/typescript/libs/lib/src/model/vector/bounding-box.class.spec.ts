import { describe, expect, it } from 'vitest';
import { BoundingBox } from './bounding-box.class.js';
import { Vec2 } from './vec2.class.js';

describe('BoundingBox', () => {
	describe('fromMatrix', () => {
		it('should create a unit box from a unit matrix', () => {
			const matrix = [[0]];
			const box = BoundingBox.fromMatrix(matrix);
			expect(box.top).toEqual(0);
			expect(box.bottom).toEqual(0);
			expect(box.left).toEqual(0);
			expect(box.right).toEqual(0);
			expect(box.height).toBe(1);
			expect(box.width).toBe(1);

			const vectors = box.renderIntoVectors();
			expect(vectors.length).toBe(1);
		});
	});

	describe('fromLength', () => {
		it('should create a unit box from length 0', () => {
			const box = BoundingBox.fromLength(0);
			expect(box.top).toEqual(0);
			expect(box.bottom).toEqual(0);
			expect(box.left).toEqual(0);
			expect(box.right).toEqual(0);
			expect(box.height).toBe(1);
			expect(box.width).toBe(1);

			const vectors = box.renderIntoVectors();
			expect(vectors.length).toBe(1);
		});
	});

	describe('intersection', () => {
		it('should return undefined for non-intersecting boxes', () => {
			const boxA = BoundingBox.fromVectors([new Vec2(0, 0), new Vec2(1, 1)]);
			const boxB = BoundingBox.fromVectors([new Vec2(4, 4), new Vec2(5, 5)]);

			const intersection = boxA.intersection(boxB);

			expect(intersection).toBeUndefined();
		});

		it('should return the common part for intersecting boxes', () => {
			const boxA = BoundingBox.fromVectors([new Vec2(0, 0), new Vec2(3, 3)]);
			const boxB = BoundingBox.fromVectors([new Vec2(2, 2), new Vec2(5, 5)]);

			const intersection = boxA.intersection(boxB);

			const expectedIntersection = BoundingBox.fromVectors([new Vec2(2, 2), new Vec2(3, 3)]);

			expect(intersection).toEqual(expectedIntersection);
		});

		it('should work with infinite boxes', () => {
			const boxA = BoundingBox.fromVectors([
				new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
				new Vec2(3, 3),
			]);
			const boxB = BoundingBox.fromVectors([
				new Vec2(2, 2),
				new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
			]);

			const intersection = boxA.intersection(boxB);

			const expectedIntersection = BoundingBox.fromVectors([new Vec2(2, 2), new Vec2(3, 3)]);

			expect(intersection).toEqual(expectedIntersection);
		});

		it('should work with infinite boxes mixed with normal boxes', () => {
			const boxA = BoundingBox.fromVectors([
				new Vec2(4, 4),
				new Vec2(4, Number.POSITIVE_INFINITY),
			]);
			const boxB = BoundingBox.fromVectors([new Vec2(0, 0), new Vec2(10, 10)]);
			const intersection = boxA.intersection(boxB);
			console.log('asdf', boxA.toString(), boxB.toString(), intersection?.toString());

			const expectedIntersection = BoundingBox.fromVectors([new Vec2(4, 4), new Vec2(4, 10)]);

			expect(intersection).toEqual(expectedIntersection);
		});
	});

	describe('moveTopLeftTo', () => {
		it('should set the topleft to target and move other anchors by the same offset', () => {
			const box = BoundingBox.fromVectors([
				{ x: 2, y: 2 },
				{ x: 4, y: 4 },
			]);

			box.moveTopLeftTo({ x: 0, y: 0 });

			expect(box.topLeft).toEqual({ x: 0, y: 0 });
			expect(box.bottomRight).toEqual({ x: 2, y: 2 });
		});
	});

	describe('create methods', () => {
		it('can be created from a set of vectors', () => {
			const boundingBox = BoundingBox.fromVectors([
				{ x: -1, y: -2 },
				{ x: 1, y: 2 },
			]);
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
			expect(boundingBox.bottom).toBe(3); // Bottom is the largest Y value
			expect(boundingBox.right).toBe(2);
			expect(boundingBox.height).toBe(4);
			expect(boundingBox.width).toBe(3);
		});
	});

	describe('edges', () => {
		const boundingBox = BoundingBox.fromVectors([new Vec2(2, 2), new Vec2(4, 4)]);
		it('should be able to retreive the top edge from left to right', () => {
			const edge = boundingBox.getTopEdge();
			expect(edge.length).toBe(3);
			expect(edge[0]?.x).toBe(2);
			expect(edge[1]?.x).toBe(3);
			expect(edge[2]?.x).toBe(4);

			expect(edge[0]?.y).toBe(2);
			expect(edge[1]?.y).toBe(2);
			expect(edge[2]?.y).toBe(2);
		});

		it('should be able to retreive the right edge from top to bottom', () => {
			const edge = boundingBox.getRightEdge();
			expect(edge.length).toBe(3);
			expect(edge[0]?.x).toBe(4);
			expect(edge[1]?.x).toBe(4);
			expect(edge[2]?.x).toBe(4);

			expect(edge[0]?.y).toBe(2);
			expect(edge[1]?.y).toBe(3);
			expect(edge[2]?.y).toBe(4);
		});

		it('should be able to retreive the bottom edge, from right to left because it is clockwise', () => {
			const edge = boundingBox.getBottomEdge();
			expect(edge.length).toBe(3);
			expect(edge[0]?.x).toBe(4);
			expect(edge[1]?.x).toBe(3);
			expect(edge[2]?.x).toBe(2);

			expect(edge[0]?.y).toBe(4);
			expect(edge[1]?.y).toBe(4);
			expect(edge[2]?.y).toBe(4);
		});

		it('should be able to retreive the right edge from bottom to top', () => {
			const edge = boundingBox.getLeftEdge();
			expect(edge.length).toBe(3);
			expect(edge[0]?.x).toBe(2);
			expect(edge[1]?.x).toBe(2);
			expect(edge[2]?.x).toBe(2);

			expect(edge[0]?.y).toBe(4);
			expect(edge[1]?.y).toBe(3);
			expect(edge[2]?.y).toBe(2);
		});
	});
});
