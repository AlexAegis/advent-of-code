export const getHeightValue = (letter: string): number => {
	if (letter === 'S') {
		return 'a'.alphabeticalOrder();
	} else if (letter === 'E') {
		return 'z'.alphabeticalOrder();
	} else {
		return letter.alphabeticalOrder();
	}
};
