export const parseLines = (input: string): number[][] => {
	return input
		.split(/\r?\n/)
		.filter(line => !!line)
		.map(line =>
			line
				.split(',')
				.filter(c => /^(\+|-)?[0-9]+$/.test(c))
				.map(a => parseInt(a, 10))
		);
};
