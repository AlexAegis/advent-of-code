import { numLength } from '@lib/functions';
import { numAt } from '@lib/functions/num-at.function';

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

export const isInstruction = (n: number): boolean => {
	return (n >= 1 && n <= 8) || n === 99;
};

export const toInstruction = (code: number): Instruction => {
	const inst = code % 100;
	if (isInstruction(inst)) {
		return inst;
	} else {
		throw new Error(`Unsupported instruction ${inst}`);
	}
};

export const addOp = (tape: number[], cursor: number): number => {
	// const e = tape[cursor];

	return cursor;
};

export enum Mode {
	POS = 0,
	VAL = 1
}

export class IntCodeComputer implements Iterable<number> {
	public tape: number[];
	public cursor = 0;
	private halt = false;

	public constructor(tape: number[], mutable = false) {
		this.tape = mutable ? tape : [...tape];
	}

	private getValue(pos: number, mode: Mode = Mode.POS): number {
		switch (mode) {
			case Mode.POS:
				return this.tape[this.tape[pos]];
			case Mode.VAL:
			default:
				return this.tape[pos];
		}
	}

	public reset(tape?: number[], mutable = false): void {
		if (tape) {
			this.tape = mutable ? tape : [...tape];
		}
		this.cursor = 0;
		this.halt = false;
	}

	public peek(at: number): number {
		return this.tape[at];
	}
	public set noun(to: number) {
		this.tape[1] = to;
	}

	public set verb(to: number) {
		this.tape[2] = to;
	}

	public execute(): number[] {
		return [...this];
	}

	private getArg(v: number, n: number, mode?: Mode): number {
		return this.getValue(this.cursor + n + 1, mode || numAt(v, numLength(v) - n - 2));
	}

	public *[Symbol.iterator](): IterableIterator<number> {
		do {
			const v = this.tape[this.cursor];
			const i = toInstruction(v);
			switch (i) {
				case Instruction.ADD:
					this.addOp(this.getArg(v, 0), this.getArg(v, 1), this.getArg(v, 2, Mode.VAL));
					break;
				case Instruction.MUL:
					this.mulOp(this.getArg(v, 0), this.getArg(v, 1), this.getArg(v, 2, Mode.VAL));
					break;
				case Instruction.HALT:
					this.haltOp();
					break;
				default:
					break;
			}
		} while (!this.halt);
	}

	private addOp(a: number, b: number, pos: number): void {
		this.tape[pos] = a + b;
		this.cursor += 4;
	}

	private mulOp(a: number, b: number, pos: number): void {
		this.tape[pos] = a * b;
		this.cursor += 4;
	}

	private haltOp(): void {
		this.halt = true;
	}
}
/*
const comp = new IntCodeComputer([111, 2, 3, 9]);
console.log(comp.getArg(1001, 1));
*/
