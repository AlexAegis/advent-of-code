export const reduceIfAllTheSame = <T>(array: T[], minimumLength = 1): T | undefined => {
	if (array.length < minimumLength) {
		return undefined;
	}
	const first = array[0];
	return array.every((i) => i === first) ? first : undefined;
};
