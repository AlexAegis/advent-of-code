import { bench, read } from '@lib';
import { day, year } from '.';
import { Instruction, Operation, parse } from './parse.function';

const swapMap: Record<keyof typeof Operation, Operation> = {
	acc: Operation.acc,
	jmp: Operation.nop,
	nop: Operation.jmp,
};

const swap = (i: Instruction): Instruction => ({
	op: swapMap[i.op],
	arg: i.arg,
});

export const runner = (input: string): number => {
	const possibleInstructions = parse(input)
		.map((op, i, original) => ({
			op,
			i,
			original,
		}))
		.filter(({ op }) => op.op === Operation.nop || op.op === Operation.jmp)
		.map(({ i, original }) => {
			const ops = [...original];
			ops[i] = swap(ops[i]);
			return ops;
		});

	let acc = 0;

	out: for (const instructions of possibleInstructions) {
		const executed = new Set<number>();

		acc = 0;

		for (let i = 0; i < instructions.length; ) {
			const instruction = instructions[i];

			if (executed.has(i)) {
				continue out;
			} else {
				executed.add(i);
			}

			switch (instruction.op) {
				case Operation.jmp:
					i += instruction.arg;
					break;
				case Operation.acc:
					acc += instruction.arg;
					i++;
					break;
				default:
				case Operation.nop:
					i++;
					break;
			}
		}
		break;
	}

	return acc;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1976 ~5ms
}
