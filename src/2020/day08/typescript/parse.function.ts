import { split } from '@lib';

export enum Operation {
	nop = 'nop',
	jmp = 'jmp',
	acc = 'acc',
}

export interface Instruction {
	op: keyof typeof Operation;
	arg: number;
}

export const parse = (input: string): Instruction[] =>
	split(input).map((line) => {
		const [o, a] = line.split(' ');
		return { op: o as keyof typeof Operation, arg: parseInt(a, 10) };
	});
