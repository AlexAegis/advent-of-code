import { max } from '../../math/index.js';
import {
	getRowRenderedAlphabet,
	LetterMatrixType,
	UPPERCASE_ALPHABET,
} from './letter-matrix.const.js';

const LETTER_SPACING = 1;

/**
 * Parses letters out of a characterMatrix.
 *
 * Works with 4x6 letters as seen in 2016 day 8, 2019 day 8 and 2019 day 11 or
 * with 6x10 letters like in 2018 day 10 if letterType is set to 'big'
 */
export const parseLetterMatrix = (
	matrix: string[][],
	letterType: LetterMatrixType = 'small'
): string => {
	const renderedAlphabet = getRowRenderedAlphabet(letterType);
	const renderedRows = matrix.map((row) => row.join(''));
	const width = renderedRows.map((row) => row.length).reduce(max, -Infinity);
	const parsedLetters: string[] = [];
	let offset = 0;
	while (offset <= width) {
		let someMatched = false;
		let matchedWidth = 4;
		for (const letter of UPPERCASE_ALPHABET) {
			const renderedLetter = renderedAlphabet[letter];
			const letterWidth = renderedLetter[0].length;
			const matches = renderedRows.every((renderedRow, i) => {
				const letterPortion = renderedRow.substring(offset, offset + letterWidth);
				return renderedLetter[i] === letterPortion;
			});

			if (matches) {
				parsedLetters.push(letter);
				matchedWidth = renderedLetter[0].length;
				someMatched = true;
			}
		}

		offset += matchedWidth + LETTER_SPACING;

		if (offset <= width && !someMatched) {
			throw new Error(
				`No letter matched at offset ${
					offset - (matchedWidth + LETTER_SPACING)
				} during letter matrix parsing!`
			);
		}
	}
	return parsedLetters.join('');
};
