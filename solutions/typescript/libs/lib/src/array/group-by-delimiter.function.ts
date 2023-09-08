/**
 * Partitions an array by using the falsy values in it as delimiter
 */
export const groupByDelimiter = <T>(
	values: T[],
	isDelimiter: (t: T) => boolean = (t) => !t,
): T[][] => {
	const result: T[][] = [[]];
	for (const value of values) {
		if (isDelimiter(value)) {
			result.push([]);
		} else {
			result.at(-1)?.push(value);
		}
	}
	return result;
};
