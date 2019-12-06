import { IntCodeComputer } from '@2019/day05/typescript/intcode.class';
import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';

export const runner = (input: string) => {
	const computer = new IntCodeComputer(parse(input), true);
	computer.noun = 12;
	computer.verb = 2;
	computer.execute();
	return computer.peek(0);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3101844 ~0.25ms
}
