import { Vec2, type Vec2Like } from '../model/index.js';

export interface Corners<T extends Vec2Like> {
	bottomLeft: T;
	bottomRight: T;
	topLeft: T;
	topRight: T;
}

/**
 * Finds the top left and bottom right corners among a list of vectors
 *
 * @param vectors to find the corners from
 */
export const findCorners = <T extends Vec2Like>(vectors: T[]): Corners<Vec2> => {
	let minX = Number.POSITIVE_INFINITY;
	let minY = Number.POSITIVE_INFINITY;
	let maxX = Number.NEGATIVE_INFINITY;
	let maxY = Number.NEGATIVE_INFINITY;
	for (const vector of vectors) {
		if (vector.x < minX) {
			minX = vector.x;
		}
		if (vector.x > maxX) {
			maxX = vector.x;
		}
		if (vector.y < minY) {
			minY = vector.y;
		}
		if (vector.y > maxY) {
			maxY = vector.y;
		}
	}
	return {
		topLeft: new Vec2(minX, maxY),
		topRight: new Vec2(maxX, maxY),
		bottomLeft: new Vec2(minX, minY),
		bottomRight: new Vec2(maxX, minY),
	};
};
