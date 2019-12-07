import { numLength } from '@lib/functions';
import { numAt } from '@lib/functions/num-at.function';
import { Instruction, toInstruction } from './instruction.enum';
import { Mode } from './mode.enum';

export class IntCodeComputer implements Iterable<number> {
	public tape: number[];
	public cursor = 0;
	private halt = false;
	public inputQueue?: number[];

	public constructor(tape: number[], mutable = false) {
		this.tape = mutable ? tape : [...tape];
	}

	public iter(): IterableIterator<number> {
		return this[Symbol.iterator]();
	}

	public set input(input: number | number[]) {
		if (typeof input === 'number') {
			this.inputQueue = [input];
		} else {
			this.inputQueue = input;
		}
	}

	public withInput(input: number | number[]): IntCodeComputer {
		this.input = input;
		return this;
	}

	public isHalt(): boolean {
		return this.halt;
	}

	public pushInput(input: number): IntCodeComputer {
		if (!this.inputQueue) {
			this.inputQueue = [];
		}
		this.inputQueue.push(input);
		return this;
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

	public reset(tape?: number[], mutable = false): IntCodeComputer {
		if (tape) {
			this.tape = mutable ? tape : [...tape];
		}
		this.cursor = 0;
		this.halt = false;
		return this;
	}

	public peek(at: number): number {
		return this.tape[at];
	}
	public set noun(noun: number) {
		this.tape[1] = noun;
	}

	public withNoun(noun: number): IntCodeComputer {
		this.noun = noun;
		return this;
	}

	public set verb(verb: number) {
		this.tape[2] = verb;
	}

	public withVerb(verb: number): IntCodeComputer {
		this.verb = verb;
		return this;
	}

	private getArg(v: number, n: number, mode?: Mode): number {
		return this.getValue(this.cursor + n + 1, mode || numAt(v, numLength(v) - n - 3));
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
				case Instruction.IN:
					this.inOp(this.getArg(v, 0, Mode.VAL));
					break;
				case Instruction.OUT:
					yield this.outOp(this.getArg(v, 0));
					break;
				case Instruction.JIT:
					this.jitOp(this.getArg(v, 0), this.getArg(v, 1));
					break;
				case Instruction.JIF:
					this.jifOp(this.getArg(v, 0), this.getArg(v, 1));
					break;
				case Instruction.LT:
					this.ltOp(this.getArg(v, 0), this.getArg(v, 1), this.getArg(v, 2, Mode.VAL));
					break;
				case Instruction.EQ:
					this.eqOp(this.getArg(v, 0), this.getArg(v, 1), this.getArg(v, 2, Mode.VAL));
					break;
				case Instruction.HALT:
				default:
					this.haltOp();
					break;
			}
		} while (!this.halt);
	}

	public run(target?: number[]): IntCodeComputer {
		if (target) {
			target.push(...this.execute());
		} else {
			this.execute();
		}
		return this;
	}

	public execute(): number[] {
		return [...this];
	}

	private addOp(a: number, b: number, pos: number): void {
		this.tape[pos] = a + b;
		this.cursor += 4;
	}

	private mulOp(a: number, b: number, pos: number): void {
		this.tape[pos] = a * b;
		this.cursor += 4;
	}

	private inOp(pos: number): void {
		if (this.inputQueue && this.inputQueue.length > 0) {
			this.tape[pos] = this.inputQueue.shift() as number;
		} else {
			throw new Error('No input');
		}
		this.cursor += 2;
	}

	private outOp(pos: number): number {
		this.cursor += 2;
		return pos;
	}

	private jitOp(v: number, target: number): void {
		if (v) {
			this.cursor = target;
		} else {
			this.cursor += 3;
		}
	}
	private jifOp(v: number, target: number): void {
		if (!v) {
			this.cursor = target;
		} else {
			this.cursor += 3;
		}
	}

	private ltOp(a: number, b: number, pos: number): void {
		this.tape[pos] = a < b ? 1 : 0;
		this.cursor += 4;
	}

	private eqOp(a: number, b: number, pos: number): void {
		this.tape[pos] = a === b ? 1 : 0;
		this.cursor += 4;
	}

	private haltOp(): void {
		this.halt = true;
	}
}
