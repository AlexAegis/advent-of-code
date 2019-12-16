export const parse = (input: string): number[] => {
	return input
		.split('')
		.filter(c => /^[0-9]+$/.test(c))
		.map(a => parseInt(a, 10));
};
