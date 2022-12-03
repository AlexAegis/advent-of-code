/**
 * Lowercase letters a through z return values 1 through 26.
 * Uppercase letters A through Z return values 27 through 52.
 */
export const getLetterOrder = (letter: string): number =>
	letter
		? letter.charCodeAt(0) - 64 + (letter[0].toLocaleLowerCase() === letter[0] ? -32 : 26)
		: 0;
