/**
 * @returns 1-26 for letters a-z and 27-52 for letters A-Z
 */
export const alphabeticalOrder = (letter: string): number => {
	if (letter) {
		const isLowerCase = letter[0]?.toLowerCase() === letter[0];
		return (letter.codePointAt(0) ?? 0) - 64 + (isLowerCase ? -32 : 26);
	} else {
		return 0;
	}
};
