/**
 * Flips a matrix along an axis
 *
 * @param matrix to be flipped. Won't be mutated
 * @param axis to flip along. x (-) y (|)
 */
export const flipMatrix = <T>(matrix: T[][], axis: 'y' | 'x' = 'x'): T[][] => {
	if (matrix.length === 0) {
		return [];
	} else if (!Array.isArray(matrix[0]) && axis !== 'y') {
		throw new Error('Input is not a matrix, cannot be flipped');
	}
	matrix = axis === 'x' ? [...matrix].reverse() : matrix.map((row) => [...row].reverse());
	return matrix;
};
