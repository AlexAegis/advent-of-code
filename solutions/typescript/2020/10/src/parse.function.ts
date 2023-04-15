import { split } from '@alexaegis/advent-of-code-lib';
import { ascending } from '@alexaegis/advent-of-code-lib/math';

export const parse = (input: string): { jolts: number[]; max: number; builtIn: number } => {
	const jolts = split(input)
		.map((line) => parseInt(line, 10))
		.sort(ascending);
	const max = jolts[jolts.length - 1]!;
	const builtIn = max + 3;
	jolts.push(builtIn);
	jolts.unshift(0);

	return { jolts, max, builtIn };
};
