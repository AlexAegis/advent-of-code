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
		if (row) {
			for (let x = 0; x < row.length; x++) {
				const rx = row.length - 1 - x;
				const ry = row.length - 1 - y;

				if (direction === 'r') {
					const existingRow = result[x];
					if (existingRow) {
						existingRow[ry] = row[x] as T;
					} else {
						const newRow = [];
						newRow[ry] = row[x] as T;
						result[x] = newRow;
					}
				} else {
					const existingRow = result[rx];
					if (existingRow) {
						existingRow[ry] = row[x] as T;
					} else {
						const newRow = [];
						newRow[ry] = row[x] as T;
						result[rx] = newRow;
					}
				}
			}
		}
	}
	return result;
};
