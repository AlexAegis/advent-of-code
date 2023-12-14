export const findLast = <T>(
	array: T[],
	predicate: (t: T, i: number) => boolean,
	skipCount = 0,
): T | undefined => {
	for (let i = array.length - 1 - skipCount; i >= 0; i--) {
		if (predicate(array[i] as T, i)) {
			return array[i];
		}
	}
	return undefined;
};
