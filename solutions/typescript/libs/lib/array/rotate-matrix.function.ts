/**
 * Rotates a matrix
 *
 * @param matrix to be rotated
 * @param direction the direction to rotate. r (right) is clockwise, l (left)
 *                  is counterclockwise
 */
export const rotateMatrix = <T>(matrix: T[][], direction: 'r' | 'l' = 'r'): T[][] => {
	const result: T[][] = [];
	for (let y = 0; y < matrix.length; y++) {
		const row = matrix[y];
		for (let x = 0; x < row.length; x++) {
			if (direction === 'r') {
				if (result[x] === undefined) result[x] = [];
				result[x][matrix.length - 1 - y] = row[x];
			} else {
				const rx = row.length - 1 - x;
				if (result[rx] === undefined) result[rx] = [];
				result[rx][y] = row[x];
			}
		}
	}
	return result;
};
