import { bench, read } from '@lib';
import { day, year } from '.';
import { Operation, parse } from './parse.function';

export const runner = (input: string): number => {
	const instructions = parse(input);
	let acc = 0;
	const executed = new Set<number>();

	for (let i = 0; i < instructions.length; ) {
		const instruction = instructions[i];

		if (executed.has(i)) {
			break;
		} else {
			executed.add(i);
		}

		switch (instruction?.op) {
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

	return acc;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1709 ~0.7ms
}
