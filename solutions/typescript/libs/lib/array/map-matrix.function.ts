export const mapMatrix = <T, U>(matrix: T[][], mapFn: (t: T) => U): U[][] => {
	const result: U[][] = [];
	for (const row of matrix) {
		result.push(row.map(mapFn));
	}
	return result;
};
