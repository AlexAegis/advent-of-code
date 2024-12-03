import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const instructionRegex = /(mul|don't|do)\((\d+)?,?(\d+)?\)/g;

interface DoInstruction {
	operator: Operator.DO;
}

interface DontInstruction {
	operator: Operator.DONT;
}

interface MulInstruction {
	operator: Operator.MUL;
	operandA: number;
	operandB: number;
}

type Instruction = DoInstruction | DontInstruction | MulInstruction;

enum Operator {
	MUL = 'mul',
	DO = 'do',
	DONT = "don't",
}

const parseInstruction = (match: RegExpExecArray): Instruction => {
	if (match[1] === Operator.MUL) {
		return {
			operator: match[1],
			operandA: parseInt(match[2] ?? '1', 10),
			operandB: parseInt(match[3] ?? '1', 10),
		} as MulInstruction;
	} else if (match[1] === Operator.DO) {
		return {
			operator: match[1],
		} as DoInstruction;
	} else if (match[1] === Operator.DONT) {
		return {
			operator: match[1],
		} as DontInstruction;
	} else {
		throw new Error('unsupported instruction: ' + match[0]);
	}
};

export const p2 = (input: string): number => {
	const instructions = [...input.matchAll(instructionRegex)].map(parseInstruction);

	let enabled = true;
	let sum = 0;
	for (const i of instructions) {
		switch (i.operator) {
			case Operator.DO:
				enabled = true;
				break;
			case Operator.DONT:
				enabled = false;
				break;
			case Operator.MUL:
				if (enabled) {
					sum += i.operandA * i.operandB;
				}
				break;
		}
	}
	return sum;
};

await task(p2, packageJson.aoc); // 80570939 ~0.11ms
