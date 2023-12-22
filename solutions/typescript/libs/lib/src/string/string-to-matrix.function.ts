import { NEWLINE } from '../regex/index.js';

export interface StringToMatrixOptions<T = string> {
	valueConverter?: ((value: string) => T) | undefined;
	rowSeparator?: RegExp | string;
	itemSeparator?: RegExp | string;
}

/**
 * Splits a string into a matrix along row and item separators. By default it
 * splits along new lines and every character
 *
 * @param s to be split apart
 * @param rowSeparator to split the rows apart with
 * @param itemSeparator to split the items apart with
 */
export const stringToMatrix = <T = string>(
	s: string,
	options?: StringToMatrixOptions<T>,
): T[][] => {
	const lines = s.split(options?.rowSeparator ?? NEWLINE);
	if (lines.at(-1) === '') {
		lines.pop();
	}
	const matrix = lines.map((line) => {
		const values = line.split(options?.itemSeparator ?? '');

		return options?.valueConverter ? values.map(options?.valueConverter) : values;
	});
	return matrix as T[][];
};
