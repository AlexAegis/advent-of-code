import { numLength } from '@lib/functions';
import { numAt } from '@lib/functions/num-at.function';
import { Instruction, toInstruction } from './instruction.enum';
import { Mode } from './mode.enum';

export class IntCodeComputer implements Iterable<number> {
	public tape: Map<number, number>;
	public cursor = 0;
	public relBase = 0;
	private halt = false;
	public inputQueue?: number[];

	public constructor(tape: number[]) {
		this.tape = tape.reduce((m, n, i) => m.set(i, n), new Map());
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

	public pushInput(...input: number[]): IntCodeComputer {
		if (!this.inputQueue) {
			this.inputQueue = [];
		}
		this.inputQueue.push(...input);
		return this;
	}

	public pushInputIfEmpty(input: number): boolean {
		if (!this.inputQueue || this.inputQueue.length === 0) {
			this.pushInput(input);
			return true;
		} else return false;
	}

	private getValue(pos: number, mode: Mode = Mode.POS, asIndex = false): number {
		let v: number;
		switch (mode) {
			case Mode.POS:
				v = this.tape.get(pos) || 0;
				break;
			case Mode.REL:
				v = this.relBase + (this.tape.get(pos) || 0);
				break;
			case Mode.VAL:
			default:
				v = pos;
				break;
		}
		return asIndex ? v : this.tape.get(v) || 0;
	}

	public reset(tape?: number[]): IntCodeComputer {
		if (tape) {
			this.tape = tape.reduce((m, n, i) => m.set(i, n), new Map());
		}
		this.cursor = 0;
		this.relBase = 0;
		this.halt = false;
		return this;
	}

	public peek(at: number): number | undefined {
		return this.tape.get(at);
	}
	public set noun(noun: number) {
		this.tape.set(1, noun);
	}

	public withNoun(noun: number): IntCodeComputer {
		this.noun = noun;
		return this;
	}

	public set verb(verb: number) {
		this.tape.set(2, verb);
	}

	public withVerb(verb: number): IntCodeComputer {
		this.verb = verb;
		return this;
	}

	private getArg(v: number, n: number, asIndex = false, mode?: Mode): number {
		return this.getValue(this.cursor + n + 1, mode === undefined ? this.getMode(v, n) : mode, asIndex);
	}

	private getMode(v: number, n: number): Mode | undefined {
		return numAt(v, numLength(v) - n - 3);
	}

	public *[Symbol.iterator](): IterableIterator<number> {
		do {
			const v = this.tape.get(this.cursor) || 0;
			const i = toInstruction(v);
			switch (i) {
				case Instruction.ADD:
					this.addOp(this.getArg(v, 0), this.getArg(v, 1), this.getArg(v, 2, true));
					break;
				case Instruction.MUL:
					this.mulOp(this.getArg(v, 0), this.getArg(v, 1), this.getArg(v, 2, true));
					break;
				case Instruction.IN:
					this.inOp(this.getArg(v, 0, true));
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
					this.ltOp(this.getArg(v, 0), this.getArg(v, 1), this.getArg(v, 2, true));
					break;
				case Instruction.EQ:
					this.eqOp(this.getArg(v, 0), this.getArg(v, 1), this.getArg(v, 2, true));
					break;
				case Instruction.REL:
					this.relOp(this.getArg(v, 0));
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
		this.tape.set(pos, a + b);
		this.cursor += 4;
	}

	private mulOp(a: number, b: number, pos: number): void {
		this.tape.set(pos, a * b);
		this.cursor += 4;
	}

	private inOp(pos: number): void {
		if (this.inputQueue && this.inputQueue.length > 0) {
			this.tape.set(pos, this.inputQueue.shift() as number);
		} else {
			throw new Error('No input');
		}
		this.cursor += 2;
	}

	private outOp(pos: number): number {
		if (pos === undefined) {
			throw new Error('Not valid output' + pos);
		}
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
		this.tape.set(pos, a < b ? 1 : 0);
		this.cursor += 4;
	}

	private eqOp(a: number, b: number, pos: number): void {
		this.tape.set(pos, a === b ? 1 : 0);
		this.cursor += 4;
	}

	private relOp(pos: number): void {
		this.relBase += pos;
		this.cursor += 2;
	}

	private haltOp(): void {
		this.halt = true;
	}
}
