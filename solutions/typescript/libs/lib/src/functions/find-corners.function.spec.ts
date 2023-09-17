import { describe, expect, it } from 'vitest';
import { Vec2 } from '../model/vector/vec2.class.js';
import { findCorners } from './find-corners.function.js';

describe('findCorners', () => {
	const vectors = [new Vec2(0, 0), new Vec2(1, 1), new Vec2(1, 2)];
	it('should be able to find the corners of the area defined', () => {
		const { topLeft, topRight, bottomRight, bottomLeft } = findCorners(vectors);
		expect(topLeft.toString()).toEqual('0,2');
		expect(topRight.toString()).toEqual('1,2');
		expect(bottomLeft.toString()).toEqual('0,0');
		expect(bottomRight.toString()).toEqual('1,0');
	});
});
