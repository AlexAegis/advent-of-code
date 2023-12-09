import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { extrapolateSequence, parse } from './parse.js';

const extrapolatePreviousInStack = (sequenceStack: number[][]): number[][] => {
	let carry = sequenceStack.last().first();
	for (let i = sequenceStack.length - 1; i >= 0; i--) {
		carry = (sequenceStack[i]?.first() ?? 0) - carry;
		sequenceStack[i]?.unshift(carry);
	}
	return sequenceStack;
};

export const p2 = (input: string): number =>
	parse(input)
		.map(extrapolateSequence)
		.map(extrapolatePreviousInStack)
		.map((extrapolatedStack) => extrapolatedStack.first().first())
		.sum();

await task(p2, packageJson.aoc); // 948 ~1.62ms
