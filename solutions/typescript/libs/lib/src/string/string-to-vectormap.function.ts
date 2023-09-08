import { Vec2, type Vec2String } from '../model/index.js';
import { NEWLINE } from '../regex/index.js';
import { stringToMatrix } from './string-to-matrix.function.js';

export interface StringToVectorMapOptions<V> {
	valueConverter?: ((value: string) => V) | undefined;
	rowSeparator?: RegExp | string;
	itemSeparator?: RegExp | string;
	/**
	 * Ignore check is happening after conversion
	 */
	ignoreValues?: (value: V) => boolean;
}
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
	rawOptions?: StringToVectorMapOptions<V>,
): Map<Vec2String, V> => {
	const options = normalizeStringToVectorMapOptions(rawOptions);
	const matrix = stringToMatrix(s, options.rowSeparator, options.itemSeparator);

	const map = new Map<Vec2String, V>();
	for (let y = 0; y < matrix.length; y++) {
		const row = matrix[y];
		if (row) {
			for (let x = 0; x < row.length; x++) {
				const coord = new Vec2(x, y);
				const value = row[x];
				if (value !== undefined) {
					const convertedValue = options.valueConverter?.(value) ?? (value as V);
					if (!options.ignoreValues(convertedValue)) {
						map.set(coord.toString(), convertedValue);
					}
				}
			}
		}
	}
	return map;
};

export const normalizeStringToVectorMapOptions = <V>(
	options?: StringToVectorMapOptions<V>,
): Required<StringToVectorMapOptions<V>> => {
	return {
		valueConverter: options?.valueConverter ?? ((a) => a as V),
		rowSeparator: options?.rowSeparator ?? NEWLINE,
		itemSeparator: options?.itemSeparator ?? '',
		ignoreValues: options?.ignoreValues ?? ((a) => a === ' '),
		...options,
	};
};
