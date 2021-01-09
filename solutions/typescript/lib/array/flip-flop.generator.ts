/**
 * Generates all the orientations of a matrix
 *
 * @param matrix to be oriented. it won't be mutated
 */
export function* matrixFlipFlop<T>(matrix: T[][]): Generator<T[][]> {
	let state = matrix;
	yield (state = state.rotateMatrix('r'));
	yield (state = state.rotateMatrix('r'));
	yield (state = state.rotateMatrix('r'));
	yield (state = state.rotateMatrix('r'));
	yield (state = state.flipMatrix('x'));
	yield (state = state.rotateMatrix('r'));
	yield (state = state.rotateMatrix('r'));
	yield (state = state.rotateMatrix('r'));
	yield (state = state.rotateMatrix('r'));
}
