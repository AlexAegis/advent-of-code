import { max } from '../../math/index.js';
import {
	getRowRenderedAlphabet,
	LetterMatrixType,
	UPPERCASE_ALPHABET,
} from './letter-matrix.const.js';

const LETTER_SPACING = 1;

/**
 * Parses letters out of a characterMatrix. Works with 6x4 letters (HxW)
 *
 * @param matrix
 * @param litCharacter is the "pixel" that counts as on. Only this will be
 * treated as part of the letter being parsed.
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
