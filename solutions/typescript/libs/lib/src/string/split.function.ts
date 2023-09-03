import { NEWLINE } from '../regex/index.js';

/**
 * Convinienence method to split up a long string into it's
 * non empty lines in an OS agnostic way
 */
export const split = (input: string, keepEmptyLines = false): string[] => {
	const split = input.split(NEWLINE);
	return keepEmptyLines ? split : split.filter((line) => !!line);
};
