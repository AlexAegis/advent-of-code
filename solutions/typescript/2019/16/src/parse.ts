export const parse = (input: string): number[] => {
	return [...input].filter((c) => /^\d+$/.test(c)).map((a) => Number.parseInt(a, 10));
};
