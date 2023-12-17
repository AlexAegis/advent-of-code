export const reduceIfAllTheSame = <T>(array: T[]): T | undefined => {
	const first = array.first();
	return array.every((i) => i === first) ? first : undefined;
};
