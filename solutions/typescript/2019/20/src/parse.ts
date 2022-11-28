export const parseLines = (input: string): string[][] => {
	return input
		.split(/\r?\n/)
		.filter((line) => !!line)
		.map((line) => line.split(''));
};
