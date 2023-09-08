import { NEWLINE } from '../regex/index.js';

/**
 * Splits a string into a matrix along row and item separators. By default it
 * splits along new lines and every character
 *
 * @param s to be split apart
 * @param rowSeparator to split the rows apart with
 * @param itemSeparator to split the items apart with
 */
export const stringToMatrix = (
	s: string,
	rowSeparator: RegExp | string = NEWLINE,
	itemSeparator: RegExp | string = '',
): string[][] => {
	const lines = s.split(rowSeparator);
	if (lines.at(-1) === '') {
		lines.pop();
	}
	const matrix = lines.map((line) => line.split(itemSeparator));
	return matrix;
};
