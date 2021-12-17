import { expect } from 'chai';
import { Direction } from './direction/direction.class';

describe('Direction', () => {
	it('should have correct angular values', () => {
		expect(Direction.EAST.angularValue).to.equal(0);
		expect(Direction.NORTHEAST.angularValue).to.equal(45);
		expect(Direction.NORTH.angularValue).to.equal(90);
		expect(Direction.NORTHWEST.angularValue).to.equal(135);
		expect(Direction.WEST.angularValue).to.equal(180);
		expect(Direction.SOUTHWEST.angularValue).to.equal(225);
		expect(Direction.SOUTH.angularValue).to.equal(270);
		expect(Direction.SOUTHEAST.angularValue).to.equal(315);
	});

	it('should turn correctly', () => {
		expect(Direction.EAST.left()).to.equal(Direction.NORTH);
		expect(Direction.NORTH.left()).to.equal(Direction.WEST);
		expect(Direction.WEST.left()).to.equal(Direction.SOUTH);
		expect(Direction.SOUTH.left()).to.equal(Direction.EAST);

		expect(Direction.EAST.right()).to.equal(Direction.SOUTH);
		expect(Direction.NORTH.right()).to.equal(Direction.EAST);
		expect(Direction.WEST.right()).to.equal(Direction.NORTH);
		expect(Direction.SOUTH.right()).to.equal(Direction.WEST);
	});
});
