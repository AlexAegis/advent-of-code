import { Vector } from '@lib/model/vector.class';

export const parse = (input: string): Vector[][] => {
	return input.split(/\r?\n/).map(line =>
		line
			.split(',')
			.filter(c => !!c)
			.map(c => new Vector(c))
			.filter(v => v.direction)
	);
};

export const parseCommaSeparatedNumbers = (input: string): number[] => {
	return input
		.split(',')
		.filter(c => /^(\+|-)?[0-9]+/.test(c))
		.map(c => Number(c));
};

export const parseNewLineSeparatedNumbers = (input: string): number[] => {
	return input
		.split(/\r?\n/)
		.filter(c => /^(\+|-)?[0-9]+/.test(c))
		.map(c => Number(c));
};

export const parseNewLineAndCommaSeparatedNumbers = (input: string): number[][] => {
	return input
		.split(/\r?\n/)
		.filter(line => !!line)
		.map(line =>
			line
				.split(',')
				.filter(c => /^(\+|-)?[0-9]+/.test(c))
				.map(c => Number(c))
		);
};
