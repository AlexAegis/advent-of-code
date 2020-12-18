import { Vec2, Vec2String } from '@lib/model';
import { printMatrix } from '.';

export const boundingBoxOf = <T>(matrix: T[][]): Vec2 => {
	return new Vec2(matrix[0].length, matrix.length);
};
/**
 * Prints multiple layers of strings into one matrix
 * @param layers
 */
export const printGrid = (
	layers: (Map<Vec2String, string> | string[][])[],
	options?: { flipHorizontal?: boolean; flipVertical?: boolean }
): string => {
	const result: string[][] = [];

	for (const layer of layers) {
		// calculate bounding box
		if (Array.isArray(layer)) {
			layer;
		} else {
			layer.get(new Vec2(2, 34).toString());
		}
	}

	return printMatrix(result, options?.flipVertical, options?.flipHorizontal);
};
