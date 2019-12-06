import { bench, read } from '@lib';
import { day, year } from '.';
import { IntCodeComputer } from './intcode.class';
import { parse } from './parse';

export const runner = async (input: string) => {
	const computer = new IntCodeComputer(parse(input), true);
	computer.input = 1;
	return computer.execute().pop();
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 16348437 ~1.2ms
}
