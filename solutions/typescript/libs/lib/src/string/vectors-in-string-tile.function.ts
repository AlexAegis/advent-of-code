import { Vec2 } from '../model/vector/vec2.class.js';
import { NEWLINE } from '../regex/index.js';

/**
 * Returns all the matching points from the tile as Vectors
 * 0, 0 will be the top left unless fromBottom is true, in which case it will
 * be bottom left
 *
 * @deprecated
 *
 * @param tile To get the vectors from
 * @param character to get the vectors of
 * @param fromBottom start row indexing from the bottom instead of the top
 */
export const vectorsInStringTile = (
	tile: string,
	character: string,
	fromBottom = false,
): Vec2[] => {
	const result: Vec2[] = [];
	const lines = tile.split(NEWLINE);
	for (let y = 0; y < lines.length; y++) {
		const row = lines[y];
		if (row) {
			for (let x = 0; x < row.length; x++) {
				if (row[x] === character) {
					result.push(new Vec2(x, fromBottom ? lines.length - 1 - y : y));
				}
			}
		}
	}
	return result;
};
