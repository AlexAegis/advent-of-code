import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { parseSubmarineCommand, SubmarineInstruction } from './model';

export const runner = (input: string): number => {
	const result = input
		.lines()
		.map(parseSubmarineCommand)
		.reduce(
			(acc, { amplitude, instruction }) => {
				if (instruction === SubmarineInstruction.FORWARD) {
					acc.position.addMut({ x: amplitude, y: acc.aim * amplitude });
				} else if (instruction === SubmarineInstruction.DOWN) {
					acc.aim = acc.aim + amplitude;
				} else if (instruction === SubmarineInstruction.UP) {
					acc.aim = acc.aim - amplitude;
				}
				return acc;
			},
			{ position: Vec2.ORIGIN.clone(), aim: 0 }
		);
	return result.position.x * result.position.y;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1971232560 ~0.34ms
}
