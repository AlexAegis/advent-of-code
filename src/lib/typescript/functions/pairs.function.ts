export const pairs = <T>(t: T[]): T[][] => {
	const result: T[][] = [];
	for (let i = 0; i < t.length - 1; i++) {
		for (let j = i; j < t.length - 1; j++) {
			result.push([t[i], t[j + 1]]);
		}
	}
	return result;
};
