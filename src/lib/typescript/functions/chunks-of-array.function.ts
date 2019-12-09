export const chunksOfArray = <T>(arr: T[], size: number): T[][] => {
	const matrix: T[][] = [];
	for (let i = 0; i < arr.length; i += size) {
		matrix.push(arr.slice(i, i + size));
	}
	return matrix;
};
