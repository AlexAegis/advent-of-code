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
	const operations = parse(input);

	const switchableOperations = operations
		.map((op, i) => ({
			op,
			i,
		}))
		.filter(({ op }) => op.op === Operation.nop || op.op === Operation.jmp)
		.map(({ i }) => i);

	let acc = 0;

	out: for (const indice of switchableOperations) {
		const executed = new Set<number>();
		const ops = [...operations];
		ops[indice] = swap(ops[indice]);

		acc = 0;
		for (let i = 0; i < ops.length; ) {
			const op = ops[i];

			if (executed.has(i)) {
				continue out;
			} else {
				executed.add(i);
			}

			switch (op?.op) {
				case Operation.jmp:
					i += op.arg;
					break;
				case Operation.acc:
					acc += op.arg;
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

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1976 ~6ms
}
