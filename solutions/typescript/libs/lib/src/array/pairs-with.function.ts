export const pairsWith = <T, N = T>(a: T[], b?: N[], onlyUnique = false): [T, N][] => {
	const other = b ?? a;
	const result: [T, N][] = [];
	for (let i = 0; i < a.length; i++) {
		for (let j = onlyUnique ? i + 1 : 0; j < other.length; j++) {
			result.push([a[i] as T, other[j] as N]);
		}
	}
	return result;
};
