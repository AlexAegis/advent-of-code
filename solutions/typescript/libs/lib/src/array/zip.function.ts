export const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
	const result: [T, U][] = [];
	for (let i = 0; i < a.length && i < b.length; i++) {
		result.push([a[i] as T, b[i] as U]);
	}
	return result;
};
