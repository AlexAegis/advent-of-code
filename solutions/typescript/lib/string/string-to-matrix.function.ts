import { NEWLINE } from '@lib/regex';

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
	itemSeparator: RegExp | string = ''
): string[][] => s.split(rowSeparator).map((l) => l.split(itemSeparator));
