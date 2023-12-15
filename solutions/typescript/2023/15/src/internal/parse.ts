import { hash } from './hash.js';

interface SetInstruction {
	label: string;
	box: number;
	operator: '=';
	focalLength: number;
}

interface RemoveInstruction {
	label: string;
	box: number;
	operator: '-';
}

type Instruction = SetInstruction | RemoveInstruction;

const instructionRegex = /(.*)([=-])(.*)/;

export const parseInstruction = (instruction: string): Instruction => {
	const match = instructionRegex.exec(instruction);
	if (!match) {
		throw new Error('instruction not matching regex: ' + instruction);
	}
	const [, label, operator, value] = match;
	if (operator === '=' && value !== undefined && label !== undefined) {
		return {
			focalLength: Number.parseInt(value, 10),
			label,
			operator,
			box: hash(label),
		};
	} else if (operator === '-' && label !== undefined) {
		return {
			label,
			operator,
			box: hash(label),
		};
	} else {
		throw new Error('invalid instruction: ' + instruction);
	}
};
