export const parseCommaSeparatedNumbers = (input: string): number[] => {
	return input
		.split(',')
		.filter(c => /^(\+|-)?[0-9]+/.test(c))
		.map(c => Number(c));
};
