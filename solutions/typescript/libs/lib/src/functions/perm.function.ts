export const perm = (a: number[]): number[][] => {
	return a.length > 0
		? a.reduce(
				(r: number[][], v: number, i: number) => [
					...r,
					...perm([...a.slice(0, i), ...a.slice(i + 1)]).map((x) => [v, ...x]),
				],
				[],
		  )
		: [[]];
};
