export const pairs = <T>(t: T[]): [T, T][] => {
	const result: [T, T][] = [];
	for (let i = 0; i < t.length - 1; i++) {
		for (let j = i; j < t.length - 1; j++) {
			result.push([t[i] as T, t[j + 1] as T]);
		}
	}
	return result;
};
