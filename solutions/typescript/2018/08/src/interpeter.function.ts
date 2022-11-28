export const interpreter = (input: string): number[] =>
	input.split(' ').map((o) => parseInt(o, 10));
