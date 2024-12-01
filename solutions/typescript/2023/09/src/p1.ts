import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { extrapolateSequence, parse } from './parse.js';

const extrapolateNextInStack = (sequenceStack: number[][]): number[][] => {
	let carry = sequenceStack.last().last();
	for (let i = sequenceStack.length - 1; i >= 0; i--) {
		carry = (sequenceStack[i]?.last() ?? 0) + carry;
		sequenceStack[i]?.push(carry);
	}
	return sequenceStack;
};

export const p1 = (input: string): number =>
	parse(input)
		.map(extrapolateSequence)
		.map(extrapolateNextInStack)
		.map((extrapolatedStack) => extrapolatedStack.first().last())
		.sum();

await task(p1, packageJson.aoc); // 1938731307 ~1.57ms
