import { numLength } from '@lib/functions';

export enum Instruction {
	ADD = 1,
	MUL = 2,
	IN = 3,
	OUT = 4,
	JIT = 5,
	JIF = 6,
	LT = 7,
	EQ = 8,
	HALT = 99
}

export enum Mode {
	POS = 0,
	VAL = 1
}

export class IntCodeComputer implements Iterable<number> {
	private pointer = 0;

	private sh: [number, number, number, ...number[]] = [];
	public constructor(private tape: number[]) {}

	private interpretInstruction(code: number): [Instruction, ...Mode[]] {
		let instruction: Instruction;
		const modes: Mode[] = [];
		const len = numLength(code);
		if (len > 2) {
			console.log(code);
			instruction = code % 100;
			code.toString();
			//	sh = [...code.toString()]..substring(0, len - 2);
		} else {
			instruction = code;
		}
		return [instruction, ...modes];
	}

	public *[Symbol.iterator](): IterableIterator<number> {
		yield 1;
	}
}
