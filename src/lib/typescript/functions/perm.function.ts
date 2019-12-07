export const perm = (a: number[]): number[][] => {
	if (a.length) {
		return a.reduce(
			(r: number[][], v: number, i: number) => [
				...r,
				...perm([...a.slice(0, i), ...a.slice(i + 1)]).map(x => [v, ...x])
			],
			[]
		);
	} else {
		return [[]];
	}
};
