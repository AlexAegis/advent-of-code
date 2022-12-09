/**
 * Partitions an array by using the falsy values in it as delimiter
 */
export const groupByFalsy = <T>(values: T[]): T[][] => {
	const result: T[][] = [[]];
	for (const value of values) {
		if (!value) {
			result.push([]);
		} else {
			result[result.length - 1].push(value);
		}
	}
	return result;
};
