export const cartesianCombinations = <T>(...arrays: T[][]): T[][] => {
	const r: T[][] = [];
	const max = arrays.length - 1;

	const cartesianHelper = (arr: T[], i: number) => {
		for (let j = 0, l = arrays[i].length; j < l; j++) {
			const a = arr.slice(0);
			a.push(arrays[i][j]);
			if (i === max) r.push(a);
			else cartesianHelper(a, i + 1);
		}
	};

	cartesianHelper([], 0);
	return r;
};
