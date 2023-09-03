import { split } from '@alexaegis/advent-of-code-lib';
import { ascending } from '@alexaegis/advent-of-code-lib/math';

export const parse = (input: string): { jolts: number[]; max: number; builtIn: number } => {
	const jolts = split(input)
		.map((line) => Number.parseInt(line, 10))
		.sort(ascending);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const max = jolts.at(-1)!;
	const builtIn = max + 3;
	jolts.push(builtIn);
	jolts.unshift(0);

	return { jolts, max, builtIn };
};
