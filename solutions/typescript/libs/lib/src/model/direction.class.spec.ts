import { describe, expect, it } from 'vitest';
import { Direction } from './direction/direction.class.js';

describe('Direction', () => {
	it('should have correct angular values', () => {
		expect(Direction.EAST.angularValue).toEqual(0);
		expect(Direction.NORTHEAST.angularValue).toEqual(45);
		expect(Direction.NORTH.angularValue).toEqual(90);
		expect(Direction.NORTHWEST.angularValue).toEqual(135);
		expect(Direction.WEST.angularValue).toEqual(180);
		expect(Direction.SOUTHWEST.angularValue).toEqual(225);
		expect(Direction.SOUTH.angularValue).toEqual(270);
		expect(Direction.SOUTHEAST.angularValue).toEqual(315);
	});

	it('should turn correctly', () => {
		expect(Direction.EAST.left()).toEqual(Direction.NORTH);
		expect(Direction.NORTH.left()).toEqual(Direction.WEST);
		expect(Direction.WEST.left()).toEqual(Direction.SOUTH);
		expect(Direction.SOUTH.left()).toEqual(Direction.EAST);

		expect(Direction.EAST.right()).toEqual(Direction.SOUTH);
		expect(Direction.NORTH.right()).toEqual(Direction.EAST);
		expect(Direction.WEST.right()).toEqual(Direction.NORTH);
		expect(Direction.SOUTH.right()).toEqual(Direction.WEST);
	});
});
