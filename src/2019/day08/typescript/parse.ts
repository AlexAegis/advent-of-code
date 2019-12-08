export const parse = (input: string): number[] => {
	return input
		.split(',')
		.filter(c => /^(\+|-)?[0-9]+/.test(c))
		.map(c => Number(c));
};

export const parseLines = (input: string): number[][] => {
	return input
		.split(/\r?\n/)
		.filter(line => !!line)
		.map(line =>
			line
				.split(',')
				.filter(c => /^(\+|-)?[0-9]+/.test(c))
				.map(a => parseInt(a, 10))
		);
};
