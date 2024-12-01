import { WHITESPACE } from '@alexaegis/advent-of-code-lib';

export interface SeparatedInput {
	left: number[];
	right: number[];
}

export const parse = (input: string): SeparatedInput =>
	input
		.lines()
		.map((line) => line.splitIntoStringPair(WHITESPACE))
		.reduce(
			(acc, [left, right]) => {
				acc.left.push(parseInt(left, 10));
				acc.right.push(parseInt(right, 10));
				return acc;
			},
			{ left: [], right: [] } as SeparatedInput,
		);
