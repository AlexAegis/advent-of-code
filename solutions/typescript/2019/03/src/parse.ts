import { Vector } from '@alexaegis/advent-of-code-lib/model';

export const parse = (input: string): [Vector[], Vector[]] => {
	return input.splitIntoStringPair(/\r?\n/).map((line) =>
		line
			.split(',')
			.filter((c) => !!c)
			.map((c) => new Vector(c))
			.filter((v) => v.direction)
	) as [Vector[], Vector[]];
};
