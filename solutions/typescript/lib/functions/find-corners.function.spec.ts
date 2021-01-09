import { Vec2 } from '@lib/model';
import { expect } from 'chai';
import { findCorners } from './find-corners.function';

describe('findCorners', () => {
	const vectors = [new Vec2(0, 0), new Vec2(1, 1), new Vec2(1, 2)];
	it('should be able to find the corners of the area defined', () => {
		const { topLeft, topRight, bottomRight, bottomLeft } = findCorners(vectors);
		expect(topLeft.toString()).to.equal('0,2');
		expect(topRight.toString()).to.equal('1,2');
		expect(bottomLeft.toString()).to.equal('0,0');
		expect(bottomRight.toString()).to.equal('1,0');
	});
});
