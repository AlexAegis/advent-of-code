import { bench, read } from '@lib';
import { day, year } from '.';
import { IntCodeComputer } from './intcode.class';
import { parse } from './parse';

export const runner = async (input: string) => {
	const computer = new IntCodeComputer(parse(input), true);
	computer.input = 5;

	//const computer = new IntCodeComputer(
	//	parse(
	//		'3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'
	//	),
	//	true
	//);
	//computer.input = 10;
	return computer.execute().pop();
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 16348437 ~1.2ms
}
