import { split } from '@alexaegis/advent-of-code-lib';

export type CRTVideoSystemInstruction = 'noop' | 'addx' | number;

export const parse = (input: string): CRTVideoSystemInstruction[] =>
	split(input).reduce<CRTVideoSystemInstruction[]>((acc, line) => {
		const [l1, l2] = line.split(' ');
		acc.push(l1 as 'noop' | 'addx');
		if (l2) {
			acc.push(Number.parseInt(l2, 10));
		}
		return acc;
	}, []);
