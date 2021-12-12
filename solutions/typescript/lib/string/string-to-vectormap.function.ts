import { Vec2, Vec2String } from '@lib/model';
import { NEWLINE } from '@lib/regex';
import { stringToMatrix } from './string-to-matrix.function';

/**
 * Splits a string into a matrix along row and item separators. By default it
 * splits along new lines and every character
 *
 * @param s to be split apart
 * @param rowSeparator to split the rows apart with
 * @param itemSeparator to split the items apart with
 */
export const stringToVectorMap = <V = string>(
	s: string,
	valueConverter?: (value: string) => V,
	rowSeparator: RegExp | string = NEWLINE,
	itemSeparator: RegExp | string = ''
): Map<Vec2String, V> => {
	const matrix = stringToMatrix(s, rowSeparator, itemSeparator);
	const map = new Map<Vec2String, V>();
	for (let y = 0; y < matrix.length; y++) {
		const row = matrix[y];
		for (let x = 0; x < row.length; x++) {
			const coord = new Vec2(x, y);
			map.set(
				coord.toString(),
				valueConverter ? valueConverter(row[x]) : (row[x] as unknown as V)
			);
		}
	}
	return map;
};
