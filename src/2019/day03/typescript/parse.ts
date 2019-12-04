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
