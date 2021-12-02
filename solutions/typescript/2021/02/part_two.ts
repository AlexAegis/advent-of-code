import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { SubmarineInstruction } from './model/submarine-instruction.enum';

export const runner = (input: string): number => {
	const tar = input.lines().reduce(
		(acc, line) => {
			const [instruction, num] = line.split(' ');
			const amplitude = parseInt(num, 10);

			if (instruction === SubmarineInstruction.FORWARD) {
				acc.pos.addMut({ x: amplitude, y: acc.aim * amplitude });
			}
			if (instruction === SubmarineInstruction.DOWN) {
				acc.aim = acc.aim + amplitude;
			}
			if (instruction === SubmarineInstruction.UP) {
				acc.aim = acc.aim - amplitude;
			}
			return acc;
		},
		{ pos: Vec2.ORIGIN.clone(), aim: 0 }
	);

	return tar.pos.x * tar.pos.y; // todo pos
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1971232560 ~0.30ms
}
